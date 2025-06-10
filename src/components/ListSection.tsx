import React, { use } from 'react'

type Props = {}
import users from '../__mock__/username_response.json'
import repos from '../__mock__/repository_response.json'

const ListSection = (props: Props) => {
  return (
    <>
      <p>Showing users for "Exampleuser"</p>
      {users.map((user) => (
        <div key={user.user.login}>
          {user.user.login}
          {repos?.map((repo) => (
            <div key={repo.name} style={{ backgroundColor: 'grey' }}>
              {repo.name} <br />
              {repo.description} <br />
              {repo.stargazers_count}
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default ListSection