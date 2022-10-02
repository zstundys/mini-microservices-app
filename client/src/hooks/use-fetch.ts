import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data as any);

export function useFetch<T>(url: string) {
  return useSWR<T>(url, fetcher);
}
