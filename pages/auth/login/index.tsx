import React, { useState } from "react";
import CommonInput from "../../../common/components/CommonInput";
import CommonButton from "../../../common/components/CommonButton";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <div className=" max-w-lg w-11/12  px-3 pt-8 pb-4 rounded-md ring-1 ring-gray-300 ">
        <h1 className="text-center text-3xl font-se rif">Login</h1>
        <CommonInput
          inputContainerClassName=" my-2"
          labelClassName=" text-md font-bold text-gray-500 "
          label="Email"
          placeholder="example@email.com"
          valueType="email"
          value={form?.email}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <CommonInput
          inputContainerClassName=" my-2"
          labelClassName=" text-md font-bold text-gray-500 "
          label="Password"
          placeholder="Password"
          valueType="text"
          value={form?.password}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <CommonButton
          type="primary"
          size="middle"
          className="w-full"
          rootClassName="bg-blue-500 text-white mt-2"
        >
          Submit
        </CommonButton>
      </div>
    </div>
  );
};

export default LoginPage;
