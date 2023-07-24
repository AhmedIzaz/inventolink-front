"use client";
import CommonButton from "@common/components/CommonButton";
import CommonInput from "@common/components/CommonInput";
import CommonTable from "@common/components/CommonTable";
import Loading from "@common/components/Loading";
import NormalSelect, { IDDLOption } from "@common/components/NormalSelect";
import useAxiosGet from "@common/customHooks/useAxiosGet";
import useAxiosPost from "@common/customHooks/useAxiosPost";
import { CommonContainer } from "@common/Layout/MainNavigationLayout";
import { setPageTitle } from "@store/reducers/appUtilitySlices";
import { useAppDispatch, useAppSelector } from "@store/store";
import { getPaginationSerial } from "@utils/calculations";
import { Form, Switch, TablePaginationConfig, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import {
  businessUnitCreateRules as rules,
  onCreateBusinessUnit,
  onGetBusinessUnitLanding,
} from "./helper";
const initialValues = {
  businessUnitName: "",
  address: "",
  baseCurrency: null,
  language: null,
};

const BusinessUnitConfiguration = () => {
  const {
    userInformation: {
      employeeInformation: {
        master_account: { id: account_id },
      },
      userInformation: { id: userId },
    },
  } = useAppSelector((store) => store?.userSlice, shallowEqual);
  const dispatch = useAppDispatch();
  const [currencyDDL, getCurrencyDDL, , loadingOnGetCurrency] = useAxiosGet<
    IDDLOption[] | []
  >([]);

  const [formInstance] = useForm();
  const { setFieldValue, submit } = formInstance;
  const [, createBusinessUnit, , loadingOnCreateBU] = useAxiosPost();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [businessUnitLanding, getBusinessUnitLanding, , loadingOnGetLanding] =
    useAxiosGet();
  const [, makeBusinessUnitActivity, , loadingOnBUActivity] = useAxiosPost();
  useEffect(() => {
    getCurrencyDDL(`/configuration/currency/get-all-currencies-ddl`);
    dispatch(setPageTitle("Business Unit"));
    onGetBusinessUnitLanding({ getBusinessUnitLanding, account_id });
    return () => {
      dispatch(setPageTitle(""));
    };
  }, []);
  return (
    <>
      {(loadingOnGetCurrency ||
        loadingOnCreateBU ||
        loadingOnGetLanding ||
        loadingOnBUActivity) && <Loading />}
      <CommonContainer className=" bg-white my-2 p-2 rounded-lg">
        <Form
          form={formInstance}
          initialValues={initialValues}
          layout="vertical"
          onFinish={(values) => {
            onCreateBusinessUnit({
              values,
              account_id,
              createBusinessUnit,
              setFieldValue,
              userId,
              getBusinessUnitLanding,
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
      <CommonContainer className=" bg-white my-2 p-2 rounded-lg">
        <Typography.Title level={5}>Business Unit List</Typography.Title>
        <CommonTable
          dataSource={businessUnitLanding}
          columns={columns({
            pagination,
            makeBusinessUnitActivity,
            getBusinessUnitLanding,
            account_id,
          })}
          handleTableChange={({ pagination: newPagination }) => {
            setPagination(newPagination);
          }}
          pagination={pagination}
        />
      </CommonContainer>
    </>
  );
};

export default BusinessUnitConfiguration;

const columns = ({
  pagination,
  makeBusinessUnitActivity,
  getBusinessUnitLanding,
  account_id,
}) => [
  {
    title: "SL",
    align: "center",
    width: 50,
    render: (_, __, index) => getPaginationSerial({ index, pagination }),
  },

  {
    title: "Business Unit Name",
    dataIndex: "business_unit_name",
    sort: true,
    filter: true,
    filterSearch: true,
  },
  {
    title: "Address",
    dataIndex: "address",
    render: (_, record) => record?.address || "N/A",
    width: "30%",
  },
  {
    title: "Currency",
    render: (_, record) => record?.master_currency?.currency_name || "N/A",
  },
  {
    title: "Language",
    dataIndex: "language",
    render: (_, record) => record?.language || "N/A",
  },
  {
    title: "Action",
    align: "center",
    render: (_, record) => (
      <>
        <Switch
          checked={record?.is_active}
          onChange={(checked: boolean) => {
            const payload = {
              business_unit_id: record?.id,
              activity: checked,
            };
            makeBusinessUnitActivity?.({
              url: `/configuration/business-unit/activity`,
              payload,
              callback: () => {
                onGetBusinessUnitLanding({
                  getBusinessUnitLanding,
                  account_id,
                });
              },
            });
          }}
        />
      </>
    ),
  },
];
