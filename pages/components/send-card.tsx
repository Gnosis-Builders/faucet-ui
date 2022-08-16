import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
    Button,
    Grid,
    MenuItem,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Container } from "@mui/system";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "./loading";
import { higherAmount, lowerAmount } from "../../constants";

export const SendCard = () => {
    const [network, setNetwork] = useState<string>("Gnosis Chain");
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [hash, setHash] = useState<string>("");
    const [showLoading, setShowLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [amount, setAmount] = useState<string>(lowerAmount.toString());
    const [tweetText, setTweetText] = useState<string>("");

    const networks = ["Gnosis Chain"];

    const serverUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;
    const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string;

    // const clearParams = useClearParams();

    useEffect(() => {
        (async () => {
            // if (clearParams !== null) {
            //     const user = clearParams.get("user");
            //     const walletAddress = clearParams.get("walletAddress");
            //     if (user !== undefined && walletAddress !== undefined) {
            //         setWalletAddress(walletAddress as string);
            //         sendRequest(user as string, walletAddress as string);
            //     }
            // }
        })();
    }, []);

    const handleNetworkChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNetwork(event.target.value);
    };

    const handleWalletAddressChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setWalletAddress(event.target.value);
    };

    const handleAmountChange = (
        event: React.MouseEvent<HTMLElement>,
        newAmount: string
    ) => {
        if (newAmount !== null) {
            setAmount(newAmount);
            const newTweetText = `Requesting ${newAmount}xDAI funds from the Official xDAI Faucet on Gnosis Chain.\nhttps://gnosisfaucet.com`;
            setTweetText(newTweetText);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onVerifyCaptcha = (_token: string) => {
        setCaptchaVerified(true);
    };

    const paste = () => {
        navigator.clipboard.readText().then((clipboard) => {
            setWalletAddress(clipboard);
        });
    };

    const sendRequest = async (userId = "", _walletAddress = "") => {
        if (_walletAddress.length <= 0 && walletAddress.length <= 0) {
            toast.error("Please enter wallet address");
        } else {
            if (amount === higherAmount.toString() && userId.length <= 0) {
                try {
                    //OAuth Step 1
                    setShowLoading(true);
                    const response = await axios({
                        url: `${serverUrl}/twitter/v1/login?wallet=${walletAddress}`,
                        method: "GET",
                    });

                    const { url } = response.data.data;
                    //Oauth Step 2
                    setShowLoading(false);
                    window.open(url, "_self");
                } catch (error) {
                    // we can't console.log...need to find another way
                }
            } else {
                const url = `${serverUrl}/request-token`;
                try {
                    setShowLoading(true);
                    const req = {
                        walletAddress:
                            _walletAddress.length > 0
                                ? _walletAddress
                                : walletAddress,
                        network,
                        userId: userId.length > 0 ? userId : undefined,
                        tweetText,
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
                            toast.error(error.response.data.data);
                        });
                } catch (error) {
                    setShowLoading(false);
                    if (error instanceof Error) {
                        toast.error(error.message);
                    }
                }
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
                                color="white"
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
                                color="white"
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
                                color="white"
                                variant="body1"
                                fontFamily="GT-Planar"
                                fontSize="20px"
                            >
                                Request Amount
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ToggleButtonGroup
                                className="send-card__element send-card__toggle-group"
                                value={amount}
                                exclusive
                                onChange={handleAmountChange}
                            >
                                <ToggleButton value={lowerAmount.toString()}>
                                    {lowerAmount} xDAI
                                </ToggleButton>
                                <ToggleButton value={higherAmount.toString()}>
                                    {higherAmount} xDAI
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        {hash !== undefined && hash.length > 0 && (
                            <Grid item xs={12}>
                                <Typography
                                    color="white"
                                    variant="body1"
                                    fontWeight={"bold"}
                                >
                                    <a
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/${hash}`}
                                    >
                                        View Transaction
                                    </a>
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Typography
                                color="white"
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
                                sitekey={siteKey}
                                onVerify={onVerifyCaptcha}
                            />
                        </Grid>

                        {amount === higherAmount.toString() && (
                            <>
                                <Grid item xs={12}>
                                    <Typography
                                        color="white"
                                        variant="body1"
                                        fontFamily="GT-Planar"
                                        fontSize="20px"
                                    >
                                        Send A Tweet
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className="send-card__element"
                                        value={tweetText}
                                        id="tweet-text"
                                        name="tweet-text"
                                        fullWidth
                                        multiline
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                            </>
                        )}

                        <Grid item xs={12}>
                            <Button
                                disabled={!captchaVerified}
                                className="send-card__white-button"
                                fullWidth
                                variant="outlined"
                                onClick={() => sendRequest()}
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