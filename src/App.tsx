import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import ListSection from './components/ListSection'
import SearchSection from './components/SearchSection'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchSection />
      <ListSection />
    </QueryClientProvider>
  )
}

export default App
