import { Container } from "@mui/system";
import { Fragment } from "react";
import FAQ from "./components/faq";
import NavBar from "./components/navbar";
import NeedxDAI from "./components/need-xdai";
import SendCard from "./components/send-card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomBar from "./components/bottom-bar";
import { useState } from "react";

function App() {    
    const [openGetMoreFaq, setOpenGetMoreFaq] = useState<() => void>(
        () => () => null
    );

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
                <NeedxDAI openGetMoreFaq={openGetMoreFaq} />
                <SendCard />
                <FAQ setOpenGetMoreFaq={setOpenGetMoreFaq} />
            </Container>
            <Container maxWidth="lg">
                <BottomBar />
            </Container>
        </Fragment>
    );
}

export default App;
