"use client";
import CommonButton from "@common/components/CommonButton";
import CommonInput from "@common/components/CommonInput";
import Loading from "@common/components/Loading";
import NormalSelect, { IDDLOption } from "@common/components/NormalSelect";
import useAxiosGet from "@common/customHooks/useAxiosGet";
import useAxiosPost from "@common/customHooks/useAxiosPost";
import { CommonContainer } from "@common/Layout/MainNavigationLayout";
import { IValidationSchema } from "@common/types/formTypes";
import { setPageTitle } from "@store/reducers/appUtilitySlices";
import { useAppDispatch, useAppSelector } from "@store/store";
import { Form } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { shallowEqual } from "react-redux";

const initialValues = {
  businessUnitName: "",
  address: "",
  baseCurrency: null,
  language: null,
};
const BusinessUnitConfiguration = () => {
  const dispatch = useAppDispatch();
  const [currencyDDL, getCurrencyDDL, , loadingOnGetCurrency] = useAxiosGet<
    IDDLOption[] | []
  >([]);

  const [formInstance] = useForm();
  const { setFieldValue, getFieldValue, submit, resetFields } = formInstance;
  const [, createBusinessUnit, , loadingOnCreateBU] = useAxiosPost();

  useEffect(() => {
    getCurrencyDDL(`/configuration/currency/get-all-currencies-ddl`);
    dispatch(setPageTitle("Business Unit"));
    return () => {
      dispatch(setPageTitle(""));
    };
  }, []);

  return (
    <>
      {(loadingOnGetCurrency || loadingOnCreateBU) && <Loading />}
      <CommonContainer className=" bg-white my-2 p-2 rounded-lg">
        <Form
          form={formInstance}
          initialValues={initialValues}
          layout="vertical"
          onFinish={(values) => {
            createBusinessUnit({
              url: "/configuration/business-unit/create-business-unit",
              payload: values,
            });
          }}
        >
          <div className="grid md:grid-cols-12 md:grid-flow-col gap-4">
            <div className="md:col-span-3">
              <CommonInput
                type="text"
                required={true}
                label="Business Unit Name"
                name="businessUnitName"
                rules={rules.businessUnitName}
                inputcontainerclassname="mb-0"
              />
            </div>
            <div className="md:col-span-3">
              <CommonInput
                type="text"
                required={true}
                label="Address"
                name="address"
                rules={rules.address}
                inputcontainerclassname="mb-0"
              />
            </div>
            <div className="md:col-span-3">
              <NormalSelect
                showSearch={true}
                allowClear={true}
                label="Select Currency"
                name="baseCurrency"
                options={currencyDDL}
                rules={rules.baseCurrency}
                onChange={(value) => {
                  setFieldValue("baseCurrency", value);
                }}
              />
            </div>
            <div className="md:col-span-3">
              <CommonInput
                type="text"
                required={true}
                label="Language"
                name="language"
                inputcontainerclassname="mb-0"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-12 md:grid-flow-col gap-4 mt-4">
            <div className="md:col-span-3">
              <CommonButton
                htmlType="submit"
                type="primary"
                rootClassName="bg-blue-500 text-white w-full md:w-auto"
                onClick={submit}
              >
                Save
              </CommonButton>
            </div>
          </div>
        </Form>
      </CommonContainer>
    </>
  );
};

export default BusinessUnitConfiguration;

const rules: IValidationSchema = {
  businessUnitName: [
    {
      required: true,
      message: "Business Unit Name is required",
    },
    {
      type: "string",
      message: "Must be a string",
    },
    {
      min: 3,
      message: "Must be at least 3 characters",
    },
    {
      max: 100,
      message: "Must be at most 50 characters",
    },
  ],
  address: [
    {
      required: true,
      message: "Address is required",
    },
    {
      min: 3,
      message: "Must be at least 3 characters",
    },
  ],
  baseCurrency: [
    {
      required: true,
      message: "Base Currency is required",
    },
  ],
};
