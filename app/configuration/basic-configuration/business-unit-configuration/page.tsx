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
      employeeInformation: { master_account },
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
            onCreateBusinessUnit({
              values,
              master_account,
              createBusinessUnit,
              setFieldValue,
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
          dataSource={dataSource}
          columns={columns({ pagination })}
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

const dataSource = [
  {
    id: 1,
    title: "test",
  },
  {
    id: 2,
    title: "test 2",
  },
  {
    id: 3,

    title: "test 3",
  },
  {
    id: 1,
    title: "test",
  },
  {
    id: 2,
    title: "test 2",
  },
  {
    id: 3,

    title: "test 3",
  },
  {
    id: 1,
    title: "test",
  },
  {
    id: 2,
    title: "test 2",
  },
  {
    id: 3,

    title: "test 3",
  },
  {
    id: 1,
    title: "test",
  },
  {
    id: 2,
    title: "test 2",
  },
  {
    id: 3,

    title: "test 3",
  },
  {
    id: 1,
    title: "test",
  },
  {
    id: 2,
    title: "test 2",
  },
  {
    id: 3,

    title: "test 3",
  },
  {
    id: 1,
    title: "test",
  },
  {
    id: 2,
    title: "test 2",
  },
  {
    id: 3,

    title: "test 3",
  },
  {
    id: 1,
    title: "test",
  },
  {
    id: 2,
    title: "test 2",
  },
  {
    id: 3,

    title: "test 3",
  },
  {
    id: 1,
    title: "test",
  },
  {
    id: 2,
    title: "test 2",
  },
  {
    id: 3,

    title: "test 3",
  },
  {
    id: 1,
    title: "test",
  },
  {
    id: 2,
    title: "test 2",
  },
  {
    id: 3,

    title: "test 3",
  },
  {
    id: 1,
    title: "test",
  },
  {
    id: 2,
    title: "test 2",
  },
  {
    id: 3,

    title: "test 3",
  },
];
const columns = ({ pagination }) => [
  {
    title: "SL",
    align: "center",
    width: 50,
    render: (_, __, index) => getPaginationSerial({ index, pagination }),
  },
  {
    title: "Business Unit ID",
    dataIndex: "id",
  },
  {
    title: "Business Unit Name",
    dataIndex: "title",
    sort: true,
    filter: true,
    filterSearch: true,
  },
  {
    title: "Action",
    align: "center",
    render: (_, record) => (
      <>
        <Switch
          onChange={(checked: boolean) => {
            console.log(checked);
          }}
        />
      </>
    ),
  },
];
