import { useQuery } from "react-query"
import apiList from "../helpers/api";

export const useFetchUsername = (username: string) => {
  const QUERY_KEY = 'query_fetch_username'
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await apiList.getUsernames(username)
      console.log('response', response)
      console.log('data', response.data)
      return response.data
    }
  });
}