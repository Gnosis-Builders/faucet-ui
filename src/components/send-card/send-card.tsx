import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
    Button,
    Grid,
    MenuItem,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useMediaQuery,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Container } from "@mui/system";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../loading";
import "./send-card.scss";

export const SendCard = () => {
    const [network, setNetwork] = useState<string>("Gnosis Chain");
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [hash, setHash] = useState<string>();
    const [showLoading, setShowLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [faucetBalance, setFaucetBalance] = useState<string>("12.010");

    const networks = ["Gnosis Chain"];

    const handleNetworkChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNetwork(event.target.value);
    };

    const handleWalletAddressChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setWalletAddress(event.target.value);
    };

    const onVerifyCaptcha = (token: string) => {
        console.log(token);
        setCaptchaVerified(true);
    };

    const paste = () => {
        navigator.clipboard.readText().then((clipboard) => {
            setWalletAddress(clipboard);
        });
    };

    const sendRequest = async () => {
        if (walletAddress.length <= 0) {
            toast.error("Please enter wallet address");
        } else {
            const url = `${
                process.env.REACT_APP_BACKEND_URL as string
            }/request-token`;
            try {
                setShowLoading(true);
                const req = {
                    walletAddress,
                    network,
                };
                axios
                    .post(url, req)
                    .then((response) => {
                        setShowLoading(false);
                        if (response.data.status === "success") {
                            setHash(response.data.data);
                            setWalletAddress("");
                            setCaptchaVerified(false);
                            toast(
                                "xDAI sent to your wallet address. Hash: " +
                                    response.data.data
                            );
                        } else {
                            toast("Error sending xDAI, please try again");
                        }
                    })
                    .catch((error) => {
                        setShowLoading(false);
                        toast.error(error.response.data.data.error);
                    });
            } catch (error: any) {
                setShowLoading(false);
                toast.error(error.message);
            }
        }
    };

    const isTabletOrMobile = useMediaQuery("(max-width:960px)");
    return (
        <Container maxWidth="sm">
            <Card>
                <CardContent className="send-card__green-area">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                fontFamily="GT-Planar"
                                fontSize="20px"
                            >
                                Network
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="send-card__element"
                                id="network"
                                name="network"
                                select
                                fullWidth
                                value={network}
                                onChange={handleNetworkChange}
                            >
                                {networks.map((network) => (
                                    <MenuItem key={network} value={network}>
                                        {network}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                fontFamily="GT-Planar"
                                fontSize="20px"
                            >
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
                            <Typography
                                variant="body1"
                                fontFamily="GT-Planar"
                                fontSize="20px"
                            >
                                Faucet Balance
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={faucetBalance}
                                className="send-card__element"
                                id="wallet-address"
                                fullWidth
                                disabled
                                InputProps={{
                                    endAdornment: (
                                        <Button
                                            className="send-card__text-button"
                                            variant="outlined"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            xDAI
                                        </Button>
                                    ),
                                }}
                            />
                        </Grid>                        
                        {hash && (
                            <Grid item xs={12}>
                                <Typography variant="body1" fontWeight={"bold"}>
                                    <a
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        href={`${process.env.REACT_APP_EXPLORER_URL}/${hash}`}
                                    >
                                        View Transaction
                                    </a>
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                fontFamily="GT-Planar"
                                fontSize="20px"
                            >
                                Verify
                            </Typography>
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
                                disabled={!captchaVerified}
                                className="send-card__white-button"
                                fullWidth
                                variant="outlined"
                                onClick={sendRequest}
                            >
                                Request xDAI
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Loading open={showLoading} />
        </Container>
    );
};
