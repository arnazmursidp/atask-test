import { useFetchUsername } from "../hooks/useFetchUsername"

const SearchSection = () => {
  const { setUsername, username } = useFetchUsername();
  
  return (
    <>
      <input placeholder="Enter Username" value={username} onChange={(event) => setUsername(event.target.value)} />
      <button type="submit" name="search_username">Search</button>
    </>
  )
}

export default SearchSection