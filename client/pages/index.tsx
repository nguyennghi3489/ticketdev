import { NextPage, NextPageContext } from "next";
import { buildClient } from "../api/build-client";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

interface IProps {
  user: {
    email: string;
  };
}
const Page: NextPage = (currentUser: IProps) => {
  const router = useRouter();
  console.log(currentUser);
  useEffect(() => {
    if (currentUser.user === null) {
      router.push("/sign-up");
    }
  }, [currentUser]);
  return <p>Landing Page {currentUser?.user?.email}</p>;
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
