import { Form, Input, InputProps, InputRef } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Rule } from "antd/es/form";
import { FormItemLabelProps } from "antd/es/form/FormItemLabel";
import { forwardRef, InputHTMLAttributes, Ref } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    size?: SizeType | string | undefined;
    label?: string;

    inputcontainerclassname?: string;
    labelClassName?: string;
    rules?: Rule[];
    labelProps?: FormItemLabelProps;
  };

const CommonInput = forwardRef(
  ({ labelProps, ...rest }: Props, ref: Ref<InputRef>) => {
    return (
      <Form.Item
        {...labelProps}
        label={rest?.label ?? ""}
        className={rest?.inputcontainerclassname || ""}
        name={rest?.name ?? ""}
        rules={rest?.rules ?? []}
      >
        <Input
          type={rest?.type || "text"}
          size={rest?.size}
          {...rest}
          ref={ref}
        />
      </Form.Item>
    );
  }
);

export default CommonInput;
