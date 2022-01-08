export type FetchData<data> = {
  data: data;
  status: "idle" | "loading" | "complete" | "failed";
  error: string | null | undefined;
};
