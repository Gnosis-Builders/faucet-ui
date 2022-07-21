import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import LoadingIcon from "./icons/loading";

interface Props {
  open: boolean;
}
export default function Loading(props: Props) {
  const { open } = props;

  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <LoadingIcon />
    </Backdrop>
  );
}
