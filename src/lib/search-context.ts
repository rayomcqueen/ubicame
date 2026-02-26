import { createContext, useContext } from "react";

export interface SearchContext {
  checkIn?: Date;
  checkOut?: Date;
  guests: number;
}

const SearchCtx = createContext<SearchContext>({ guests: 0 });

export const SearchProvider = SearchCtx.Provider;
export const useSearchContext = () => useContext(SearchCtx);
