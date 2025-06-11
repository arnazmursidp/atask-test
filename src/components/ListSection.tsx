import { useFetchUsername } from '../hooks/useFetchUsername'

const ListSection = () => {
  const { usernameList, username, repositoryList, setSelectedUsername, setIsRepoSearchEnabled } = useFetchUsername()

  const { data: usernames, isLoading: isLoadingUsername, isFetching: isFetchingUsername } = usernameList
  const { data: repositories, isLoading: isLoadingRepositories, isFetching: isFetchingRepositories } = repositoryList

  return (
    isLoadingUsername || isFetchingUsername ? <p>loading</p> : 
    <>
      <p>Showing users for {username}</p>
      {usernames?.items?.map((user) => (
        <>
          <button key={user.login} onClick={() => {
            setIsRepoSearchEnabled(false)
            setSelectedUsername(user.login)
            setIsRepoSearchEnabled(true)
          }}>
            {user.login}
          </button>
          {isLoadingRepositories || isFetchingRepositories ? <p>Loading Repositories</p> : repositories?.map((repo) => (
            <div key={repo.name} style={{ backgroundColor: 'grey' }}>
              {repo.name} <br />
              {repo.description} <br />
              {repo.stargazers_count}
            </div>
          ))}
        </>
      ))}
    </>
  )
}

export default ListSection