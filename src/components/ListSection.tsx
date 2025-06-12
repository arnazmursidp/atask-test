import { Collapse, message, type CollapseProps } from 'antd'
import { useFetchUsername } from '../hooks/useFetchUsername'
import { useEffect, useState } from 'react';
import CardRepository from './CardRepository';

const ListSection = () => {
  const { usernameList, repositoryList, setIsRepoSearchEnabled, setSelectedUsername } = useFetchUsername()
  const { data: usernames, isLoading: isLoadingUsername, isFetching: isFetchingUsername, isError: isErrorUsername } = usernameList
  const { data: repositories, isLoading: isLoadingRepositories, isFetching: isFetchingRepositories, isError: isErrorRepository } = repositoryList
  
  const [messageApi, contextHolder] = message.useMessage();

  const [collapseItems, setCollapseItems] = useState<CollapseProps['items']>([{
    key: 0,
    label: '',
    children: <CardRepository isFetchingRepositories={isFetchingRepositories} isLoadingRepositories={isLoadingRepositories} repositories={repositories} />
  }])

  useEffect(() => {
    messageApi.error('An error has encountered, please try again later.')
  }, [isErrorUsername, isErrorRepository])

  useEffect(() => {
    setCollapseItems(usernames?.items?.map((user, index) => {
      return {
        key: `${user.login}-${index}`,
        label: user.login,
        children: <CardRepository isFetchingRepositories={isFetchingRepositories} isLoadingRepositories={isLoadingRepositories} repositories={repositories} />
      }
    }))
  }, [usernames, repositories, isFetchingRepositories, isLoadingRepositories])

  const onChangeCollapse = (value: string[]) => {
    const selectedUsername = value[0]?.split('-')[0]?.trim() || ''
    const selectedIndex = Number(value[0]?.split('-')[1] || 0)
    setIsRepoSearchEnabled(false)
    setSelectedUsername(selectedUsername)
    setIsRepoSearchEnabled(true)
    setCollapseItems(collapseItems?.map((item, index) => {
      if (index === selectedIndex) {
        return {
          ...item,
          children: <CardRepository isFetchingRepositories={isFetchingRepositories} isLoadingRepositories={isLoadingRepositories} repositories={repositories} />
        }
      }
      return {
        ...item,
      }
    }))
  }

  if (!usernames) return null

  return (
    <div style={{ borderRadius: '8px', maxWidth: '880px', margin: '0 auto', background: 'white', marginTop: '-72px', padding: '16px', paddingBottom: '32px' }}>
      {contextHolder}
      <Collapse items={collapseItems} accordion onChange={onChangeCollapse}></Collapse>
    </div>
  )
}

export default ListSection