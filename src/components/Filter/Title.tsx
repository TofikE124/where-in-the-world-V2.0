import { useContext } from "react";
import { FilterDataContext } from "../../providers/FilterDataProvider";

interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props) => {
  const { filterData, onFilterClick } = useContext(FilterDataContext);
  return (
    <div
      onClick={onFilterClick}
      className="filter-title-container bx-s bg-white flex br"
    >
      <p className="filter-title fs-500 fw-400">{filterData || children}</p>
      <img src="/images/arrow.svg" />
    </div>
  );
};

export default Title;
