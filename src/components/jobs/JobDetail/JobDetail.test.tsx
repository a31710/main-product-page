/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen } from "@testing-library/react";

import JobDetail from "./JobDetail";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: jest.fn() }),
}));

jest.mock("@/hooks/useJobDetail", () => ({
  useJobDetail: () => ({
    data: {
      data: {
        id: "1",
        title: "Frontend Engineer",
        company: "Acme",
        description: "Build UIs",
        location: "Hanoi",
        type: "remote",
        created_at: new Date().toISOString(),
      },
    },
    isLoading: false,
    error: null,
  }),
}));

jest.mock("@/store/useModalStore", () => ({
  useModalStore: () => ({ open: jest.fn() }),
}));

jest.mock("@/components/ui/Skeleton/DetailSkeleton", () => ({
  __esModule: true,
  default: () => {
    const React = require("react");
    return React.createElement("div", { "data-testid": "detail-skeleton" });
  },
}));

describe("JobDetail", () => {
  it("renders job title and location", () => {
    render(<JobDetail id="1" />);

    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("Hanoi")).toBeInTheDocument();
    expect(screen.getByText("Apply")).toBeInTheDocument();
  });
});
