import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import './navbar.scss';
import logo from './logo.png';

export const NavBar = () => {

  return (
    <div className="navbar__root">
      <AppBar color="transparent" position="static">
        <Toolbar>
          <img src={logo} alt="Gnosis Chain!" className="navbar__logo" />
          <Typography variant="h6" className="navbar__title">
            
          </Typography>

          <Button color="inherit">Support</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
