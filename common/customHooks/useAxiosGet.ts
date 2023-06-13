import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";

const useAxiosGet = <T>(
  initialValues: any = null
): [
  response: T,
  getRequest: (url: string, cb?: (res: T) => void) => void,
  setResponse: Dispatch<SetStateAction<T>>,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  error: Error
] => {
  const [response, setResponse] = React.useState<T>(initialValues || null);
  const [error, setError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const getRequest = async (url: string, cb?: (res: T) => void) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setResponse(response.data);
      setLoading(false);
      cb?.(response.data);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return [response, getRequest, setResponse, loading, setLoading, error];
};

export default useAxiosGet;
