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
  const links = [
    !currentUser.user && {
      url: "/sign-in",
      label: "Sign In",
    },
    !currentUser.user && {
      url: "/sign-up",
      label: "Sign Up",
    },
    currentUser.user && {
      url: "/sign-out",
      label: "Sign Out",
    },
  ]
    .filter((link) => link)
    .map((item) => (
      <Link
        key={item.label}
        className="mr-5 font-medium hover:text-gray-900"
        href={item.url}
      >
        {item.label}
      </Link>
    ));
  console.log(links);
  return (
    <div>
      <header className="z-10 relative w-full mt-5 text-gray-700 bg-transparent shadow-sm body-font">
        <div className="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row">
          <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
            MicroLyon
          </a>

          <div className="items-center h-full">{links}</div>
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
