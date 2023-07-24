"use client";
import { createUniqueList } from "@utils/uniqIdentifier";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import React, { useMemo, useState } from "react";
type IHandleTableProps = {
  pagination: TablePaginationConfig;
  filters: Record<string, FilterValue | null>;
  sorter: SorterResult<any> | SorterResult<any>[];
  newRowDto: TableCurrentDataSource<any>;
};
type Props = {
  dataSource: any[] | any;
  columns: ColumnsType<any> | any[];
  setColumnsData?: (data: any) => void;
  handleTableChange?: (handleTableProps: IHandleTableProps) => void;
  pagination?: TablePaginationConfig;
};

function CommonTable(props: Props) {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [, setSortedInfo] = useState({});
  const [filterList, setFIlterList] = useState([...(props?.dataSource || [])]);

  const columns = useMemo(
    () => modifieColumn({ columns: props?.columns, filteredInfo, filterList }),
    [props.columns, filteredInfo, filterList]
  );
  const handleTableOnChange = (
    pagination: any,
    filters: any,
    sorter: any,
    newRowDto: any
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    props?.setColumnsData?.(newRowDto?.currentDataSource);
    setFIlterList?.(newRowDto?.currentDataSource);
    props?.handleTableChange?.({ pagination, filters, sorter, newRowDto });
  };
  return <Table onChange={handleTableOnChange} {...props} columns={columns} />;
}

export default CommonTable;

const modifieColumn = ({ columns, filteredInfo, filterList }) => {
  const modifiedColumns = columns.map((item: any) => ({
    className: "!p-2",
    ...item,
    sorter: sorterFunction({ item }),
    ...filterFunction({ item, filteredInfo, filterList }),
  }));
  return modifiedColumns;
};

const sorterFunction = ({ item }) => {
  let sorter: any = false;
  if (item?.sort) {
    if (item?.isNumber)
      sorter = (a: any, b: any) => a?.[item?.dataIndex] - b?.[item?.dataIndex];
    else
      sorter = (a: any, b: any) =>
        a[item?.dataIndex]?.length - b[item?.dataIndex]?.length;
  }

  return sorter;
};

const filterFunction = ({ item, filteredInfo, filterList }) => {
  let filterObject = {};
  if (item?.filter) {
    filterObject = {
      filterSearch: item?.filterSearch || false,
      onFilter: (value: any, record: any) => record?.[item?.dataIndex] == value,
      filteredValue: filteredInfo?.[item?.dataIndex] || null,
      filters: createFilterList({ item, filterList }),
    };
  }
  return filterObject;
};

const createFilterList = ({ item, filterList }) => {
  const uniqList = createUniqueList({
    list: filterList,
    key: item?.dataIndex,
  });
  const filtersFormattedList = uniqList.map((nesteditem) => ({
    text: nesteditem?.title,
    value: nesteditem?.title,
  }));
  return filtersFormattedList;
};
