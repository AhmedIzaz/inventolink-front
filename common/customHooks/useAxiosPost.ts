import { IToastType } from "@common/types/text";
import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

interface IPostRequest {
  url?: string;
  payload?: any;
  callback?: (res: any) => void;
  requestType?: "post" | "put" | "delete" | "patch";
  isToast?: boolean;
  toastType?: IToastType;
  toastMessage?: string;
}

const useAxiosPost = (
  initialValues: any = null
): [
  response: any,
  postRequest: (props: IPostRequest) => void | Promise<any>,
  setResponse: Dispatch<SetStateAction<any>>,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  error: Error
] => {
  const [response, setResponse] = React.useState<any>(initialValues || null);
  const [error, setError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const postRequest = async ({
    url,
    payload,
    callback,
    requestType = "post",
    isToast = true,
    toastType,
    toastMessage,
  }: IPostRequest) => {
    setLoading(true);
    try {
      const response = await axios[requestType](url, payload);
      setLoading(false);
      callback?.(response.data);
      setResponse(response.data);
      if (isToast) toast[toastType](toastMessage || response.data?.message);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return [response, postRequest, setResponse, loading, setLoading, error];
};

export default useAxiosPost;
