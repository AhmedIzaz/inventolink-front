"use client";
import { Form } from "antd";
import React from "react";
import CommonInput from "../../../../../common/components/CommonInput";
import NormalSelect from "../../../../../common/components/NormalSelect";
import { CommonContainer } from "../../../../../common/Layout/MainNavigationLayout";
import { IValidationSchema } from "../../../../../common/types/formTypes";
const BusinessUnitConfiguration = () => {
  const [form, setForm] = React.useState({
    businessUnitName: "",
    address: "",
    baseCurrency: null,
    language: null,
  });
  return (
    <>
      <CommonContainer className=" bg-white my-2 p-2 rounded-lg">
        <Form layout="vertical">
          <div className=" grid md:grid-cols-12 md:grid-flow-col gap-4">
            <div className="md:col-span-3">
              <CommonInput
                type="text"
                required={true}
                label="Business Unit Name"
                value={form?.businessUnitName}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    businessUnitName: e.target.value,
                  }));
                }}
                rules={rules.businessUnitName}
                inputcontainerclassname="mb-0"
              />
            </div>
            <div className="md:col-span-3">
              <CommonInput
                type="text"
                required={true}
                label="Address"
                value={form?.address}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }));
                }}
                inputcontainerclassname="mb-0"
              />
            </div>
            <div className="md:col-span-3">
              <NormalSelect
                showSearch={true}
                allowClear={false}
                label="Select Currency"
                value={form?.baseCurrency}
                options={[]}
                onChange={(valueOption) => {
                  setForm((prev) => ({ ...prev, baseCurrency: valueOption }));
                }}
              />
            </div>
            <div className="md:col-span-3">
              <NormalSelect
                showSearch={true}
                allowClear={false}
                placeholder=""
                label="Select Language"
                value={form?.language}
                options={[]}
                onChange={(valueOption) => {
                  setForm((prev) => ({ ...prev, language: valueOption }));
                }}
              />
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
    {
      type: "object",
      message: "Must be a valid currency",
    },
  ],
};
