import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";

const useAxiosGet = <T>(): [
  response: T,
  getRequest: (url: string) => void,
  loading: boolean,
  setResponse: Dispatch<SetStateAction<T>>,
  error: Error
] => {
  const [response, setResponse] = React.useState<T>(null);
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
  return [response, getRequest, loading, setResponse, error];
};

export default useAxiosGet;
