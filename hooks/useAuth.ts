import {useRouter} from 'next/router';
import {useEffect} from 'react';
import useSWR from 'swr';

function fetcher(route: string) {
  return fetch(route)
      .then((r) => r.ok && r.json())
      .then((user) => user || null);
}

export default function useAuth({
  redirectTo,
  redirectIfFound,
} : {
    redirectTo?: string,
    redirectIfFound?: boolean
  },
) {
  const {data: user, error} = useSWR('/api/user', fetcher);
  const hasUser = Boolean(user);
  const loading = user === undefined;
  const finished = Boolean(!loading);
  const router = useRouter();
  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);
  return {
    user,
    loading,
    error,
  };
}
