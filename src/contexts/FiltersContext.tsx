import React, { createContext, useContext, useState } from 'react';

interface FiltersContextType {
  selectedMonth: number;
  selectedYear: number;
  selectedCountry: string | null;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  setSelectedCountry: (country: string | null) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <FiltersContext.Provider
      value={{
        selectedMonth,
        selectedYear,
        selectedCountry,
        setSelectedMonth,
        setSelectedYear,
        setSelectedCountry,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};
