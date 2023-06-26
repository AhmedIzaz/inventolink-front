import { ColProps, Form, Select } from "antd";
import { Rule } from "antd/es/form";
import { InputStatus } from "antd/es/_util/statusUtils";
import React from "react";
export interface IDDLOption {
  label?: string;
  value?: number;
  [key: string]: any;
}
interface NormalSelectPropsType {
  showSearch?: boolean;
  width?: number;
  placeholder?: string;
  onChange?: (value: IDDLOption | IDDLOption[] | null) => void;
  onSearch?: (value: string) => void;
  label?: string;
  name?: string;
  rules?: Rule[];
  filterOption?: boolean | ((inputValue?: string, option?: any) => boolean);
  options?: IDDLOption[] | [];
  clearIcon?: boolean;
  allowClear?: boolean;
  value?: IDDLOption | IDDLOption[] | null;
  mode?: "multiple" | "tags" | null;
  status?: InputStatus;
  className?: string;
  labelCol?: ColProps;
  style?: React.CSSProperties;
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
  status,
  rules,
  name,
  className,
  labelCol,
  style,
}: NormalSelectPropsType) => {
  return (
    <>
      <Form.Item
        label={label}
        name={name}
        rules={rules}
        className={className}
        labelCol={labelCol}
        style={{ margin: "0", padding: "0", ...style }}
      >
        <Select
          showSearch={showSearch || false}
          style={{ width: width || "100%" }}
          placeholder={placeholder || ""}
          optionFilterProp="children"
          onChange={(_, valueOption) => {
            onChange?.(valueOption || null);
          }}
          mode={mode}
          value={value}
          onSearch={onSearch}
          filterOption={
            filterOption ||
            (showSearch
              ? (input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
              : null)
          }
          options={options}
          clearIcon={clearIcon}
          allowClear={allowClear}
          status={status}
        />
      </Form.Item>
    </>
  );
};

export default NormalSelect;
