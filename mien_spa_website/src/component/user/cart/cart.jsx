import {
  Container,
  Box,
  Typography,
  Stack,
  Paper,
  Button,
  Divider,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCart, addCart } from "../../../redux/product/productReducer";
import { selectCartProduct } from "../../../redux/product/productSelector";
import { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import AutoComplete from "./autocomplete";
import { selectUser } from "../../../redux/auth/authSelector";
import { postOrderPro } from "../../../redux/orderPro/orderThunk";
import { selectCheckSuccess } from "../../../redux/orderPro/orderSelector";
import DialogOrderSuccess from "./dialogOrderSuccess";
import { date, formatter } from "../../../util/custom";
import { PayPalButton } from "react-paypal-button-v2";

const Cart = () => {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const checkSuccessOrder = useSelector(selectCheckSuccess);
  const cartList = useSelector(selectCartProduct);
  const [totalPro, setTotalPro] = useState(0);
  const [map, setMap] = useState({
    distance: "0 km",
  });
  const [checkInforOrder, setCheckInforOrder] = React.useState({
    status: false,
    message: "",
  });

  const [validationPhone, setValidationPhone] = useState({
    message: "",
  });
  const [validationAddress, setValidationAddress] = useState({
    message: "",
  });
  const [okOrder, setOkOrder] = React.useState(false);

  const [order, setOrder] = useState({
    createdAt: Date.parse(date),
    orProAddress: "",
    orProDob: new Date(new Date(date).setDate(new Date(date).getDate() + 5))
      .toISOString()
      .replace(/.\d+Z$/g, "Z"),
    orProNote: "NULL",
    orProPayStatus: "Chưa thanh toán",
    orProPayment: "Thanh toán khi nhận hàng",
    orProPhoneNo: "",
    orProStatus: "Chờ xác nhận",
    orProTotal: 0 + totalPro,
    orProShip: 0,
    orProUserId: user ? user.usId : null,
    orProUserName: user ? user.usUserName : "",
    listProId: [
      {
        ordProQuantity: 0,
        productId: "",
      },
    ],
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCheckInforOrder({ status: false, message: "" });
  };

  useEffect(() => {
    const list = [];
    cartList.forEach((element) => {
      list.push({ productId: element.proId, ordProQuantity: element.quantity });
    });

    setOrder((preState) => ({
      ...preState,
      listProId: list,
    }));

    const totalSum = cartList?.reduce(
      (preValue, currentValue) =>
        preValue + currentValue.proPrice * currentValue.quantity,
      0
    );

    setOrder((preState) => ({
      ...preState,
      listProId: list,
      orProTotal: totalSum + order.orProShip,
    }));
    setTotalPro(totalSum);
  }, [cartList, order.orProPayment, order.orProShip]);

  const handleParentCallbackMap = (objMap) => {
    setMap({ distance: objMap.distance });

    setOrder((preState) => ({
      ...preState,
      orProAddress: objMap.address,
      orProShip: objMap.ship,
    }));
  };

  const handleParentCallbackMapValidate = (value) => {
    setValidationAddress({
      message: value.message,
    });
  };
  const handleParentCallbackMapStateAddress = (value) => {
    setOrder((preState) => ({
      ...preState,
      orProAddress: value,
    }));
  };
  const handleParentCallbackPhone = (value) => {
    setOrder((preState) => ({
      ...preState,
      orProPhoneNo: value.phone,
    }));
    setValidationPhone({
      message: value.message,
    });
  };
  const handleDelete = (id) => {
    dispatch(removeCart(id));
  };

  const handleAddCart = (cartProduct, quantity) => {
    dispatch(addCart({ ...cartProduct, quantity }));
  };

  const handleChange = (event) => {
    setOrder((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const hanldeOrder = () => {
    if (cartList?.length === 0) {
      setCheckInforOrder({
        status: true,
        message: "Vui lòng thêm sản phẩm vào giỏ hàng",
      });
    } else if (validationAddress.message !== undefined) {
      setCheckInforOrder({
        status: true,
        message: validationAddress.message,
      });
    } else if (validationPhone.message !== undefined) {
      setCheckInforOrder({
        status: true,
        message: validationPhone.message,
      });
    } else if (map.distance === "0 km") {
      setCheckInforOrder({
        status: true,
        message: "Vui lòng chọn địa chỉ chính xác",
      });
    } else {
      setOkOrder(true);
      setCheckInforOrder({
        status: false,
        message: "",
      });
    }
  };

  useEffect(() => {
    if (okOrder === true) {
      dispatch(postOrderPro(order)).then(() => {
        setOkOrder(false);
      });
    }
  }, [dispatch, okOrder, order]);

  console.log("ore", order);

  return (
    <Stack className=" mt-12">
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          className="rounded-lg   sm:p-12 p-5 sm:m-12 my-12 border-rose-300 border-4 border-double  "
        >
          <Typography
            variant="h4"
            className="font-semibold  pb-6 text-rose-500"
            align="center"
          >
            Giỏ hàng
          </Typography>

          {isLoaded === true ? (
            <AutoComplete
              parentCallbackMap={handleParentCallbackMap}
              parentCallbackMapValidate={handleParentCallbackMapValidate}
              parentCallbackMapStateAddress={
                handleParentCallbackMapStateAddress
              }
              parentCallbackPhone={handleParentCallbackPhone}
            ></AutoComplete>
          ) : null}

          <Box className="mt-2" id="recaptcha-container"></Box>

          {cartList?.length === 0 ? (
            <Box className="mt-6">
              <Typography align="center" sx={{ color: "red" }}>
                Bạn chưa có sản phẩm nào trong giỏ hàng
              </Typography>
            </Box>
          ) : (
            cartList?.map((cart, index) => (
              <Box key={index} className="flex flex-wrap border-b-2 p-5 mt-6">
                <Box className=" flex-1 ">
                  <img
                    src={
                      process.env.REACT_APP_API_URL +
                      "/image/product/" +
                      cart?.featureImgPath
                    }
                    alt=""
                    className=" rounded-lg "
                  />
                </Box>
                <Box className="flex flex-col items-center justify-center  sm:mx-12 mx-1">
                  <Typography>{cart.proName}</Typography>
                  <br />
                  <Typography className="text-red-500">
                    {formatter.format(cart.proPrice)}
                  </Typography>
                </Box>
                <Box className="flex items-center justify-center sm:mx-12  mx-1 sm:mt-0 mt-5 ">
                  <IconButton
                    disabled={cart.quantity === 1}
                    onClick={() => handleAddCart(cart, -1)}
                  >
                    <RemoveIcon></RemoveIcon>
                  </IconButton>
                  <Typography variant="standard" className="w-5">
                    {cart.quantity}
                  </Typography>
                  <IconButton
                    disabled={cart.quantity === 10}
                    onClick={() => handleAddCart(cart, 1)}
                  >
                    <AddIcon></AddIcon>
                  </IconButton>
                </Box>
                <Box className="flex items-center justify-center sm:mx-12  mx-1 sm:mt-0 mt-5 text-red-500">
                  <Typography>
                    {formatter.format(cart.proPrice * cart.quantity)}
                  </Typography>
                </Box>
                <Box className="flex items-center justify-center sm:mx-12  mx-1 sm:mt-0 mt-5 ">
                  <Button
                    variant="text"
                    color="error"
                    className="text-slate-50 bg-red-500  hover:shadow-lg hover:shadow-red-500  "
                    onClick={() => handleDelete(cart.proId)}
                  >
                    Xóa
                  </Button>
                </Box>
              </Box>
            ))
          )}
          <Stack className="pt-12 px-12 pb-6" spacing={2}>
            <Box>
              <Typography className="float-left  text-sm">
                Khoảng cách
              </Typography>
              <Typography className="float-right text-sm">
                {map.distance}
              </Typography>
            </Box>

            <Box>
              <Typography className="float-left font-semibold text-xl">
                Tiền hàng
              </Typography>
              <Typography className="float-right text-red-500 text-xl">
                {formatter.format(totalPro)}
              </Typography>
            </Box>
            <Box>
              <Typography className="float-left font-semibold text-xl">
                Tiền ship
              </Typography>
              <Typography
                className="float-right text-red-500 text-xl"
                key={order.orProShip}
              >
                {formatter.format(order.orProShip)}
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography className="float-left font-semibold text-xl">
                Tổng tiền
              </Typography>
              <Typography
                className="float-right text-red-500 text-2xl font-bold "
                key={order.orProTotal}
              >
                {formatter.format(order.orProTotal)}
              </Typography>
            </Box>
            <FormControl className="mt-12">
              <FormLabel>Phương thức thanh toán</FormLabel>
              <RadioGroup
                row
                name="orProPayment"
                defaultValue={"Thanh toán khi nhận hàng"}
              >
                <FormControlLabel
                  value="Thanh toán khi nhận hàng"
                  control={<Radio />}
                  label="Thanh toán khi nhận hàng"
                  onChange={handleChange}
                />
                {/* <FormControlLabel
                  value="Momo"
                  control={<Radio />}
                  label="Thanh toán qua Momo"
                  onChange={handleChange}
                /> */}
                <FormControlLabel
                  value="Paypal"
                  control={<Radio />}
                  label="Thanh toán qua Paypal"
                  onChange={handleChange}
                />
              </RadioGroup>
            </FormControl>
          </Stack>

          {order?.orProPayment === "Paypal" ? (
            cartList?.length === 0 ||
            order?.orProAddress === "" ||
            order?.orProPhoneNo === "" ? null : (
              <div style={{ marginLeft: 100, marginRight: 100 }}>
                <PayPalButton
                  options={{
                    clientId: process.env.REACT_APP_PAYPAL,
                    currency: "USD",
                  }}
                  amount={(order?.orProTotal / 23000).toFixed()}
                  onSuccess={() => {
                    setOrder((preState) => ({
                      ...preState,
                      orProPayStatus: "Đã thanh toán",
                    }));
                    hanldeOrder();
                  }}
                />
              </div>
            )
          ) : (
            <Button variant="contained" id="idButton1" onClick={hanldeOrder}>
              Đặt hàng
            </Button>
          )}
        </Paper>
        <Snackbar
          open={checkInforOrder.status}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            {checkInforOrder.message}
          </Alert>
        </Snackbar>
      </Container>
      {checkSuccessOrder === true ? (
        <DialogOrderSuccess></DialogOrderSuccess>
      ) : null}
    </Stack>
  );
};

export default Cart;
