import { useFetchUsername } from "../hooks/useFetchUsername"

const SearchSection = () => {
  const { setUsername, username, setIsSearchEnabled } = useFetchUsername();
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSearchEnabled(true);
    }}>
      <input placeholder="Enter Username" value={username} onChange={(event) => {
        setIsSearchEnabled(false);
        setUsername(event.target.value)
      }} />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchSection