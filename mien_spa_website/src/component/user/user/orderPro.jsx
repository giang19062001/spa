import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";

import {
  Typography,
  Tabs,
  AppBar,
  Box,
  Paper,
  Dialog,
  DialogContent,
  Divider,
  Button,
  Grid,
  Avatar,
  Stack,
  Backdrop,
  CircularProgress,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../redux/auth/authSelector";
import {
  fetchOrderProByUser,
  fetchOrderProDetail,
  putOrderPro,
} from "../../../redux/orderPro/orderThunk";
import { useState } from "react";
import PropTypes from "prop-types";

import { useEffect } from "react";
import { selectListProduct } from "../../../redux/product/productSelector";
import {
  date,
  formatter,
  TabCustom,
  tabNumber,
  TabPanel,
} from "../../../util/custom";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function OrderProComponent() {
  const theme = useTheme();
  const listProduct = useSelector(selectListProduct);

  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [dataListOrder, setDataListOrder] = useState([]);
  const [dataOrder, setdataOrder] = useState();

  const [dataDetail, setDataDetail] = useState();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);
  const [openDialogSucces, setOpenDialogSuccess] = React.useState(false);

  React.useEffect(() => {
    if (userId) {
      dispatch(fetchOrderProByUser(userId)).then((res) => {
        setDataListOrder(res.payload);
      });
    }
  }, [dispatch, userId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleDetail = (id) => {
    dispatch(fetchOrderProDetail({ id: id, listProduct: listProduct })).then(
      (res) => {
        setDataDetail(res.payload);
      }
    );
  };
  const hanldeConfirm = () =>{
    setOpenDialogConfirm(true)
  }
  const hanldeCloseDialogConfirm = () =>{
    setOpenDialogConfirm(false)
  }
  const hanldeCloseDialogSuccess = () =>{
    setOpenDialogSuccess(false)
    setOpenDialog(false);
    dispatch(fetchOrderProByUser(userId)).then((res) => {
      setDataListOrder(res.payload);
    });
  }
  const handleUpdateStatus = () =>{
     const obj = {...dataOrder,orProStatus:"Giao hàng thất bại",updatedAt: new Date(date) }
     dispatch(putOrderPro(obj)).then(() => {
      setOpenDialogConfirm(false)
      setOpenDialogSuccess(true)
    });
  }
  useEffect(() => {
    if (dataDetail !== undefined) {
      setOpenDialog(true);
    }
  }, [dataDetail]);




  return (
    <Box>
      <Paper>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="danger"
            textColor="white"
            variant="fullWidth"
            className="bg-rose-300"
          >
            <TabCustom label="Chờ xác nhận" {...tabNumber(0)} wrapped />
            <TabCustom label="Đang giao" {...tabNumber(1)} wrapped />
            <TabCustom label="Giao thành công" {...tabNumber(2)} wrapped />
            <TabCustom label="Đã hủy" {...tabNumber(3)} wrapped />

          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            {dataListOrder?.some(
              (orderCheckStatus) =>
                orderCheckStatus.orProStatus === "Chờ xác nhận"
            ) ? (
              dataListOrder.map((data, index) =>
                data.orProStatus === "Chờ xác nhận" ? (
                  <Box className="" key={index}>
                    <Grid container spacing={8} className="py-2">
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Box className="flex flex-wrap space-x-1 my-2 ">
                          <Typography className="grow ">
                            Mã đơn hàng: <b className="border-double  border-4 border-rose-300 rounded-lg p-2	">{data.orProId}</b>
                          </Typography>
                          <Typography className="grow">
                            Tổng hóa đơn:{" "}
                            <b className="text-red-500">
                              {formatter.format(data.orProTotal)}{" "}
                            </b>
                          </Typography>
                          <Typography className="grow">
                            Ngày đặt hàng:{" "}
                            <b>{new Date(data.createdAt).toLocaleString()}</b>
                          </Typography>
                          <Button
                            className="grow    text-slate-50 bg-sky-400 rounded-full hover:bg-sky-600"
                            onClick={() => {
                              handleDetail(data.orProId);
                              setdataOrder(data);
                            }}
                          >
                            Chi tiết
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Box>
                ) : null
              )
            ) : (
              <Typography align="center" className="font-bold text-red-500">
                Chưa có đơn hàng nào
              </Typography>
            )}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
          {dataListOrder?.some(
              (orderCheckStatus) =>
                orderCheckStatus.orProStatus === "Đang giao hàng"
            ) ? (
              dataListOrder.map((data, index) =>
                data.orProStatus === "Đang giao hàng" ? (
                  <Box className="" key={index}>
                    <Grid container spacing={8} className="py-2">
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Box className="flex flex-wrap space-x-1 my-2 ">
                          <Typography className="grow ">
                            Mã đơn hàng: <b className="border-double  border-4 border-rose-300 rounded-lg p-2	">{data.orProId}</b>
                          </Typography>
                          <Typography className="grow">
                            Tổng hóa đơn:{" "}
                            <b className="text-red-500">
                              {formatter.format(data.orProTotal)}{" "}
                            </b>
                          </Typography>
                          <Typography className="grow">
                            Ngày đặt hàng:{" "}
                            <b>{new Date(data.createdAt).toLocaleString()}</b>
                          </Typography>
                          <Button
                            className="grow    text-slate-50 bg-sky-400 rounded-full hover:bg-sky-600"
                            onClick={() => {
                              handleDetail(data.orProId);
                              setdataOrder(data);
                            }}
                          >
                            Chi tiết
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Box>
                ) : null
              )
            ) : (
              <Typography align="center" className="font-bold text-red-500">
                Chưa có đơn hàng nào
              </Typography>
            )}
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
          {dataListOrder?.some(
              (orderCheckStatus) =>
                orderCheckStatus.orProStatus === "Giao hàng thành công"
            ) ? (
              dataListOrder.map((data, index) =>
                data.orProStatus === "Giao hàng thành công" ? (
                  <Box className="" key={index}>
                    <Grid container spacing={8} className="py-2">
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Box className="flex flex-wrap space-x-1 my-2 ">
                          <Typography className="grow">
                            Mã đơn hàng: <b className="border-double  border-4 border-rose-300 rounded-lg p-2	">{data.orProId}</b>
                          </Typography>
                          <Typography className="grow">
                            Tổng hóa đơn:{" "}
                            <b className="text-red-500">
                              {formatter.format(data.orProTotal)}{" "}
                            </b>
                          </Typography>
                          <Typography className="grow">
                          <b>{new Date(data.createdAt).toLocaleString()}</b>
                          </Typography>
                          <Button
                            className="grow    text-slate-50 bg-sky-400 rounded-full hover:bg-sky-600"
                            onClick={() => {
                              handleDetail(data.orProId);
                              setdataOrder(data);
                            }}
                          >
                            Chi tiết
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Box>
                ) : null
              )
            ) : (
              <Typography align="center" className="font-bold text-red-500">
                Chưa có đơn hàng nào
              </Typography>
            )}
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
          {dataListOrder?.some(
              (orderCheckStatus) =>
                orderCheckStatus.orProStatus === "Giao hàng thất bại"
            ) ? (
              dataListOrder.map((data, index) =>
                data.orProStatus === "Giao hàng thất bại" ? (
                  <Box className="" key={index}>
                    <Grid container spacing={8} className="py-2">
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Box className="flex flex-wrap space-x-1 my-2 ">
                          <Typography className="grow">
                            Mã đơn hàng: <b className="border-double  border-4 border-rose-300 rounded-lg p-2	">{data.orProId}</b>
                          </Typography>
                          <Typography className="grow">
                            Tổng hóa đơn:{" "}
                            <b className="text-red-500">
                              {formatter.format(data.orProTotal)}{" "}
                            </b>
                          </Typography>
                          <Typography className="grow">
                          <b>{new Date(data.createdAt).toLocaleString()}</b>
                          </Typography>
                          <Button
                            className="grow    text-slate-50 bg-sky-400 rounded-full hover:bg-sky-600"
                            onClick={() => {
                              handleDetail(data.orProId);
                              setdataOrder(data);
                            }}
                          >
                            Chi tiết
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Box>
                ) : null
              )
            ) : (
              <Typography align="center" className="font-bold text-red-500">
                Danh sách đơn bị hủy trống
              </Typography>
            )}
          </TabPanel>
        </SwipeableViews>
      </Paper>
      {openDialog === true && dataDetail === undefined ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Dialog
          open={openDialog}
          maxWidth={"md"}
          fullWidth={true}
          onClose={() => {
            setOpenDialog(false);
            setDataDetail(undefined);
          }}
        >
          <DialogContent>
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "2em",
                marginBottom: 50,
                marginTop: 20,
                textDecoration: "underline",
                textDecorationColor: "#f43f5e",
                color: "#f43f5e",
              }}
            >
              CHI TIẾT ĐƠN HÀNG
            </p>
            <Box sx={{ paddingX: { xs: 0, sm: 10, md: 10, lg: 10, xl: 10 } }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <p>
                    Mã đơn hàng: <b>{dataOrder?.orProId}</b>
                  </p>
                  <p>
                    Phương thức thanh toán: <b>{dataOrder?.orProPayment}</b>
                  </p>
                  <p>
                    Tiền ship:{" "}
                    <b style={{ color: "red" }}>
                      {formatter.format(dataOrder?.orProShip)}
                    </b>
                  </p>
                  <p>
                    Tiền hàng:{" "}
                    <b style={{ color: "red" }}>
                      {formatter.format(
                        dataOrder?.orProTotal - dataOrder?.orProShip
                      )}
                    </b>
                  </p>
                  <hr style={{ marginTop: 5, marginBottom: 5 }} />

                  <b>
                    Tổng đơn hàng:{" "}
                    <b style={{ color: "red" }}>
                      {formatter.format(dataOrder?.orProTotal)}
                    </b>
                  </b>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <p>
                    Địa chỉ giao hàng:{" "}
                    <b style={{ color: "#0ea5e9" }}>
                      {dataOrder?.orProAddress}
                    </b>
                  </p>
                  <p>
                    Số điện thoại đặt hàng:{" "}
                    <b style={{ color: "#f43f5e" }}>
                      {dataOrder?.orProPhoneNo}
                    </b>
                  </p>
                  <p>
                    Ngày giao hàng dự kiến: <b>{new Date(dataOrder?.orProDob).toLocaleString()}</b>
                  </p>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ marginY: 3 }} />
            {dataDetail?.map((data, index) => (
              <Box
                key={index}
                sx={{ paddingX: { xs: 0, sm: 5, md: 5, lg: 5, xl: 5 } }}
              >
                <Grid container>
                  <Grid item sx={{ display: "block", margin: "auto" }}>
                    <Avatar
                      variant="square"
                      sx={{ width: 200, height: 200, borderRadius: 10 }}
                      src={
                        process.env.REACT_APP_API_URL +
                        "/image/product/" +
                        data.product.featureImgPath
                      }
                    ></Avatar>
                  </Grid>

                  <Grid item sx={{ display: "block", margin: "auto" }}>
                    <Stack>
                      <p style={{ fontWeight: "bold", color: "#0ea5e9" }}>
                        {" "}
                        {data.product.proName}
                      </p>
                      <p> {data.product.proBrand}</p>
                      <p style={{ color: "red" }}>
                        {formatter.format(data.product.proPrice)}{" "}
                      </p>
                      <p>Số lượng: {data.quantity}</p>
                    </Stack>
                  </Grid>
                </Grid>
                <Divider sx={{ marginY: 3 }} />
               
              </Box>
            ))}
             {dataOrder?.orProStatus === "Chờ xác nhận" && dataOrder?.orProPayStatus === "Chưa thanh toán"?(
                  <Button id="idButton1" onClick={hanldeConfirm}> Hủy đơn</Button>
                ):(
                  null
                )}
          </DialogContent>
          <Dialog open={openDialogConfirm} onClose={hanldeCloseDialogConfirm}>
            <DialogTitle>
                Thông báo
            </DialogTitle>
           <DialogContent>
           <img style={{width:150,margin:"auto",display:"block"}} src={require("../../../assets/warning.png")} alt=""/>

               <Typography>Bạn chắc chắn muốn hủy đơn hàng này</Typography>
               <Button id="idButton1" onClick={handleUpdateStatus}> Xác nhận</Button>
           </DialogContent>
          </Dialog>
          <Dialog open={openDialogSucces} onClose={hanldeCloseDialogSuccess}>
          
           <DialogContent>
           <img style={{width:150,margin:"auto",display:"block"}} src={require("../../../assets/stickSuccess.gif")} alt=""/>

               <Typography>Hủy đơn hàng thành công</Typography>
               <Button id="idButton1" onClick={hanldeCloseDialogSuccess}> Đóng</Button>

           </DialogContent>
          </Dialog>
        </Dialog>
       
      )}
    </Box>
  );
}
