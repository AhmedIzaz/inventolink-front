import React from "react";
import { useGetPostsQuery } from "../store/queries";

const TestPage = () => {
  const { data, isLoading } = useGetPostsQuery("S");
  console.log(data);
  return (
    <>
      {isLoading ? <div>loading...</div> : <div>Data Fetched</div>}
      <div>TestPage</div>
    </>
  );
};

export default TestPage;
