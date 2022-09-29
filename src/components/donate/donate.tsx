import { Button, Paper, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import "./donate.scss";
import MediaQuery from "react-responsive";
import { toast } from "react-toastify";

const Donate: React.FC = () => {
    const address = "0x729F19e4C405758C93F59E5f098190cB2382d883";
    const elipsify = () => {
        return `${address.slice(0, 6)}...${address.slice(
            address.length - 6,
            address.length
        )}`;
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(address).then((_value) => {
            toast("Copied to clipboard!");
        });
    };
    return (
        <Container maxWidth="md">
            <div className="donate__container" id="donate-container">
                <div className="donate__content">
                    <div className="donate__content__title">
                        <Typography
                            fontFamily="GT-Planar"
                            fontSize="26px"
                            fontWeight="bold"
                        >
                            Donate to Faucet
                        </Typography>
                    </div>
                    <Typography
                        fontFamily="GT-Planar-Regular"
                        fontSize="20px"
                        lineHeight="30px"
                        textAlign="justify"
                    >
                        Have you found our faucet helpful? Donate funds to the
                        faucet wallet address below so we can continue providing
                        free xDAI to new users.
                    </Typography>
                    <Paper
                        className="donate__content__wallet-address-container"
                        component={Stack}
                        direction="column"
                        justifyContent="center"
                    >
                        <MediaQuery minWidth={960}>
                            <Typography fontFamily="GT-Planar" fontSize="22px">
                                {address}
                                <Button
                                    onClick={() => copyToClipboard()}
                                    className="donate__content__wallet-address-container__copy-button donate__content__wallet-address-container__copy-button-lg"
                                >
                                    Copy
                                </Button>
                            </Typography>
                        </MediaQuery>
                        <MediaQuery maxDeviceWidth={959}>
                            <Typography fontFamily="GT-Planar" fontSize="22px">
                                {elipsify()}
                            </Typography>
                            <Button
                                onClick={() => copyToClipboard()}
                                className="donate__content__wallet-address-container__copy-button donate__content__wallet-address-container__copy-button-sm"
                            >
                                Copy
                            </Button>
                        </MediaQuery>
                    </Paper>
                </div>
            </div>
        </Container>
    );
};

export default Donate;
