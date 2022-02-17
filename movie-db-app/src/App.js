import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Router from "./Router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./ToolKit/Slice/authSlice";

const useStyles = makeStyles({
  root: {
    "& .css-1oqqzyl-MuiContainer-root": {
      maxWidth: "100vw",
    },
  },
});
const App = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  //Data..
  const settings = [
    { label: "Login", value: "login" },
    { label: "Sign Up", value: "signup" },
    { label: "About Us", value: "about_us" },
  ];

  //redux state
  const auth = useSelector((state) => state?.authSlice);

  //state...
  const [anchorElUser, setAnchorElUser] = useState(null);

  //life cycle method
  useEffect(() => {
    if (auth && auth.isLogin) {
      history.replace("/home");
    } else {
      history.replace("/");
    }
  }, [auth]);

  //function ...
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (menu) => {
    if (menu === "logout") {
      dispatch(logout());
    } else {
      setAnchorElUser(null);
      history.push(`/${menu?.value}`);
    }
  };

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Container>
          <Toolbar
            disableGutters
            sx={
              !auth?.isLogin
                ? { display: "flex", justifyContent: "space-between" }
                : null
            }
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              LOGO
            </Typography>
            {auth?.isLogin ? (
              <>
                <Typography
                  onClick={() => history.push("/home")}
                  textAlign="center"
                  sx={{ mr: 2, cursor: "pointer" }}
                >
                  Home
                </Typography>
                <Typography
                  onClick={() => history.push("/crud")}
                  textAlign="center"
                  sx={{ mr: 2, cursor: "pointer" }}
                >
                  Crud
                </Typography>
                <Typography
                  onClick={() => handleCloseUserMenu("logout")}
                  textAlign="center"
                  sx={{ mr: 2, cursor: "pointer" }}
                >
                  Logout
                </Typography>
              </>
            ) : null}
            <Box sx={{ flexGrow: 0, cursor: "pointer" }}>
              {!auth?.isLogin ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <AccountCircleIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.value}
                        onClick={() => handleCloseUserMenu(setting)}
                      >
                        <Typography textAlign="center">
                          {setting.label}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : null}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Router />
    </>
  );
};

export default App;
