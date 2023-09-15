import { useContext, useRef } from 'react';
import { searchContext } from '../../context/search/SearchContext';

export default function Filters() {
  const [search] = useContext(searchContext);
  const columnsRef = useRef<HTMLSelectElement>(null);
  const operatorRef = useRef<HTMLSelectElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);

  const inputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search.filterByText(e.target.value);
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
          ref={ columnsRef }
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
        <select
          name="operator"
          data-testid="comparison-filter"
          ref={ operatorRef }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <input
        name="number"
        type="number"
        data-testid="value-filter"
        defaultValue={ 0 }
        ref={ numberRef }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          if (columnsRef.current?.value
             && operatorRef.current?.value
              && numberRef.current?.value) {
            search.addFilter(
              columnsRef.current.value,
              operatorRef.current.value,
              numberRef.current.value,
            );
          }
        } }
      >
        Filter
      </button>

      <div>
        {search.filters.map(
          (filter) => (
            <div key={ filter.column } data-testid="filter">
              <span>{filter.column}</span>
              {' '}
              <span>{filter.operator}</span>
              {' '}
              <span>{filter.number}</span>
              <button
                type="button"
                onClick={ () => search.deleteFilter(filter.column) }
              >
                X
              </button>
            </div>
          ),
        )}
        {search.filters.length > 0 && (
          <button
            data-testid="button-remove-filters"
            type="button"
            onClick={ () => search.removeAllFilters() }
          >
            Remove All Filters
          </button>)}
      </div>
    </>
  );
}
