import MainLayout from "@/common/Layout/MainLayout";
import { Spin } from "antd";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/store";

export default function Home({}: AppProps) {
  const { isAuth } = useAppSelector((store) => store?.auth);
  useEffect(() => {
    if (isAuth) {
    } else {
    }
  }, [isAuth]);
  return (
    <>
      <Spin />
    </>
  );
}
