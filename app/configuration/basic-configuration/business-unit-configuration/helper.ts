import { IValidationSchema } from "@common/types/formTypes";

export const businessUnitCreateRules: IValidationSchema = {
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

export const onCreateBusinessUnit = ({
  values,
  master_account,
  createBusinessUnit,
  setFieldValue,
}) => {
  const payload = {
    ...values,
    account_id: master_account?.id || 0,
  };
  createBusinessUnit?.({
    url: "/configuration/business-unit/create-business-unit",
    payload,
    callback: () => {
      setFieldValue?.("businessUnitName", null);
    },
  });
};
