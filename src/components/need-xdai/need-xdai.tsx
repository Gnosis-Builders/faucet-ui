import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./need-xdai.scss";

const NeedxDAI = () => {
    return (
        <Container maxWidth="sm">
            <Typography
                variant="h3"
                fontFamily="GT-Planar"
                fontSize="48px"
                fontWeight="bold"
                align="center"
                marginTop="1em"
                className="nx__colorful"
            >
                Need xDAI?
            </Typography>
            <p className="nx__paragraph nx__paragraph__center">
                This faucet is the official xDAI faucet for Gnosis Chain. Input
                your address, complete verification, and receive 0.001 xDAI to
                your wallet in seconds. If you need more than 0.01 xDAI, see&nbsp;
                <a href="#need-more">here</a>.
            </p>
        </Container>
    );
};

export default NeedxDAI;
