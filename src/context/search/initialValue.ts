import { PlanetType } from '../../utils/types';

export default {
  planets: [] as PlanetType[],
  name: '',
  columns: { column: 'population', operator: 'maior que', number: '0' },
  filtredPlanets: [] as PlanetType[] };
