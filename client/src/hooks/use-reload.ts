import { useCallback } from "react";
import { useSWRConfig } from "swr";

export function useReload(url: string) {
  const { mutate } = useSWRConfig();

  const reload = useCallback(() => {
    mutate(url);
  }, [mutate, url]);

  return { reload };
}
