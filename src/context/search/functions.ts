import { SearchType, PlanetType } from '../../utils/types';

function filterByText(this: SearchType, name: string, toUpdate = true) {
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

function filterByColumn(this: SearchType) {
  const { column, operator, number } = this.columns;
  const filtred = this.filterByText(this.name, false);
  console.log(filtred);
  const columnFiltred = filtred.filter((planet) => {
    const planetValue = Number(planet[column as keyof PlanetType]);
    console.log(operator);

    switch (operator) {
      case 'maior que':
        return planetValue > (Number(number) || -1);

      case 'menor que':
        return planetValue < (Number(number) || -1);
      case 'igual a':
        return planetValue === (Number(number));
      default: return false;
    }
  });
  console.log(columnFiltred);

  this.filtredPlanets = columnFiltred;

  this.update();
}

export default { filterByText, filterByColumn };
