import axios from "axios";
import { ReactElement, ReactNode, useState } from "react";

export const useRequest = (
  apiUrl: string,
  body: Record<string, string | number>,
  onSuccess: Function
) => {
  const [data, setData] = useState();
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios.post(apiUrl, body);
      setData(response.data);
      onSuccess(response.data);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return [data, errors, doRequest];
};
