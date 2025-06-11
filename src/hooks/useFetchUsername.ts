import { useQuery } from "react-query"
import apiList from "../helpers/api";
import { useState } from "react";

export const useFetchUsername = () => {
  const [username, setUsername] = useState<string>('')
  const [selectedUsername, setSelectedUsername] = useState<string>('')
  const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(false)
  const [isRepoSearchEnabled, setIsRepoSearchEnabled] = useState<boolean>(false)

  const QUERY_USERNAME_KEY = ['query_fetch_username']
  const QUERY_REPOSITORY_KEY = ['query_fetch_repository']

  const usernameList = useQuery({
    enabled: isSearchEnabled,
    queryKey: QUERY_USERNAME_KEY,
    queryFn: async () => {
      const response = await apiList.getUsernames(username)
      return response.data
    }
  })

  const repositoryList = useQuery({
    enabled: isRepoSearchEnabled,
    queryKey: QUERY_REPOSITORY_KEY,
    queryFn: async () => {
      const response = await apiList.getReposByUsername(selectedUsername)
      return response.data
    }
  })

  return { usernameList, repositoryList, username, setUsername, setIsSearchEnabled, setIsRepoSearchEnabled, setSelectedUsername }
}