import { Container } from "@mui/system";
import React, { Fragment } from "react";
import FAQ from "./components/faq/faq";
import { NavBar } from "./components/navbar/navbar";
import NeedxDAI from "./components/need-xdai/need-xdai";
import { SendCard } from "./components/send-card/send-card";
import './App.scss';

function App() {
  return (
    <Fragment>
      <Container maxWidth="xl" sx={{marginBottom: "2em"}}>
        <NavBar />
        <NeedxDAI />
        <SendCard />
        <FAQ />
      </Container>
    </Fragment>
  );
}

export default App;
