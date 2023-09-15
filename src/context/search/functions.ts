import { SearchType, PlanetType, FilterType } from '../../utils/types';

function filterByText(this: SearchType, name : string, toUpdate = true) {
  this.name = name;
  const filtredPlanets = this.planets.filter((planet) => {
    if (name === '') return true;
    return planet.name.toLowerCase().includes(name.toLowerCase());
  });
  if (toUpdate) {
    this.filtredPlanets = filtredPlanets;
    this.update();
  }
  return filtredPlanets;
}

function addFilter(this:SearchType, column: string, operator: string, number: string) {
  const filter = {
    column, operator, number,
  };
  this.filterByColumn([...this.filters, filter]);
  this.filters.push(filter);
}

function filterByColumn(this: SearchType, filters: FilterType[]) {
  const tableFiltredText = this.filterByText(this.name, false);
  const aplyedFilter = filters.reduce((acc, filter) => {
    const { column, operator, number } = filter;

    const newFilterApplied = acc.filter((planet) => {
      const planetValue = Number(planet[column as keyof PlanetType]);

      switch (operator) {
        case 'maior que':
          return planetValue > (Number(number) || -1);

        case 'menor que':
          return planetValue < (Number(number) || -1);
        case 'igual a':
          return planetValue === (Number(number));
        default: return false;
      }
    }, tableFiltredText);

    return newFilterApplied;
  }, tableFiltredText);

  this.filtredPlanets = aplyedFilter;
  this.update();
}

function deleteFilter(this: SearchType, column: string) {
  this.filters = this.filters.filter((filter) => filter.column !== column);
  this.filterByColumn(this.filters);
}

function removeAllFilters(this: SearchType) {
  this.filters = [];
  this.filterByText(this.name);
}

export default {
  filterByText, filterByColumn, addFilter, deleteFilter, removeAllFilters };
