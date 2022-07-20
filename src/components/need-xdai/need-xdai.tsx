import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./need-xdai.scss";

const NeedxDAI = () => {
    return (
        <Container maxWidth="sm">
            <Typography
                variant="h3"
                fontFamily="monospace"
                fontSize="48px"
                align="center"
                marginTop="1em"
                className="nx__colorful"
            >
                Need xDAI?
            </Typography>
            <p className="nx__paragraph nx__paragraph__center">
                    This faucet is the official xDAI faucet for Gnosis Chain.
                    Input your address, complete verification, and receive 0.1
                    xDAI to your wallet in seconds.
                </p>
        </Container>
    );
};

export default NeedxDAI;
