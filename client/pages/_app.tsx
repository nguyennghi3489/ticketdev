// These styles apply to every route in the application
import { NextApiRequest, NextPage } from "next";
import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { buildClient } from "../api/build-client";
import { TCurrentUser } from "../models/user";
import Link from "next/link";

const App = ({
  Component,
  pageProps,
  currentUser,
}: AppProps & { currentUser: TCurrentUser }) => {
  return (
    <div>
      <header className="z-10 relative w-full mt-5 text-gray-700 bg-transparent shadow-sm body-font">
        <div className="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row">
          <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
            MicroLyon
          </a>

          <div className="items-center h-full">
            <Link
              className="mr-5 font-medium hover:text-gray-900"
              href="/sign-in"
            >
              Sign In
            </Link>
            <Link
              className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      <Component {...pageProps} />
    </div>
  );
};

export default App;

App.getInitialProps = async (context: AppContext) => {
  const client = buildClient(context.ctx);
  let pageProps = {};
  let data = {};
  try {
    const response = await client.get("/api/users/currentuser");
    data = { ...response.data.currentUser };
  } catch {
    data = { user: null };
  }
  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(context.ctx);
  }
  return { pageProps, currentUser: data };
};
