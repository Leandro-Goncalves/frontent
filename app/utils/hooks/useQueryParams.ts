import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export const useQueryParams = () => {
  const searchParams = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();
  const pathname = usePathname();

  return {
    get: (key: string) => {
      return searchParams.get(key);
    },
    set: (key: string, value: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set(key, value);

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`);
    },
    delete: (key: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete(key);

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`);
    },
  };
};
