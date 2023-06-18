import { useEffect, useState } from "react";
import { ApiParams, BreweriesMeta } from "../types";
import { fetchData } from "../utils";
import { getBeerMetaData } from "../api";

export const useBeerMetaData = (params: ApiParams) => {
  const [meta, setMeta] = useState<BreweriesMeta>();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData(() => getBeerMetaData(params), setMeta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => {
    if (!meta?.total || !meta.per_page) return;

    setTotalPages(Math.ceil(meta.total / meta.per_page));
  }, [meta?.total, meta?.per_page]);

  return { totalPages };
};
