import { ReactNode } from 'react';
import { AutoUpdateType } from '../context/autoUpdate';

export type PlanetType = {
  'name': string
  'rotation_period': string,
  'orbital_period': string,
  'diameter': string,
  'climate': string,
  'gravity': string,
  'terrain': string,
  'surface_water': string,
  'population': string,
  'residents': string[],
  'films': string[],
  'created': string,
  'edited': string,
  'url': string,
};
export type PlanetsType = {
  'count': number,
  'next': string
  'previous': null,
  'results': PlanetType[]
};

export type FilterType = {
  column: string;
  operator: string;
  number: string;
};

export type SearchType = {
  setState(state: React.SetStateAction<SearchType>):
  React.Dispatch<React.SetStateAction<SearchType>>;
  planets: PlanetType[];
  name: string;
  columns: FilterType
  filters: FilterType[]
  filtredPlanets: PlanetType[];
  filterByText(name : string, toUpdate?: boolean): PlanetType[];
  filterByColumn(filters: FilterType[]): void;
  addFilter(column: string, operator: string, number: string): void;
  deleteFilter(filterColumn: string): void;
  removeAllFilters(): void;
  update: AutoUpdateType<SearchType>;
};

export type ContextStateType<T> = [
  T,
  React.Dispatch<React.SetStateAction<T>>,
];

export type ContextProviderProps = {
  children: ReactNode;
};
