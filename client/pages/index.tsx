import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { AppContext } from "next/app";

const Page: NextPage = () => {
  return <p>Landing Page</p>;
};

Page.getInitialProps = async (context: NextPageContext) => {
  let response;
  if (typeof window === "undefined") {
    response = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      { headers: context.req.headers }
    );
  } else {
    response = await axios.get("/api/users/currentuser");
  }
  return { data: response.data };
};
export default Page;
