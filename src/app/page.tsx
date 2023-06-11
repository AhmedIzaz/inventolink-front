"use client";
import Axios from "axios";
import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector } from "../../store/store";

export default function Home() {
  const { userInformation } = useAppSelector(
    (store) => store?.userSlice,
    shallowEqual
  );

  useEffect(() => {
    if (userInformation?.token) {
      Axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userInformation?.token}`;
    }
  }, [userInformation]);
  return <></>;
}
