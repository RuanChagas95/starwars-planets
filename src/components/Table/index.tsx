import { useCallback, useContext, useEffect } from 'react';
import { fetchPlanets } from '../../services/api';
import { SearchType } from '../../utils/types';
import { searchContext } from '../../context/search/SearchContext';

export default function Table() {
  const [search, setSearch] = useContext(searchContext);

  const fetchCallBack = useCallback(async () => {
    const currPlanets = await fetchPlanets();
    if (currPlanets) {
      setSearch((prev):SearchType => ({ ...prev,
        planets: currPlanets.results,
        filtredPlanets: currPlanets.results }));
    }
  }, [setSearch]);
  useEffect(() => {
    fetchCallBack();
  }, [fetchCallBack]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edtided</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>

        {search.filtredPlanets.map((planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
