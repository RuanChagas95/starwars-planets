import { useContext, useEffect } from 'react';
import { searchContext } from '../../context/search/SearchContext';
import { SearchType } from '../../utils/types';

export default function Filters() {
  const [search, setSearch] = useContext(searchContext);
  useEffect(() => {
    console.log('api');

    setSearch((prev): SearchType => ({ ...prev, filtredPlanets: search.planets }));
  }, [setSearch, search.planets]);

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
