import { createContext, useContext } from "react";
import { FilterDataContext } from "../../providers/FilterDataProvider";

interface Props {
  children: React.ReactNode;
}

const Filter = ({ children }: Props) => {
  const { filterRef } = useContext(FilterDataContext);
  return (
    <div ref={filterRef} className="filter-container">
      {children}
    </div>
  );
};

export default Filter;
