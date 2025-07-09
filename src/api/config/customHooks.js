import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
//GET
export const useApiGet = (key, fn, options) => {
  return useQuery({
    queryKey: key,
    queryFn: fn,
    ...options,
  });
};
//POST/PUT/PATH
export const useApiSend = (fn, success, error, invalidateKey, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: (data) => {
      invalidateKey &&
        invalidateKey.forEach((key) => {
          queryClient.invalidateQueries(key);
        });
      success && success(data);
    },
    onError: error,
    retry: 0,
    ...options,
  });
};
