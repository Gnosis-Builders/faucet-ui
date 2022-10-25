import { Container } from "@mui/system";
import { Fragment } from "react";
import FAQ from "./components/faq/faq";
import { NavBar } from "./components/navbar/navbar";
import NeedxDAI from "./components/need-xdai/need-xdai";
import { SendCard } from "./components/send-card/send-card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { BottomBar } from "./components/bottom-bar/bottom-bar";
import { useState } from "react";
import ReactGA from "react-ga";
import Donate from "./components/donate/donate";

export const useAnalyticsEventTracker = (category: string) => {
    const eventTracker = (action: string, label: string) => {
        ReactGA.event({category, action, label});
      }
      return eventTracker;
}

function App() {
    const [openGetMoreFaq, setOpenGetMoreFaq] = useState<() => void>(() => () => null);

    const trackingId = "UA-237444060-2";

    ReactGA.initialize(trackingId);
    ReactGA.pageview("gnosisfaucet.com");

    return (
        <Fragment>
            <Container maxWidth="xl" sx={{ marginBottom: "2em" }} data-testid='container'>
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
                <NeedxDAI openGetMoreFaq={ openGetMoreFaq }/>
                <SendCard />
                <FAQ setOpenGetMoreFaq={ setOpenGetMoreFaq }/>
                <Donate />
            </Container>
            <Container maxWidth="lg">
            <BottomBar />
            </Container>
        </Fragment>
    );
}

export default App;
