import './App.css'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import ListSection from './components/ListSection'
import SearchSection from './components/SearchSection'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchSection />
      <ListSection />
    </QueryClientProvider>
  )
}

export default App
