import { useQuery } from "react-query"
import apiList from "../helpers/api";
import { useState } from "react";
import { debounce } from "../helpers/debounce";

export const useFetchUsername = () => {
  const [username, setUsername] = useState<string>('')
  const QUERY_KEY = ['query_fetch_username', username]
  const DELAY_DURATION = 1000
  const searchUsername = useQuery({
    queryKey: QUERY_KEY,
    queryFn: debounce(async () => {
      const response = await apiList.getUsernames(username)
      return response
    }, DELAY_DURATION)
  })

  return { searchUsername, username, setUsername }
}