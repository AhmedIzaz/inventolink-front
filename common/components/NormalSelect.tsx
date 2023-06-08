import { Select } from "antd";
import React from "react";
interface IDDLOption {
  label?: string;
  value?: number;
}
interface NormalSelectPropsType {
  showSearch?: boolean;
  width?: number;
  placeholder?: string;
  onChange?: (value: IDDLOption | IDDLOption[] | null) => void;
  onSearch?: (value: string) => void;
  label?: string;
  filterOption?: boolean | ((inputValue?: string, option?: any) => boolean);
  options?: IDDLOption[] | [];
  clearIcon?: boolean;
  allowClear?: boolean;
  value?: IDDLOption | IDDLOption[] | null;
  mode?: "multiple" | "tags" | null;
}

const NormalSelect = ({
  showSearch,
  width,
  placeholder,
  onChange,
  onSearch,
  filterOption,
  options,
  label,
  clearIcon,
  allowClear,
  value,
  mode,
}: NormalSelectPropsType) => {
  return (
    <>
      {label ? <label>{label}</label> : <></>}
      <Select
        showSearch={showSearch || false}
        style={{ width: width || 350 }}
        placeholder={placeholder || ""}
        optionFilterProp="children"
        onChange={(_, valueOption) => {
          onChange?.(valueOption || null);
        }}
        mode={mode}
        value={value}
        onSearch={onSearch}
        filterOption={filterOption}
        options={options}
        clearIcon={clearIcon}
        allowClear={allowClear}
      />
    </>
  );
};

export default NormalSelect;
