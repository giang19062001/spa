import * as React from "react";

import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";
import MenuIcon from "@mui/icons-material/Menu";
import SpaIcon from "@mui/icons-material/Spa";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ScheduleComponentReact from "./schedule";
import User from "./user";
import {
  Typography,
  Drawer,
  Box,
  Button,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Service from "./service";
import Product from "./product";
import OrderPro from "./orderPro";
import Categories from "./categories";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/userReducer";
import {
  AppBarAdmin,
  drawerWidthAdmin,
  DrawerHeaderAdmin,
} from "../../util/custom";
import Revenue from "./revenue";
import { selectUser } from "../../redux/auth/authSelector";

const Menu = () => {
  const user = useSelector(selectUser);
  const [open, setOpen] = React.useState(true);
  const [content, setContent] = React.useState(
     0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  console.log("user", user?.listRole?.[0]);

  return (
    <Box>
      <AppBarAdmin position="" open={open} className="bg-rose-600 p-4">
        <Toolbar className="flex justify-between">
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            // sx={{ ml: 5, ...(open && { display: 'none' }) }}
            sx={{ ml: 5, display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box className="float-right">
            <Typography
              sx={{ fontFamily: "sans-serif" }}
              variant="h6"
              className="font-bold"
            >
              MIÊN SPA{" "}
            </Typography>
          </Box>
          <IconButton sx={{ color: "white" }} className="flex gap-10">
            <Typography>Hi, {user?.usUserName}</Typography>

            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBarAdmin>
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidthAdmin,
            boxSizing: "border-box",
            backgroundColor: "#e11d48",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeaderAdmin className="bg-rose-600 py-3  ">
          <img
            src={require("../../assets/OG Spa2.png")}
            alt=""
            className="w-20 p-3  mx-auto rounded-full  bg-slate-50 "
          />
        </DrawerHeaderAdmin>
        <hr />
        <Divider />
        <List className="bg-rose-600 text-slate-50">
          {[
            "Thống kê doanh thu",
            "Danh sách khách hàng",
            "Danh sách dịch vụ",
            "Lịch đặt dịch vụ",
            "Danh sách thể loại",
            "Danh sách sản phẩm",
            "Danh sách đơn hàng",
          ].map((text, index) => (
            <Box>
              <ListItem key={index} disablePadding>
                {index === 0 ? (
                  <IconButton
                    onClick={() => {
                      setContent(index);
                    }}
                    disabled={!user?.listRole?.includes("ROLE_USER")}
                    className="text-slate-50 m-2 p-2 flex gap-2 "
                  >
                    <CurrencyExchangeIcon />
                    <Typography>{text}</Typography>
                  </IconButton>
                ) : index === 1 ? (
                  <IconButton
                    onClick={() => {
                      setContent(index);
                    }}
                    disabled={
                      !user?.listRole?.includes("ROLE_ACCOUNT") &&
                      !user?.listRole?.includes("ROLE_ADMIN")
                    }
                    className="text-slate-50 m-2 p-2 flex gap-2"
                  >
                    <PeopleAltIcon />
                    <Typography>{text}</Typography>
                  </IconButton>
                ) : index === 2 ? (
                  <IconButton
                    onClick={() => {
                      setContent(index);
                    }}
                    disabled={
                      !user?.listRole?.includes("ROLE_SERVICE") &&
                      !user?.listRole?.includes("ROLE_ADMIN")
                    }
                    className="text-slate-50 m-2 p-2 flex gap-2"
                  >
                    <SpaIcon />
                    <Typography>{text}</Typography>
                  </IconButton>
                ) : index === 3 ? (
                  <IconButton
                    onClick={() => {
                      setContent(index);
                    }}
                    disabled={
                      !user?.listRole?.includes("ROLE_ORDER_SERVICE") &&
                      !user?.listRole?.includes("ROLE_ADMIN")
                    }
                    className="text-slate-50 m-2 p-2 flex gap-2"
                  >
                    <CalendarMonthIcon />
                    <Typography>{text}</Typography>
                  </IconButton>
                ) : index === 4 ? (
                  <IconButton
                    onClick={() => {
                      setContent(index);
                    }}
                    disabled={
                      !user?.listRole?.includes("ROLE_CATEGORY") &&
                      !user?.listRole?.includes("ROLE_ADMIN")
                    }
                    className="text-slate-50 m-2 p-2 flex gap-2"
                  >
                    <CategoryIcon />
                    <Typography>{text}</Typography>
                  </IconButton>
                ) : index === 5 ? (
                  <IconButton
                    onClick={() => {
                      setContent(index);
                    }}
                    disabled={
                      !user?.listRole?.includes("ROLE_PRODUCT") &&
                      !user?.listRole?.includes("ROLE_ADMIN")
                    }
                    className="text-slate-50 m-2 p-2 flex gap-2"
                  >
                    <ProductionQuantityLimitsIcon />
                    <Typography>{text}</Typography>
                  </IconButton>
                ) : index === 6 ? (
                  <IconButton
                    onClick={() => {
                      setContent(index);
                    }}
                    disabled={
                      !user?.listRole?.includes("ROLE_ORDER_PRODUCT") &&
                      !user?.listRole?.includes("ROLE_ADMIN")
                    }
                    className="text-slate-50 m-2 p-2 flex gap-2"
                  >
                    <StickyNote2Icon />
                    <Typography>{text}</Typography>
                  </IconButton>
                ) : null}
              </ListItem>
              <Divider />
            </Box>
          ))}
          <Box className="flex justify-center items-center mt-6">
            <Button
              className="bg-slate-50 text-red-500 font-bold hover:scale-105"
              onClick={handleLogout}
            >
              ĐĂNG XUẤT
            </Button>
          </Box>
        </List>
      </Drawer>
      <Box sx={{ marginLeft: { xs: 0, md: 30 }, padding: { xs: 0, md: 2 } }}>
        {content === 0 ? (
          <Revenue></Revenue>
        ) : content === 1 ? (
          <User></User>
        ) : content === 2 ? (
          <Service></Service>
        ) : content === 3 ? (
          <ScheduleComponentReact></ScheduleComponentReact>
        ) : content === 4 ? (
          <Categories></Categories>
        ) : content === 5 ? (
          <Product></Product>
        ) : content === 6 ? (
          <OrderPro></OrderPro>
        ) : null}
      </Box>
    </Box>
  );
};
export default Menu;
