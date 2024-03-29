"use client";
import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { shallowEqual } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@store/store";
import { IUserLoginDataset } from "@interfaces/configurationInterfaces/userConfigurationInterfaces/userConfigurationInterfaces";
import useAxiosPost from "@common/customHooks/useAxiosPost";
import Loading from "@common/components/Loading";
import {
  setSelectedBusinessUnit,
  setUserInformation,
} from "@store/reducers/configurationSlices/authSlice";
import CommonInput from "@common/components/CommonInput";
import CommonButton from "@common/components/CommonButton";
import { IValidationSchema } from "@common/types/formTypes";
import Axios from "axios";
const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { userInformation } = useAppSelector(
    (store) => store?.userSlice,
    shallowEqual
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [form, setForm] = useState<IUserLoginDataset>({
    email: "",
    password: "",
  });
  const [, loginRequest, , loadingOnLogin] = useAxiosPost();
  useEffect(() => {
    if (userInformation?.token) {
      toast.warning("You are already logged in");
      return router.push("/");
    }
    setLoading(false);
  }, []);
  return (
    <>
      {loadingOnLogin && <Loading />}
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen min-w-full flex items-center justify-center">
          <div className=" max-w-lg w-11/12  px-3 pt-8 pb-4 rounded-md ring-1 ring-gray-300 ">
            <h1 className="text-center text-3xl font-se rif">Login</h1>
            <Form
              layout="vertical"
              onFinish={async (values) => {
                try {
                  const { message, ...responseData } = await loginRequest({
                    url: "/configuration/user/login",
                    payload: values,
                    requestType: "post",
                  });
                  if (responseData?.token)
                    Axios.defaults.headers.head.Authorization =
                      responseData?.token;
                  dispatch(setUserInformation(responseData));
                  const selectedBusinessUnit =
                    responseData?.permittedBusinessUnitDDL?.[0];
                  dispatch(
                    setSelectedBusinessUnit(selectedBusinessUnit || null)
                  );
                  router.push("/");
                  toast.success(message);
                } catch (err) {
                  console.log(err);
                  toast.error(err?.message);
                }
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
      )}
    </>
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
