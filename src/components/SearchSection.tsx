type Props = {}

const SearchSection = (props: Props) => {
  return (
    <>
      <input placeholder="Enter Username" />
      <button type="submit" name="search_username">Search</button>
    </>
  )
}

export default SearchSection