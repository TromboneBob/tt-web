import fs from 'fs'
import path from 'path'
import sizeOf from 'image-size'
import YAML from 'yaml'

const imagesDir = 'public/foto-sessions'
const contentDir = 'content/foto-sessions'

fs.readdirSync(contentDir).forEach(file => {
  // Get session ID from filename (e.g., "1.martha-benjamin.md" -> "martha-benjamin")
  const sessionId = file.replace(/^\d+\./, '').replace('.md', '')
  const imagePath = path.join(imagesDir, sessionId)

  // Skip if image folder doesn't exist
  if (!fs.existsSync(imagePath)) return

  // Read markdown file
  const mdFile = path.join(contentDir, file)
  const content = fs.readFileSync(mdFile, 'utf-8')

  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) return

  const frontmatter = YAML.parse(frontmatterMatch[1])

  // Get all image files with metadata
  const images = fs.readdirSync(imagePath)
    .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
    .sort()
    .map(filename => {
      const fullPath = path.join(imagePath, filename)

      // Read file as buffer for image-size
      const buffer = fs.readFileSync(fullPath)
      const dimensions = sizeOf(buffer)
      const aspectRatio = (dimensions?.width ?? 1) / (dimensions?.height ?? 1)

      return {
        filename,
        span: aspectRatio > 1 ? 2 : 1,
        width: dimensions?.width,
        height: dimensions?.height
      }
    })

  // Update frontmatter
  frontmatter.images = images

  // Reconstruct markdown file
  const newFrontmatter = YAML.stringify(frontmatter)
  const bodyContent = content.replace(/^---\n[\s\S]*?\n---\n/, '')
  const updatedContent = `---\n${newFrontmatter}---\n${bodyContent}`

  // Write back
  fs.writeFileSync(mdFile, updatedContent)
  console.log(`✅ Updated ${file}`)
})
