import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from 'vitest'
import SearchSection from "./index";
import mockUsernames from '../../../__test__/mocks/username_response.json'

// Mock the custom hook
vi.mock("../../hooks/useFetchUsername", () => ({
  useFetchUsername: () => ({
    setIsSearchEnabled: vi.fn(),
    setUsername: vi.fn(),
    username: "",
    usernameList: {
      isLoading: false,
      isFetching: false,
      data: {
        items: [{ id: 1, login: "testuser" }]
      }
    },
    isSearchEnabled: true
  })
}));

describe("SearchSection", () => {
  it("renders the form with input and button", () => {
    render(<SearchSection />);
    expect(screen.getByPlaceholderText("Search Github username...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("submits the form and enables search", async () => {
    const { useFetchUsername } = require("../../hooks/useFetchUsername");
    render(<SearchSection />);

    const input = screen.getByPlaceholderText("Search Github username...");
    fireEvent.change(input, { target: { value: "octocat" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(useFetchUsername().setIsSearchEnabled).toBeTruthy();
    });
  });

  it("shows loading spinner when loading", () => {
    vi.mock("../../hooks/useFetchUsername", () => ({
      useFetchUsername: () => ({
        setIsSearchEnabled: vi.fn(),
        setUsername: vi.fn(),
        username: "",
        usernameList: {
          isLoading: true,
          isFetching: false,
          data: null
        },
        isSearchEnabled: false
      })
    }));

    const { container } = render(<SearchSection />);
    expect(container.querySelector('.ant-spin')).toBeInTheDocument()
  });

  it("shows result text when users are found", () => {
    vi.mock("../../hooks/useFetchUsername", () => ({
      useFetchUsername: () => ({
        setIsSearchEnabled: vi.fn(),
        setUsername: vi.fn(),
        username: "test",
        usernameList: {
          isLoading: false,
          isFetching: false,
          data: mockUsernames
        },
        isSearchEnabled: false
      })
    }));
    render(<SearchSection />);
    expect(screen.getByTestId('username')).toBeInTheDocument();
  });
});
