import { TablePaginationConfig } from "antd";
type IGetPaginationSerial = {
  index: number;
  pagination: TablePaginationConfig;
};
export const getPaginationSerial = ({
  pagination: { current, pageSize },
  index,
}: IGetPaginationSerial) => (current - 1) * pageSize + (index + 1);
