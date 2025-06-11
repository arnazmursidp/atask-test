import { useFetchUsername } from "../hooks/useFetchUsername"


const SearchSection = () => {
  const { data, isLoading } = useFetchUsername('octocat');
  console.log('data', data);
  console.log('isLoading', isLoading)
  
  return (
    <>
      <input placeholder="Enter Username" />
      <button type="submit" name="search_username">Search</button>
    </>
  )
}

export default SearchSection