import { Rule } from "antd/es/form";

export interface IValidationSchema {
  [key: string]: Rule[];
}
