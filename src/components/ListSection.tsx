import { useFetchUsername } from '../hooks/useFetchUsername'

const ListSection = () => {
  const { usernameList, username } = useFetchUsername()

  const { data: usernames, isLoading, isFetching } = usernameList
  return (
    isLoading || isFetching ? <p>loading</p> : 
    <>
      <p>Showing users for {username}</p>
      {usernames?.items?.map((user) => (
        <div key={user.login}>
          {user.login}
          {/* {repos?.map((repo) => (
            <div key={repo.name} style={{ backgroundColor: 'grey' }}>
              {repo.name} <br />
              {repo.description} <br />
              {repo.stargazers_count}
            </div>
          ))} */}
        </div>
      ))}
    </>
  )
}

export default ListSection