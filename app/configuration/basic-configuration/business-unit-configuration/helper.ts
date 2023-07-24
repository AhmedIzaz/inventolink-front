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
  account_id,
  createBusinessUnit,
  setFieldValue,
  userId,
  getBusinessUnitLanding,
}) => {
  const payload = {
    ...values,
    account_id: account_id || 0,
    created_by: userId,
  };
  createBusinessUnit?.({
    url: "/configuration/business-unit/create-business-unit",
    payload,
    callback: () => {
      setFieldValue?.("businessUnitName", null);
      onGetBusinessUnitLanding({ getBusinessUnitLanding, account_id });
    },
  });
};

export const onGetBusinessUnitLanding = ({
  getBusinessUnitLanding,
  account_id,
}) => {
  getBusinessUnitLanding?.(
    `/configuration/business-unit/get-business-unit-landing?account_id=${account_id}`
  );
};
