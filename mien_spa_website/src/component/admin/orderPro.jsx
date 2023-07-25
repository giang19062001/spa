import * as React from "react";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  Paper,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  Box,
  Grid,
  Divider,
  Avatar,
  FormControl,
  MenuItem,
  LinearProgress,
  Stack,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderPro,
  fetchOrderProDetail,
  putOrderPro,
} from "../../redux/orderPro/orderThunk.js";
import {
  CssInputLabel,
  CssSelect,
  date,
  formatter,
  StyledTableCell,
  StyledTableRow,
} from "../../util/custom.js";
import { selectListProduct } from "../../redux/product/productSelector.js";
import { selectStatusOrderPro } from "../../redux/orderPro/orderSelector.js";
import { useReactToPrint } from "react-to-print";

const OrderPro = () => {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "orderPro",
  });
  const [orderEdit, setOrderEdit] = useState({});

  const [dataListOrder, setDataListOrder] = useState([]);

  const [dataOrder, setdataOrder] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);

  const [openDialogDetail, setOpenDialogDetail] = React.useState(false);
  const [openDialogSuccess, setOpenDialogSuccess] = React.useState(false);

  const listProduct = useSelector(selectListProduct);
  const loading = useSelector(selectStatusOrderPro);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderPro()).then((res) => {
      setDataListOrder(res.payload);
    });
  }, [dispatch]);

  
  const hanldeCloseDialogSuccess = () =>{
    setOpenDialogSuccess(false)
  }
  const handleDetail = (id) => {
    dispatch(fetchOrderProDetail({ id: id, listProduct: listProduct })).then(
      (res) => {
        setDataDetail(res.payload);
      }
    );
  };
  useEffect(() => {
    if (dataDetail !== undefined) {
      setOpenDialogDetail(true);
    }
  }, [dataDetail]);

  const handleChangeEdit = (event) => {
    setOrderEdit((preState) => ({
      ...preState,
      orProStatus: event.target.value,
    }));
  };

  const handleEdit = () => {
    const objPut = { ...orderEdit, updatedAt: Date.parse(date) };
    dispatch(putOrderPro(objPut)).then(() => {
      setOpenDialogEdit(false);
      setOpenDialogSuccess(true)
      dispatch(fetchOrderPro()).then((res) => {
        setDataListOrder(res.payload);
      });
    });
  };

  return (
    <Paper sx={{ marginY: 2 }}>
      <TableContainer>
        <Typography variant="h5" align="center" className="font-bold mb-2">
          Danh sách <b className="text-rose-600">đơn hàng</b>
        </Typography>

        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                className="bg-rose-600 text-slate-50"
              >
                ID đơn hàng
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="bg-rose-600 text-slate-50"
              >
                ID và tên khách hàng
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="bg-rose-600 text-slate-50"
              >
                Tình trạng
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="bg-rose-600 text-slate-50"
              >
                Ngày đặt hàng
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="bg-rose-600 text-slate-50"
              >
                Tổng giá đơn hàng
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="bg-rose-600 text-slate-50"
              ></StyledTableCell>
              <StyledTableCell
                align="center"
                className="bg-rose-600 text-slate-50"
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataListOrder?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row?.orProId}</StyledTableCell>
                <StyledTableCell align="center">
                  {row?.orProUserId !== null ? (
                    <Typography>
                      {row?.orProUserId} ({row?.orProUserName})
                    </Typography>
                  ) : (
                    <Typography className="text-rose-400 font-semibold">
                      Khách vãng lai
                    </Typography>
                  )}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {row?.orProStatus === "Chờ xác nhận" ? (
                    <Typography className="text-yellow-400 font-semibold">
                      Chờ xác nhận
                    </Typography>
                  ) : row?.orProStatus === "Đang giao hàng" ? (
                    <Typography className="text-sky-500 font-semibold">
                      Đang giao hàng
                    </Typography>
                  ) : row?.orProStatus === "Giao hàng thành công" ? (
                    <Typography className="text-green-500 font-semibold">
                      Giao hàng thành công
                    </Typography>
                  ) : (
                    <Typography className="text-red-500 font-semibold">
                      Giao hàng thất bại
                    </Typography>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(row?.createdAt).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <b style={{ color: "red" }}>
                    {formatter.format(row?.orProTotal)}
                  </b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.orProStatus === "Giao hàng thành công" ? (
                    <Typography className="grow    text-slate-50 bg-green-500  rounded-full p-2">
                      Đơn hàng đã hoàn thành
                    </Typography>
                  ) : row?.orProStatus === "Giao hàng thất bại" ?(
                    <Typography className="grow    text-slate-50 bg-red-500  rounded-full p-2">
                    Đơn hàng đã bị hủy
                  </Typography>
                  ):(
                    <Button
                      className="grow    text-slate-50 bg-yellow-400 hover:bg-yellow-500 rounded-full "
                      onClick={() => {
                        setOpenDialogEdit(true);
                        setOrderEdit(row);
                      }}
                    >
                      Cập nhập tình trạng
                    </Button>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    className="grow    text-slate-50 bg-sky-500 rounded-full hover:bg-sky-700"
                    onClick={() => {
                      handleDetail(row?.orProId);
                      setdataOrder(row);
                    }}
                  >
                    Chi tiết
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
                  open={openDialogSuccess}
                  onClose={hanldeCloseDialogSuccess}
                >
                  <DialogTitle>Thông báo</DialogTitle>
                  <DialogContent>
                    <img
                      style={{ width: 150, margin: "auto", display: "block" }}
                      src={require("../../assets/stickSuccess.gif")}
                      alt=""
                    />

                    <Typography>Cập nhập đơn hàng thành công</Typography>
                    <Button id="idButton1" onClick={hanldeCloseDialogSuccess}>
                      {" "}
                      Đóng
                    </Button>
                  </DialogContent>
                </Dialog>
      </TableContainer>
      {openDialogDetail === true && dataDetail === undefined ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Dialog
          open={openDialogDetail}
          maxWidth={"md"}
          fullWidth={true}
          onClose={() => {
            setOpenDialogDetail(false);
            setDataDetail(undefined);
          }}
        >
          <div style={{ marginBottom: 30 }}>
            <DialogContent ref={componentRef}>
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
                      Tên khách hàng:{" "}
                      <b style={{ color: "#f43f5e" }}>
                        {dataOrder?.orProUserName
                          ? dataOrder?.orProUserName
                          : "Khách vãng lai"}
                      </b>
                    </p>
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
                      Ngày giao hàng dự kiến:{" "}
                      <b>{new Date(dataOrder?.orProDob).toLocaleString()}</b>
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
                          data?.product?.featureImgPath
                        }
                      ></Avatar>
                    </Grid>

                    <Grid item sx={{ display: "block", margin: "auto" }}>
                      <Stack>
                        <p style={{ fontWeight: "bold", color: "#0ea5e9" }}>
                          {" "}
                          {data?.product?.proName}
                        </p>
                        <p> {data?.product?.proBrand}</p>
                        <p style={{ color: "red" }}>
                          {formatter.format(data?.product?.proPrice)}{" "}
                        </p>
                        <p>Số lượng: {data?.quantity}</p>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Divider sx={{ marginY: 3 }} />
                </Box>
              ))}
            </DialogContent>
            <Button id="idButton1" onClick={handlePrint}>
              In hóa đơn
            </Button>
          </div>
        </Dialog>
      )}
      {openDialogEdit === true ? (
        <Dialog
          open={openDialogEdit}
          maxWidth={"md"}
          fullWidth={true}
          onClose={() => {
            setOpenDialogEdit(false);
          }}
        >
          <DialogContent>
            <Typography
              align="center"
              variant="h5"
              style={{ fontWeight: "bold", color: "#e11d48" }}
            >
              Tình trạng đơn hàng
            </Typography>
            <FormControl fullWidth sx={{ marginY: 5 }}>
              <CssInputLabel>Tình trạng đơn hàng</CssInputLabel>

              {orderEdit?.orProStatus === "Chờ xác nhận" ? (
                <CssSelect
                  value={orderEdit?.orProStatus}
                  label="Tình trạng đơn hàng"
                  onChange={handleChangeEdit}
                >
                  <MenuItem value={"Chờ xác nhận"}>Chờ xác nhận</MenuItem>
                  <MenuItem value={"Đang giao hàng"}>Đang giao hàng</MenuItem>
                  <MenuItem value={"Giao hàng thành công"} disabled>
                    Giao hàng thành công
                  </MenuItem>
                  <MenuItem
                    value={"Giao hàng thành công"}
                    sx={{ color: "red", fontWeight: "bold" }}
                    disabled
                  >
                    Giao hàng thất bại
                  </MenuItem>
                </CssSelect>
              ) : (
                <CssSelect
                  value={orderEdit?.orProStatus}
                  label="Tình trạng đơn hàng"
                  onChange={handleChangeEdit}
                >
                  <MenuItem value={"Chờ xác nhận"} disabled>
                    Chờ xác nhận
                  </MenuItem>
                  <MenuItem value={"Đang giao hàng"}>Đang giao hàng</MenuItem>
                  <MenuItem value={"Giao hàng thành công"}>
                    Giao hàng thành công
                  </MenuItem>
                  <MenuItem
                    value={"Giao hàng thất bại"}
                    sx={{ color: "red", fontWeight: "bold" }}
                  >
                    Giao hàng thất bại
                  </MenuItem>
                </CssSelect>
              )}
              {loading === true ? (
                <Box sx={{ width: "100%", marginY: 2 }}>
                  <LinearProgress />
                </Box>
              ) : null}
              <Button id="idButton1" onClick={handleEdit}>
                Lưu thay đổi
              </Button>
            </FormControl>
          </DialogContent>
        </Dialog>
      ) : null}
    </Paper>
  );
};
export default OrderPro;
