import * as React from "react";
import { Container, Divider, Typography, Badge, Avatar ,Box,Toolbar,Button,Drawer,List,ListItem,ListItemButton,IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link, useNavigate } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LoginIcon from "@mui/icons-material/Login";
import Login from "../loginRegister/login";
import Register from "../loginRegister/register";
import {
  selectListServices,
  selectCartServices,
} from "../../../redux/serce/serviceSelector";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../redux/auth/authSelector";
import { fetchUserById } from "../../../redux/auth/authThunk";
import { AppBar, drawerWidth, DrawerHeader } from "../../../util/custom";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const Appbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openFormLogin, setOpenFormLogin] = React.useState(false);
  const [openFormRegister, setOpenFormRegister] = React.useState(false);
  const listSer = useSelector(selectListServices);
  const cartSer = useSelector(selectCartServices);
  const user = useSelector(selectUser);



  React.useEffect(() => {
    if (user?.usId !== undefined) {
      dispatch(fetchUserById(user?.usId));
    }
  }, [user?.usImage, dispatch, user?.usId]);

  
  const handleClickOpenFormLogin = () => {
    setOpenFormLogin(true);
  };
  const handleCloseFormLogin = () => {
    setOpenFormLogin(false);
  };
  const handelCloseFormRegister = () => {
    setOpenFormRegister(false);
  };
  const handleOpenFormRegister = () => {
    setOpenFormRegister(true);
  };


  return (
    <Box sx={{ marginBottom: 12.5 }}>
      <AppBar position="fixed" className="bg-slate-50 ">
        <Container>
          <Toolbar>
            <Box sx={{ flexGrow: 1, mr: 1 }}>
              <Link to="/">
                <img
                  src={require("../../../assets/OG Spa2.png")}
                  alt=""
                  className="mx-auto w-24 rounded-full"
                />
              </Link>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                mr: 1,
              }}
            >
              <Link to="/">
                <Typography className="text-neutral-900 hover:text-neutral-500 text-md">
                  TRANG CHỦ
                </Typography>
              </Link>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                mr: 1,
              }}
            >
              <div className="group inline-block relative">
                <Button className="bg-slate-50 text-slate-700  py-2 px-4 rounded inline-flex items-center">
                  <Typography className="mr-1">DỊCH VỤ</Typography>
                  <ArrowDropDownIcon></ArrowDropDownIcon>
                </Button>
                <ul className="absolute hidden text-neutral-900 pt-1 group-hover:block w-96">
                  {listSer.map((data, index) =>
                    data?.isDelete === false ? (
                      <Link to={`/service/` + data.seId}>
                        <li className="" key={index}>
                          <Typography
                            className=" bg-slate-50 hover:bg-rose-300 hover:text-slate-50
                      hover:cursor-pointer py-2 px-4 block whitespace-no-wrap w-48 float-left "
                          >
                            {data.seName}
                          </Typography>
                        </li>
                      </Link>
                    ) : null
                  )}
                </ul>
              </div>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                mr: 1,
              }}
            >
              <Link to="/shop">
                <Typography className="text-neutral-900 hover:text-neutral-500 text-ms ">
                  MIÊN SPA SHOP
                </Typography>
              </Link>
            </Box>
            

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                mr: 1,
              }}
            >
              {user === null ? (
                <Button id="idButton3" onClick={handleClickOpenFormLogin}>
                  ĐĂNG NHẬP/ ĐĂNG KÝ
                </Button>
              ) : (
                <Link to={`/user/` + user?.usId}>
                  <Box className="flex  justify-center items-center space-x-2 hover:cursor-pointer hover:scale-105">
                    <Avatar src={user?.usImage && user?.usImage} />
                    <Typography className="text-neutral-900 ">
                      {user?.usUserName}
                    </Typography>
                  </Box>
                </Link>
              )}
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                mr: 1,
              }}
            >
              <Link to="/booking">
                <Button className="text-slate-50 hover:bg-rose-500 text-ms  bg-rose-400 p-2">
                  <Badge badgeContent={cartSer?.length} color="error">
                    <EventAvailableIcon></EventAvailableIcon>
                  </Badge>{" "}
                  &ensp; ĐẶT LỊCH
                </Button>
              </Link>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", sm: "none", md: "none" },
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="default"
                aria-label="open drawer"
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader className="bg-rose-400 ">
          <IconButton
            onClick={() => setOpen(false)}
            className="text-slate-50 font-semibold"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{
              display: "block",
              margin: "auto",
              fontWeight: "bold",
              padding: 4.5,
              color: "white",
            }}
          >
            MENU
          </Typography>
        </DrawerHeader>
        <List>
          {user === null ? (
            <Button
              id="idButton3"
              className="flex gap-2"
              onClick={handleClickOpenFormLogin}
            >
              <LoginIcon className="text-rose-400"></LoginIcon>
              ĐĂNG NHẬP/ ĐĂNG KÝ
            </Button>
          ) : (
            <Link to={`/user/` + user?.usId}>
              <Box className="flex items-center ml-5 my-3 space-x-2 hover:cursor-pointer hover:scale-105">
                <Avatar src={user?.usImage && user?.usImage} />
                <Typography className="text-rose-400 font-bold ">
                  {user?.usUserName}
                </Typography>
              </Box>
            </Link>
          )}
          <Divider />

          <ListItem disablePadding className="py-4">
            <Link to="/shop">
              <ListItemButton className="flex gap-2">
                <AddBusinessIcon className="text-rose-400 "></AddBusinessIcon>

                <Typography className=" text-md  ">MIÊN SPA SHOP</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <Divider />

          <ListItem disablePadding className="py-4">
            <Link to="/booking">
              <ListItemButton className="flex gap-2">
                <CalendarMonthIcon className="text-rose-400 "></CalendarMonthIcon>
                <Typography className=" text-md ">ĐẶT LỊCH</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
          <Divider />

          <Divider />
        </List>
      </Drawer>
      <Login
        openValue={openFormLogin}
        parentCallbackLogin={handleCloseFormLogin}
        parentCallbackRegister={handleOpenFormRegister}
      ></Login>
      <Register
        openValue={openFormRegister}
        parentCallbackRegister={handelCloseFormRegister}
        parentCallbackLogin={handleClickOpenFormLogin}
      ></Register>
    </Box>
  );
};
export default Appbar;
