import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import "./navbar.scss";
import logo from "./logo.png";
import classNames from "classnames";

export const NavBar = () => {
    const isTabletOrMobile = useMediaQuery("(max-width:960px)");

    return (
        <div className="navbar__root">
            <AppBar color="transparent" position="static">
                <Toolbar>
                    <img
                        src={logo}
                        alt="Gnosis Chain!"
                        className={classNames({
                            navbar__logo: !isTabletOrMobile,
                            "navbar__logo-small": isTabletOrMobile,
                        })}
                    />
                    <Typography
                        variant="h6"
                        className="navbar__title"
                    ></Typography>

                    <a
                        href="https://discord.gg/VA2reyVXUn"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <Button color="inherit" className="navbar__button">
                            Support
                        </Button>
                    </a>
                </Toolbar>
            </AppBar>
        </div>
    );
};