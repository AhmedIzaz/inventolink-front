import { Input, InputRef } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { forwardRef, InputHTMLAttributes, Ref } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  valueType: "text" | "password" | "email" | "number";
  size?: SizeType | string | undefined;
  label?: string;
  fieldClassName?: string;
  inputContainerClassName?: string;
  labelClassName?: string;
};

const CommonInput = forwardRef(
  ({ valueType, ...rest }: Props, ref: Ref<InputRef>) => {
    let inputType;
    switch (valueType) {
      case "password":
        inputType = "password";
        break;
      case "email":
        inputType = "email";
        break;
      case "number":
        inputType = "number";
        break;
      default:
        inputType = "text";
    }

    return (
      <div className={rest?.inputContainerClassName || ""}>
        {rest?.label ? (
          <label className={rest?.labelClassName || ""}>{rest?.label}</label>
        ) : (
          <></>
        )}
        <Input
          className={rest?.fieldClassName || ""}
          type={inputType}
          size={rest?.size || "middle"}
          {...rest}
          ref={ref}
        />
      </div>
    );
  }
);

export default CommonInput;
