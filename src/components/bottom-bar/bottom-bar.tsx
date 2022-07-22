import {
    AppBar,
    Toolbar,
    Typography,
} from "@mui/material";
import "./bottom-bar.scss";

export const BottomBar = () => {
    return (
        <div className="bottombar__root">
            <AppBar color="transparent" position="static">
                <Toolbar>
                    <Typography
                        variant="body1"
                        fontFamily="GT-Planar-Regular"
                        fontSize="16px"
                        className="bottombar__logo"
                    >
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            className="bottombar__no-decoration"
                            href="https://www.gnosischain.com/evm"
                        >
                            &copy;2022 Gnosis Chain
                        </a>
                    </Typography>
                    <Typography
                        variant="h6"
                        className="bottombar__title"
                    ></Typography>

                    <Typography
                        variant="body1"
                        fontFamily="GT-Planar-Regular"
                        fontSize="16px"
                        className="bottombar__logo"
                    >
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            className="bottombar__no-decoration"
                            href="https://twitter.com/gnosischain"
                        >
                            Twitter
                        </a>
                        &nbsp;&nbsp;
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            className="bottombar__no-decoration"
                            href="https://discord.gg/gnosischain"
                        >
                            Discord
                        </a>
                        &nbsp;&nbsp;
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            className="bottombar__no-decoration"
                            href="https://developers.gnosischain.com/"
                        >
                            Docs
                        </a>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};
