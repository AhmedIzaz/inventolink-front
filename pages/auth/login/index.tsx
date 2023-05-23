import React, { useState } from "react";
import CommonInput from "../../../common/components/CommonInput";
import CommonButton from "../../../common/components/CommonButton";
import { Form } from "antd";
import { IValidationSchema } from "../../../common/types/formTypes";
import { useLoginMutation } from "../../../store/queries/authApi";
import { IUserLoginDataset } from "../../../interfaces/configurationInterfaces/userConfigurationInterfaces/userConfigurationInterfaces";
import { API_BASE_URL } from "../../../store/api";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { shallowEqual } from "react-redux";
import { on } from "events";
import { setUserInformation } from "../../../store/reducers/configurationSlices/authSlice";

const LoginPage = () => {
  const { userInformation } = useAppSelector(
    (store) => store?.userSlice,
    shallowEqual
  );
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<IUserLoginDataset>({
    email: "",
    password: "",
  });
  const [login, result] = useLoginMutation();
  console.log(userInformation);
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <div className=" max-w-lg w-11/12  px-3 pt-8 pb-4 rounded-md ring-1 ring-gray-300 ">
        <h1 className="text-center text-3xl font-se rif">Login</h1>
        <Form
          layout="vertical"
          onFinish={(values) => {
            const onLogin = async () => {
              try {
                const { message, ...responseData } = await login(
                  values
                ).unwrap();
                dispatch(setUserInformation(responseData));
              } catch (err) {
                console.log(err);
              }
            };
            onLogin();
          }}
        >
          <CommonInput
            className=""
            label="Email"
            placeholder="example@email.com"
            name="email"
            type="email"
            value={form?.email}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, email: e.target.value }));
            }}
            rules={validationSchema?.email}
          />
          <CommonInput
            inputcontainerclassname=""
            className=""
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
            rootClassName="bg-blue-500 text-white"
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
