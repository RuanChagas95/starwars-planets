import { useContext } from 'react';
import { searchContext } from '../../context/search/SearchContext';

export default function Filters() {
  const [search, setSearch] = useContext(searchContext);

  const inputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search.filterByText(e.target.value);
  };

  const columnChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name } = e.target;
    if (Object.keys(search.columns).includes(name)) {
      search.columns[name as keyof typeof search.columns] = e.target.value;
      setSearch(search);
    }
  };
  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ inputTextChange }
      />
      <label>
        Columns:
        {' '}
        <select
          name="column"
          data-testid="column-filter"
          onChange={ columnChange }
        >
          {(['population', 'orbital_period', 'diameter', 'rotation_period',
            'surface_water'].filter((option) => !search.filters
            .some((filter) => filter.column === option))).map((option) => {
            return (
              <option key={ option } value={ option }>{option}</option>
            );
          })}
        </select>
      </label>

      <label>
        Operator:
        {' '}
        {' '}
        <select name="operator" data-testid="comparison-filter" onChange={ columnChange }>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <input
        name="number"
        onChange={ columnChange }
        type="number"
        data-testid="value-filter"
        defaultValue={ 0 }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => search.addFilter() }
      >
        Filter
      </button>
    </>
  );
}
