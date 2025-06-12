import { Collapse, type CollapseProps } from 'antd'
import { useFetchUsername } from '../hooks/useFetchUsername'
import { useEffect, useState } from 'react'

const ListSection = () => {
  const [collapseItems, setCollapseItems] = useState<CollapseProps['items']>([{
    key: 0,
    label: '',
    children: <></>
  }])
  const { usernameList, username, repositoryList, setIsRepoSearchEnabled, setSelectedUsername } = useFetchUsername()
  const { data: usernames, isLoading: isLoadingUsername, isFetching: isFetchingUsername } = usernameList
  const { data: repositories, isLoading: isLoadingRepositories, isFetching: isFetchingRepositories } = repositoryList

  useEffect(() => {
    setCollapseItems(usernames?.items?.map((user, index) => {
      return {
        key: `${user.login}-${index}`,
        label: user.login,
        children: <p>index</p>
      }
    }))
  }, [usernames])

  const repositoryLayout = () => {
    return isLoadingRepositories || isFetchingRepositories ? <p>Loading Repositories</p> : repositories?.map((repo) => (
      <div key={repo.name} style={{ backgroundColor: 'grey' }}>
        {repo.name} <br />
        {repo.description} <br />
        {repo.stargazers_count}
      </div>
    ))
  }

  const onChangeCollapse = (value: string[]) => {
    setIsRepoSearchEnabled(false)
    setSelectedUsername(value)
    // setCollapseItems()
    setIsRepoSearchEnabled(true)
  }

  if (!usernames) return null

  return (
    isLoadingUsername || isFetchingUsername ? <p>loading</p> : 
    <>
      <p>Showing users for {username}</p>
      <Collapse items={collapseItems} onChange={onChangeCollapse}></Collapse>
    </>
  )
}

export default ListSection