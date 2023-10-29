import React, { useContext } from "react";
import { FilterDataContext } from "../../providers/FilterDataProvider";

interface Props {
  children: React.ReactNode;
  defaultOption?: boolean;
}

const Option = ({ children, defaultOption }: Props) => {
  const { filterData, selectOption, onFilterClick } =
    useContext(FilterDataContext);

  function handleOptionClick() {
    selectOption(defaultOption ? "" : children?.toString()!);
    onFilterClick();
  }

  return (
    <div
      onClick={handleOptionClick}
      className={`option txt-dark ${
        filterData === children ? "option-selected" : ""
      } ${defaultOption && !filterData ? "option-selected" : ""}`}
    >
      {children}
    </div>
  );
};

export default Option;
