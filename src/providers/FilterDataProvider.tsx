import { createContext, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface FilterDataContext {
  filterData: string;
  selectOption: (value: string) => void;
  onFilterClick: () => void;
  filterRef: React.RefObject<HTMLDivElement>;
}

export const FilterDataContext = createContext<FilterDataContext>(
  {} as FilterDataContext
);
const FilterProvider = ({ children }: Props) => {
  const [filterData, setFilterData] = useState<string>("");
  const filterRef = useRef<HTMLDivElement>(null);
  const onFilterClick = () => {
    filterRef.current?.classList.toggle("options-open");
  };

  function selectOption(value: string) {
    setFilterData(value);
  }

  return (
    <FilterDataContext.Provider
      value={{
        filterData,
        selectOption,
        filterRef,
        onFilterClick,
      }}
    >
      {children}
    </FilterDataContext.Provider>
  );
};

export default FilterProvider;
