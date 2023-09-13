import './App.css';
import SearchProvider from './context/search/SearchContext';
import Filters from './components/Filters';
import Table from './components/Table';

function App() {
  return (
    <SearchProvider>
      <Filters />
      <Table />
    </SearchProvider>
  );
}

export default App;
