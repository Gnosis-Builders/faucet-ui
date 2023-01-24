import { Container } from "@mui/system";
import { Fragment } from "react";
import FAQ from "./components/faq/faq";
import { NavBar } from "./components/navbar/navbar";
import NeedxDAI from "./components/need-xdai/need-xdai";
import { SendCard } from "./components/send-card/send-card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { useState } from "react";
import ReactGA from "react-ga";
import Donate from "./components/donate/donate";
// import { Banner } from "./components/banner/banner";
import { Footer } from "./components/footer/footer";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export const useAnalyticsEventTracker = (category: string) => {
    const eventTracker = (action: string, label: string) => {
        ReactGA.event({ category, action, label });
    };
    return eventTracker;
};

function App() {
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY as string;

    const [openGetMoreFaq, setOpenGetMoreFaq] = useState<() => void>(
        () => () => null
    );
    const [network, setNetwork] = useState<string>("Gnosis Chain");

    const trackingId = "UA-237444060-2";

    ReactGA.initialize(trackingId);
    ReactGA.pageview("gnosisfaucet.com");

    return (
        <Fragment>
            {/* <Banner /> */}
            <GoogleReCaptchaProvider
                reCaptchaKey={siteKey}
                scriptProps={{
                    async: false, // optional, default to false,
                    defer: false, // optional, default to false
                    appendTo: 'head', // optional, default to "head", can be "head" or "body",
                    nonce: undefined // optional, default undefined
                }}
            >
                <Container
                    maxWidth="xl"
                    sx={{ marginBottom: "2em" }}
                    data-testid="container"
                >
                    <ToastContainer
                        position="top-right"
                        autoClose={50000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <NavBar />
                    <NeedxDAI
                        openGetMoreFaq={openGetMoreFaq}
                        network={network}
                    />
                    <SendCard
                        network={network}
                        setNetwork={setNetwork}
                    />
                    <FAQ setOpenGetMoreFaq={setOpenGetMoreFaq} />
                    <Donate />
                </Container>
                <Footer />
            </GoogleReCaptchaProvider>
        </Fragment>
    );
}

export default App;
