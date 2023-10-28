import { NextPage, NextPageContext } from "next";
import { buildClient } from "../api/build-client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { TCurrentUser } from "../models/user";

const Page: NextPage = (currentUser: TCurrentUser) => {
  const router = useRouter();
  useEffect(() => {
    if (currentUser.user === null) {
      router.push("/sign-up");
    }
  }, [currentUser]);
  return (
    <div className="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row">
      <div className="">
        <h1>Landing Page {currentUser?.user?.email}</h1>
      </div>
    </div>
  );
};

Page.getInitialProps = async (context: NextPageContext) => {
  const client = buildClient(context);
  try {
    const response = await client.get("/api/users/currentuser");
    return { ...response.data.currentUser };
  } catch {
    return { user: null };
  }
};
export default Page;
