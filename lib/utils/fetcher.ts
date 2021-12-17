const updateOptions = () => {
  if (typeof window === 'undefined') return {};

  if (!window.localStorage.user) return {};

  if (Object.keys(window.localStorage.user).length === 0) return {};

  const user = JSON.parse(window.localStorage.user);

  if (!!user.token) {
    return {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    };
  }
};

const fetcher = (input: RequestInfo, init: RequestInit, ...args: any[]) =>
  fetch(input, { ...init, ...updateOptions() }).then((res) => res.json());

export default fetcher;
