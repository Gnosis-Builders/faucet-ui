import { Container } from "@mui/system";
import React, { Fragment } from "react";
import { NavBar } from "./components/navbar/navbar";
import NeedxDAI from "./components/need-xdai/need-xdai";
import { SendCard } from "./components/send-card/send-card";

function App() {
  return (
    <Fragment>
      <Container maxWidth="xl">
        <NavBar />
        <NeedxDAI />
        <SendCard />
      </Container>
    </Fragment>
  );
}

export default App;
