import * as React from "react";

import {
  Box,
  Toolbar,
  Button,
  Container,
  Divider,
  Typography,
  Avatar,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "../loginRegister/login";
import Register from "../loginRegister/register";
import {
  selectListProduct,
  selectCartProduct,
} from "../../../redux/product/productSelector";
import "../../../css/searchLive.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { selectUser } from "../../../redux/auth/authSelector";
import { fetchUserById } from "../../../redux/auth/authThunk";
import { fetchProducts } from "../../../redux/product/productThunk";
import {
  AppBar,
  CssTextField,
  DrawerHeader,
  drawerWidth,
} from "../../../util/custom";

const Appbar = () => {
  const dispatch = useDispatch();

  const listProduct = useSelector(selectListProduct);
  const cartProduct = useSelector(selectCartProduct);
  const user = useSelector(selectUser);
  const [openFormLogin, setOpenFormLogin] = React.useState(false);
  const [openFormRegister, setOpenFormRegister] = React.useState(false);
  const [openBoxSearch, setOpenBoxSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [dataSearch, setDataSearch] = useState();
  const [baseImage, setBaseImage] = React.useState("");

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  React.useEffect(() => {
    if (user?.usId !== undefined) {
      dispatch(fetchUserById(user?.usId));
    }
  }, [user?.usImage, dispatch, user?.usId]);

  const handleChangeValueSearch = (e) => {
    setValueSearch(e.target.value);
  };
  const handleFindSearch = useCallback(() => {
    setDataSearch(
      listProduct.filter((item) =>
        item.proName.toUpperCase().includes(valueSearch.toUpperCase())
      )
    );
  }, [valueSearch, listProduct]);

  useEffect(() => {
    if (valueSearch === "") {
      setOpenBoxSearch(false);
    } else {
      handleFindSearch();
      setOpenBoxSearch(true);
    }
  }, [handleFindSearch, valueSearch]);

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

  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <Box sx={{ marginBottom: 15, flexGrow: 1 }}>
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
              <Link to="/shop">
                <Typography className="text-neutral-900 hover:text-neutral-500 text-md">
                  SHOP
                </Typography>
              </Link>
            </Box>
            <Box
              id="idBoxSearchLive"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                mr: 1,
              }}
            >
              <CssTextField
                onChange={handleChangeValueSearch}
                type="text"
                label="Tìm kiếm sản phẩm"
                className="w-96"
              />
              <Box data-open={openBoxSearch}>
                {dataSearch?.length === 0 ? (
                  <p>
                    Không tìm thấy sản phẩm tên "<b>{valueSearch}</b>"
                  </p>
                ) : (
                  dataSearch?.map((data, index) => (
                    <Link to={`/product/` + data?.proId}>
                      <Box id="idBoxDataSearch">
                        <img
                          src={
                            process.env.REACT_APP_API_URL +
                            "/image/product/" +
                            data?.featureImgPath
                          }
                          className="w-12 h-12 rounded-lg"
                          alt=""
                        />
                        &emsp;
                        <p>{data?.proName}</p>
                      </Box>
                    </Link>
                  ))
                )}
              </Box>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                mr: 1,
              }}
            >
              {user === null ? (
                <Button
                  className="text-slate-50  text-ms rounded-full p-2"
                  onClick={handleClickOpenFormLogin}
                >
                  <Button id="idButton3" onClick={handleClickOpenFormLogin}>
                    ĐĂNG NHẬP/ ĐĂNG KÝ
                  </Button>
                </Button>
              ) : (
                <Button
                  className="text-slate-50 text-ms rounded-full   p-2"
                  onClick={handleClickOpenFormLogin}
                >
                  <Link to={`/user/` + user?.usId}>
                    <Box className="flex  justify-center items-center space-x-2 hover:cursor-pointer hover:scale-105">
                      <Avatar src={user?.usImage && user?.usImage} />
                      <Typography className="text-neutral-900  ">
                        {user?.usUserName}
                      </Typography>
                    </Box>
                  </Link>
                </Button>
              )}
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                mr: 1,
              }}
            >
              <Link to="/cart">
                <Button className="text-slate-50 hover:bg-rose-500 text-ms  bg-rose-400 p-2">
                  <Badge badgeContent={cartProduct?.length} color="error">
                    <ShoppingCartIcon></ShoppingCartIcon>
                  </Badge>{" "}
                  &ensp; GIỎ HÀNG
                </Button>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                edge="start"
                color="default"
                aria-label="open drawer"
                onClick={() => setOpenDrawer(true)}
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
        open={openDrawer}
      >
        <DrawerHeader className="bg-rose-400 ">
          <IconButton
            onClick={() => setOpenDrawer(false)}
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
            <Button id="idButton3" onClick={handleClickOpenFormLogin}>
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
            <Link to="/cart">
              <ListItemButton className="flex gap-2">
                <ShoppingCartIcon className="text-rose-400 "></ShoppingCartIcon>
                <Typography className=" text-md ">GIỎ HÀNG</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
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
