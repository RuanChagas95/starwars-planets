import { createContext, useMemo, useState } from 'react';
import { ContextStateType, SearchType, ContextProviderProps } from '../../utils/types';
import autoUpdate from '../autoUpdate';
import functions from './functions';
import initialValue from './initialValue';

export const searchContext = createContext<ContextStateType<SearchType>>(
  [{} as SearchType, () => {}],
);

export default function SearchProvider({ children }: ContextProviderProps) {
  const [search, setSearch] = useState({} as SearchType);

  useMemo(() => autoUpdate(setSearch, initialValue, functions), []);
  return (
    <searchContext.Provider value={ [search, setSearch] }>
      {children}
    </searchContext.Provider>
  );
}
