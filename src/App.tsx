import { Container } from "@mui/system";
import React, { Fragment } from "react";
import { NavBar } from "./components/navbar/navbar";

function App() {
  return (
    <Fragment>
      <Container maxWidth="xl">
        <NavBar />
      </Container>
    </Fragment>
  );
}

export default App;
