export const useFotoCollection = () => {
  const { data: fotos, pending, error, refresh } = useAsyncData(
    "foto-session-summaries",
    () =>
      queryCollection("fotoSessions")
        .select("name", "path", "thumbnail", "occasion")
        .all(),
    { default: () => [] },
  );

  return { fotos, pending, error, refresh };
};
