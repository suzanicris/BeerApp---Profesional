import { AxiosResponse } from "axios";
import handle from "./error";

const fetchData = <T>(
  fetchFunction: () => Promise<AxiosResponse<T>>,
  setData: (data: T) => void
) => {
  (async () => {
    try {
      const response = await fetchFunction();
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData };
