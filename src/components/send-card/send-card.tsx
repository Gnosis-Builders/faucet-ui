import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
    Button,
    Grid,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useMediaQuery,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container } from "@mui/system";
import { ChangeEvent, useState } from "react";
import "./send-card.scss";

export const SendCard = () => {
    const [network, setNetwork] = useState<"Gnosis Chain" | "Chiado Testnet">(
        "Gnosis Chain"
    );

    const [walletAddress, setWalletAddress] = useState<string>("");

    const handleNetworkChange = (
        _event: React.MouseEvent<HTMLElement>,
        newNetwork: "Gnosis Chain" | "Chiado Testnet"
    ) => {
        setNetwork(newNetwork);
    };

    const handleWalletAddressChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setWalletAddress(event.target.value);
    };

    const onVerifyCaptcha = (token: string) => {
        console.log("Verified: " + token);
    };

    const paste = () => {
        navigator.clipboard.readText().then((clipboard) => {
            setWalletAddress(clipboard);
        });
    };

    const isTabletOrMobile = useMediaQuery("(max-width:960px)");
    return (
        <Container maxWidth="sm">
            <Card>
                <CardContent className="send-card__green-area">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1" fontWeight={"bold"}>
                                Network
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ToggleButtonGroup
                                className="send-card__toggle-container"
                                color="standard"
                                value={network}
                                exclusive
                                size="small"
                                onChange={handleNetworkChange}
                                aria-label="select network"
                            >
                                <ToggleButton
                                    className={
                                        network === "Gnosis Chain"
                                            ? "send-card__element"
                                            : ""
                                    }
                                    value="Gnosis Chain"
                                    aria-label="Gnosis Chain"
                                >
                                    Gnosis Chain
                                </ToggleButton>
                                <ToggleButton
                                    className={
                                        network === "Chiado Testnet"
                                            ? "send-card__element"
                                            : ""
                                    }
                                    value="Chiado Testnet"
                                    aria-label="Chiado Testnet"
                                >
                                    Chiado Testnet
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body1" fontWeight={"bold"}>
                                Wallet
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleWalletAddressChange}
                                value={walletAddress}
                                className="send-card__element"
                                id="wallet-address"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <Button
                                            onClick={paste}
                                            className="send-card__text-button"
                                            variant="outlined"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Paste
                                        </Button>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <HCaptcha
                                size={isTabletOrMobile ? "compact" : "normal"}
                                sitekey="62e49c29-bc2d-4109-a339-d6b216357f77"
                                onVerify={onVerifyCaptcha}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                className="send-card__white-button"
                                fullWidth
                                variant="outlined"
                            >
                                Request xDAI
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};
