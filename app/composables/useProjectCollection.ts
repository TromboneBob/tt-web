export const useProjectCollection = () => {
  const { data: projects, pending, error, refresh } = useAsyncData(
    "projects",
    () => queryCollection("prosjekter").all(),
  );

  return { projects, pending, error, refresh };
};
