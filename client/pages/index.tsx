import { NextPage, NextPageContext } from "next";
import { buildClient } from "../api/build-client";

const Page: NextPage = () => {
  return <p>Landing Page</p>;
};

Page.getInitialProps = async (context: NextPageContext) => {
  const client = buildClient(context);
  const response = await client.get("/api/users/currentuser");

  return { data: response.data };
};
export default Page;
