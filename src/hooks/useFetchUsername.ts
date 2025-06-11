import { useQuery } from "react-query"
import apiList from "../helpers/api";
import { useState } from "react";

export const useFetchUsername = () => {
  const [username, setUsername] = useState<string>('')
  const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(false)
  const QUERY_KEY = ['query_fetch_username']
  const usernameList = useQuery({
    enabled: isSearchEnabled,
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await apiList.getUsernames(username)
      return response
    }
  })

  return { usernameList, username, setUsername, setIsSearchEnabled }
}