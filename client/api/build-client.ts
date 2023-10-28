import axios from "axios";
import { NextPageContext } from "next";

export const buildClient = (context: NextPageContext) => {
  let client;
  if (typeof window === "undefined") {
    client = axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/",
      headers: context.req.headers,
    });
  } else {
    client = axios.create({ baseURL: "/" });
  }
  return client;
};
