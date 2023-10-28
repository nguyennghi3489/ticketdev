import { NextPage, NextPageContext } from "next";
import { buildClient } from "../api/build-client";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useRequest } from "../hooks/use-request";

const Page: NextPage = () => {
  const router = useRouter();
  const redirectLandingPage = useCallback(() => {
    router.push("/");
  }, [router]);
  const [data, errors, doRequest] = useRequest(
    "/api/users/signout",
    {},
    redirectLandingPage
  );

  useEffect(() => {
    doRequest();
  }, []);
  return (
    <div className="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row">
      <h1>You're signing out</h1>
    </div>
  );
};
export default Page;
