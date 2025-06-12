import { Collapse, type CollapseProps } from 'antd'
import { useFetchUsername } from '../hooks/useFetchUsername'
import { useEffect, useState } from 'react'

const ListSection = () => {
  const { usernameList, repositoryList, setIsRepoSearchEnabled, setSelectedUsername } = useFetchUsername()
  const { data: usernames, isLoading: isLoadingUsername, isFetching: isFetchingUsername } = usernameList
  const { data: repositories, isLoading: isLoadingRepositories, isFetching: isFetchingRepositories } = repositoryList

  const repositoryLayout = () => {
    return isLoadingRepositories || isFetchingRepositories ? <p>Loading Repositories</p> : repositories?.map((repo) => (
      <div key={repo.name} style={{ backgroundColor: 'grey' }}>
        {repo.name} <br />
        {repo.description} <br />
        {repo.stargazers_count}
      </div>
    ))
  }
  
  let collapseItems: CollapseProps['items'] = usernames?.items?.map((user, index) => {
    return {
      key: `${user.login}-${index}`,
      label: user.login,
      children: repositoryLayout()
    }
  })

  const onChangeCollapse = (value: string[]) => {
    const selectedUsername = value[0]?.split('-')[0]?.trim() || ''
    const selectedIndex = Number(value[0]?.split('-')[1] || 0)
    setIsRepoSearchEnabled(false)
    setSelectedUsername(selectedUsername)
    setIsRepoSearchEnabled(true)
    collapseItems = collapseItems?.map((item, index) => {
      if (index === selectedIndex) {
        return {
          ...item,
          children: repositoryLayout()
        }
      }
      return {
        ...item,
        children: null
      }
    })
  }

  if (!usernames) return null

  return (
    isLoadingUsername || isFetchingUsername ? <p>loading</p> : 
    <>
      <Collapse items={collapseItems} accordion onChange={onChangeCollapse}></Collapse>
    </>
  )
}

export default ListSection