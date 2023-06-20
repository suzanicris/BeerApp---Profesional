import { renderHook, waitFor } from "@testing-library/react";
import { ApiParams } from "../types";
import { useBeerMetaData } from "./useBeerMetaData";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useBeerMetaData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch beer metadata and update state when params change", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        total: 9,
        per_page: 10,
      },
    });

    const params = { page: 1, per_page: 10 } as ApiParams;

    const { result } = renderHook(() => useBeerMetaData(params));

    expect(result.current.totalPages).toBe(0);

    await waitFor(() => {
      expect(result.current.totalPages).toBe(1);
    });
  });
});
