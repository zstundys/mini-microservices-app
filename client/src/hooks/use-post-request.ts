import axios from "axios";
import { useCallback } from "react";
import { useReload } from "./use-reload";

export function usePostRequest<T>(url: string, reloadUrl: string) {
  const { reload } = useReload(reloadUrl);

  const request = useCallback(
    (payload: T) =>
      axios.post(url, payload).then((response) => {
        reload();

        return response;
      }),
    []
  );

  return request;
}
