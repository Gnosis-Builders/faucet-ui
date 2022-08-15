import "../styles/globals.css";
import "../styles/bottom-bar.scss";
import "../styles/faq.scss";
import "../styles/navbar.scss";
import "../styles/need-xdai.scss";
import "../styles/send-card.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
