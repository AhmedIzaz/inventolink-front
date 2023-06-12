import React from "react";
import CommonInput from "../../../../../common/components/CommonInput";
import NormalSelect from "../../../../../common/components/NormalSelect";
import { CommonContainer } from "../../../../../common/Layout/MainNavigationLayout";
import { IValidationSchema } from "../../../../../common/types/formTypes";
const BusinessUnitConfiguration = () => {
  const [form, setForm] = React.useState({
    businessUnitName: "",
    address: "",
    baseCurrency: "",
    language: "",
  });
  return (
    <>
      <CommonContainer className=" bg-white my-2">
        <div className=" grid md:grid-flow-col gap-2">
          <div className="lg:col-span-4">
            <CommonInput
              type="text"
              required
              title="Business Unit Name"
              value={form.businessUnitName}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  businessUnitName: e.target.value,
                }));
              }}
              rules={rules.businessUnitName}
            />
          </div>
          <div className="lg:col-span-4">
            <CommonInput
              type="text"
              required
              title="Address"
              value={form.address}
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  address: e.target.value,
                }));
              }}
            />
          </div>
          <div className="lg:col-span-4">
            {/* <NormalSelect 
              status=""
            
            /> */}
          </div>
          <div className="lg:col-span-4"></div>
        </div>
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
