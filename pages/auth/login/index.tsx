import React, { useState } from "react";
import CommonInput from "../../../common/components/CommonInput";
import CommonButton from "../../../common/components/CommonButton";
import { Form } from "antd";
import { IValidationSchema } from "../../../common/types/formTypes";
import { useLoginMutation } from "../../../store/queries/authApi";

const validationSchema: IValidationSchema = {
  email: [
    {
      type: "email",
      message: "Must be a email type",
      required: true,
    },
  ],
  password: [
    {
      required: true,
      min: 8,
      message: "Must be at least 8 characters",
    },
  ],
};

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [login, result] = useLoginMutation();

  console.log(result);
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <div className=" max-w-lg w-11/12  px-3 pt-8 pb-4 rounded-md ring-1 ring-gray-300 ">
        <h1 className="text-center text-3xl font-se rif">Login</h1>
        <Form
          layout="vertical"
          onFinish={(values) => {
            login(values);
          }}
        >
          <CommonInput
            inputContainerClassName="my-2"
            className="text-md font-bold text-gray-500 "
            label="Email"
            placeholder="example@email.com"
            name="email"
            type="email"
            value={form?.email}
            fieldClassName="my-4"
            onChange={(e) => {
              setForm((prev) => ({ ...prev, email: e.target.value }));
            }}
            rules={validationSchema?.email}
          />
          <CommonInput
            inputContainerClassName=" my-2"
            className=" text-md font-bold text-gray-500 "
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={form?.password}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, password: e.target.value }));
            }}
            rules={validationSchema?.password}
          />
          <CommonButton
            type="primary"
            size="middle"
            className="w-full"
            rootClassName="bg-blue-500 text-white mt-2"
            htmlType="submit"
          >
            Submit
          </CommonButton>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
