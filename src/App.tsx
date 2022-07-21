import { Container } from "@mui/system";
import React, { Fragment } from "react";
import FAQ from "./components/faq/faq";
import { NavBar } from "./components/navbar/navbar";
import NeedxDAI from "./components/need-xdai/need-xdai";
import { SendCard } from "./components/send-card/send-card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
    return (
        <Fragment>
            <Container maxWidth="xl" sx={{ marginBottom: "2em" }}>
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
                <NeedxDAI />
                <SendCard />
                <FAQ />
            </Container>
        </Fragment>
    );
}

export default App;
