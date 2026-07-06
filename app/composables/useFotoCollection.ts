export const useFotoCollection = () => {
  const { data: fotos, pending, error, refresh } = useAsyncData(
    "fotoSessions",
    () => queryCollection("fotoSessions").all(),
  );

  return { fotos, pending, error, refresh };
};
