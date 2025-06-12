import { Card, Col, Collapse, Row, type CollapseProps } from 'antd'
import { StarFilled } from '@ant-design/icons';
import { useFetchUsername } from '../hooks/useFetchUsername'

const ListSection = () => {
  const { usernameList, repositoryList, setIsRepoSearchEnabled, setSelectedUsername } = useFetchUsername()
  const { data: usernames, isLoading: isLoadingUsername, isFetching: isFetchingUsername } = usernameList
  const { data: repositories, isLoading: isLoadingRepositories, isFetching: isFetchingRepositories } = repositoryList

  const repositoryLayout = () => {
    return isLoadingRepositories || isFetchingRepositories
      ? 
        <p>Loading Repositories</p>
      :
        <Row gutter={[8, 8]}>
          {
            repositories?.map((repo, index) => (
              <Col key={index} xs={24} md={8} lg={8}>
                <Card
                  style={{ minHeight: '200px' }}
                  title={<p style={{ marginLeft: '36px' }}>{repo.name}</p>}
                  extra={
                  <span>
                    {repo.stargazers_count}
                    <StarFilled style={{marginLeft: '8px' }} />
                  </span>}
                >
                  {repo.name} <br />
                  {repo.description} <br />
                </Card>
              </Col>
            ))
          }
      </Row>
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