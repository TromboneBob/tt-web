import { mkdir, mkdtemp, readdir, rename, rm } from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.join(
  PROJECT_ROOT,
  "public/foto-sessions/thumbnails",
);
const OUTPUT_PARENT = path.join(PROJECT_ROOT, "public/generated");
const OUTPUT_DIR = path.join(OUTPUT_PARENT, "foto-thumbnails");

const SIZES = [160, 320];
const WEBP_QUALITY = 60;
const SUPPORTED_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);

// Keep build-time resource use predictable even when the source directory grows.
sharp.cache({ memory: 64, files: 20, items: 100 });
sharp.concurrency(2);

const sortByName = (left: Dirent, right: Dirent) =>
  left.name < right.name ? -1 : left.name > right.name ? 1 : 0;

const isMissing = (error: unknown) =>
  error instanceof Error && "code" in error && error.code === "ENOENT";

async function swapOutputDirectory(temporaryDir: string) {
  const backupDir = path.join(
    OUTPUT_PARENT,
    `.foto-thumbnails-backup-${process.pid}-${Date.now()}`,
  );
  let hasBackup = false;

  try {
    await rename(OUTPUT_DIR, backupDir);
    hasBackup = true;
  } catch (error) {
    if (!isMissing(error)) throw error;
  }

  try {
    await rename(temporaryDir, OUTPUT_DIR);
  } catch (error) {
    if (hasBackup) {
      await rename(backupDir, OUTPUT_DIR);
    }
    throw error;
  }

  if (hasBackup) {
    await rm(backupDir, { recursive: true, force: true });
  }
}

async function main() {
  const entries = (await readdir(SOURCE_DIR, { withFileTypes: true })).sort(
    sortByName,
  );
  const sources = entries.filter(
    (entry) =>
      entry.isFile() &&
      !entry.name.startsWith(".") &&
      SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
  );
  const skippedCount = entries.length - sources.length;

  if (sources.length === 0) {
    throw new Error(`No supported raster images found in ${SOURCE_DIR}`);
  }

  const stems = new Set<string>();
  for (const source of sources) {
    const stem = path.parse(source.name).name;
    if (stems.has(stem)) {
      throw new Error(
        `Duplicate thumbnail stem "${stem}" would produce conflicting files`,
      );
    }
    stems.add(stem);
  }

  await mkdir(OUTPUT_PARENT, { recursive: true });
  const temporaryDir = await mkdtemp(
    path.join(OUTPUT_PARENT, ".foto-thumbnails-"),
  );
  let swapped = false;

  try {
    let generatedCount = 0;

    // Process serially so large source photos cannot multiply peak memory use.
    for (const source of sources) {
      const sourcePath = path.join(SOURCE_DIR, source.name);
      const stem = path.parse(source.name).name;

      for (const size of SIZES) {
        const outputPath = path.join(
          temporaryDir,
          `${stem}-${size}.webp`,
        );

        await sharp(sourcePath, { sequentialRead: true })
          .autoOrient()
          .resize({
            width: size,
            height: size,
            fit: "cover",
            position: "centre",
          })
          .webp({ quality: WEBP_QUALITY, effort: 4 })
          .toFile(outputPath);

        generatedCount += 1;
      }
    }

    await swapOutputDirectory(temporaryDir);
    swapped = true;

    const relativeOutput = path.relative(PROJECT_ROOT, OUTPUT_DIR);
    console.log(
      `[thumbnails] Generated ${generatedCount} WebP files from ${sources.length} images; skipped ${skippedCount}; output: ${relativeOutput}`,
    );
  } finally {
    if (!swapped) {
      await rm(temporaryDir, { recursive: true, force: true });
    }
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[thumbnails] ${message}`);
  process.exitCode = 1;
});
