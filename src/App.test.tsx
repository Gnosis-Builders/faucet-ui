import { render, screen } from "@testing-library/react";
import App from "./App";

test("loads app", async () => {
    render(<App />);
    const containerElement = screen.getByTestId("container");
    expect(containerElement).toBeInTheDocument();
});

test("displays nav bar", async () => {
    render(<App />);
    const navbarElement = screen.getByTestId("navbar_root");
    expect(navbarElement).toBeInTheDocument();
});

test("displays need xdai", async () => {
    render(<App />);
    const needXdaiElement = screen.getByTestId("need-xdai_container");
    expect(needXdaiElement).toBeInTheDocument();
});

test("displays send-card", async () => {
    render(<App />);
    const sendCardElement = screen.getByTestId("send-card_container");
    expect(sendCardElement).toBeInTheDocument();
});

test("displays faq", async () => {
    render(<App />);
    const faqElement = screen.getByTestId("faq_container");
    expect(faqElement).toBeInTheDocument();
});

test("displays donate", async () => {
    render(<App />);
    const donateElement = screen.getByTestId("donate_container");
    expect(donateElement).toBeInTheDocument();
});

test("displays bottom bar", async () => {
    render(<App />);
    const bottomBarElement = screen.getByTestId("bottombar_root");
    expect(bottomBarElement).toBeInTheDocument();
});