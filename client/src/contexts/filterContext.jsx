// FilterContext.js
import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function useFilterContext() {
    return useContext(FilterContext);
}

export function FilterProvider({ children }) {
    const [filter, setFilter] = useState('');

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    );
}
