import { TYPE } from "./";

interface ApiParams {
  per_page?: number; // Int between 1 and 200. Default is 50.
  page?: number;
  sort?: string; // Not working with by_dist.
  by_city?: string;
  by_dist?: string; // `${latitude as Number}, ${longitude as Number}`
  by_name?: string;
  by_state?: string;
  by_postal?: number | string; // 5-digit, or 9-digit with underscore
  // by_country?: string; // There's no filter by country on the API
  by_type?: TYPE;
}

type FilterParams = Pick<
  ApiParams,
  "by_city" | "by_state" | "by_name" | "by_type"
>;

export type { ApiParams, FilterParams };
