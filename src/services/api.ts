import { PlanetsType } from '../utils/types';

export async function fetchPlanets() : Promise<PlanetsType | null> {
  try {
    return await (await fetch('https://swapi.dev/api/planets/')).json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
