import * as React from "react";

import {
  Button,
  Container,
  Stack,
  Paper,
  Typography,
  StepContent,
  StepLabel,
  Step,
  Stepper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import Service from "./service";
import Time from "./time";
import Phone from "./phone";

import { selectUser } from "../../../redux/auth/authSelector";
import { useDispatch, useSelector } from "react-redux";
import { selectCartServices } from "../../../redux/serce/serviceSelector";
import { postOrderSer } from "../../../redux/orderSer/orderThunk";
import DialogOrderSuccess from "./dialogOrderSuccess";
import { selectCheckSuccess } from "../../../redux/orderSer/orderSelector";
import { date } from "../../../util/custom";

const steps = [
  {
    label: "Nhập số điện thoại",
  },
  {
    label: "Chọn dịch vụ",
  },

  {
    label: "Chọn ngày, giờ",
  },
];

const Booking = () => {
  const checkSuccessOrder = useSelector(selectCheckSuccess);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartSer = useSelector(selectCartServices);

  const [activeStep, setActiveStep] = React.useState(0);
  const [checkInfoBooking, setCheckInforBooking] = React.useState({
    status: false,
    message: "",
  });

  const [validation, setValidation] = useState({
    status: true,
    message: "",
  });

  const [okOrder, setOkOrder] = React.useState(false);

  const [order, setOrder] = useState({
    createdAt: Date.parse(date),
    listSerId: [""],
    orSerStartTime: "",
    orSerEndTime: "",
    orSerPhoneNo: "",
    orSerStatus: "Đang tiến hành",
    orSerUserId: user ? user.usId : "",
    orSer_Note: "",
    orSer_Total: 0,
  });
  const [time, setTime] = useState({
    hour: "",
    day: "",
    date: "",
    month: "",
    year: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const list = [];
    cartSer.forEach((element) => {
      list.push(element.seId);
    });
    const totalSum = cartSer?.reduce(
      (preValue, currentValue) => preValue + currentValue.sePrice,
      0
    );
    setOrder((preState) => ({
      ...preState,
      listSerId: list,
      orSer_Total: totalSum,
    }));
  }, [cartSer]);

  const handleNext = (id) => {
    if (id === 1 && activeStep === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (id === 2 && activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (id === 3 && activeStep === 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCheckInforBooking({ status: false, message: "" });
  };

  const hanldeOrder = () => {
    if (order.listSerId.length === 0) {
      setCheckInforBooking({
        status: true,
        message: "Vui lòng chọn dịch vụ",
      });
    } else if (
      order.orSerStartTime.toString() === "Invalid Date" &&
      order.orSerEndTime.toString() === "Invalid Date"
    ) {
      setCheckInforBooking({
        status: true,
        message: "Vui lòng chọn lịch hẹn",
      });
    } else if (validation.status === false) {
      setCheckInforBooking({
        status: true,
        message: validation.message,
      });
    } else {
      setOkOrder(true);
      setCheckInforBooking({
        status: false,
        message: "",
      });
    }
  };
  useEffect(() => {
    if (okOrder === true) {
      dispatch(postOrderSer(order)).then(() => {
        setOkOrder(false);
      });
    }
  }, [dispatch, okOrder, order]);

  console.log("order", order);
  const month = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  const changeDate = (time) => {
    if (time.getMonth() < 10 && time.getDate() < 10) {
      let plusDateTime =
        time.getFullYear().toString() +
        "-0" +
        month[time.getUTCMonth()].toString() +
        "-0" +
        time.getDate().toString() +
        "T" +
        time.getHours() +
        ":00:00";
      return plusDateTime;
    } else if (time.getDate() < 10) {
      let plusDateTime =
        time.getFullYear().toString() +
        "-" +
        month[time.getUTCMonth()].toString() +
        "-0" +
        time.getDate().toString() +
        "T" +
        time.getHours().toString() +
        ":00:00";
      return plusDateTime;
    } else if (time.getMonth() < 10) {
      let plusDateTime =
        time.getFullYear().toString() +
        "-0" +
        month[time.getUTCMonth()].toString() +
        "-" +
        time.getDate().toString() +
        "T" +
        time.getHours() +
        ":00:00";
      return plusDateTime;
    }
  };
  return (
    <Stack sx={{ marginY: 15 }}>
      <Container maxWidth="md">
        <Paper className="p-6 border border-rose-200">
          <Typography align="center" className="font-bold">
            ĐẶT LỊCH GIỮ CHỖ
          </Typography>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps?.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
                <Container>
                  {index === 0 ? (
                    <Phone
                      parentCallback={(value) => {
                        handleNext(1);
                        setOrder((preState) => ({
                          ...preState,
                          orSerPhoneNo: value.phone,
                        }));
                        setValidation({
                          status: value.validate,
                          message: value.message,
                        });
                      }}
                    ></Phone>
                  ) : index === 1 ? (
                    <Service parentCallback={() => handleNext(2)}></Service>
                  ) : index === 2 ? (
                    <Time
                      parentCallbackTime={(time) => {
                        setTime(time);
                        setOrder((preState) => ({
                          ...preState,
                          orSerStartTime: changeDate(new Date(time.startDate)),
                          orSerEndTime: changeDate(new Date(time.endDate)),
                        }));
                      }}
                      parentCallback={() => handleNext(3)}
                    ></Time>
                  ) : null}
                </Container>
              </Step>
            ))}
          </Stepper>

          <Button
            className="mt-8 text-slate-50 bg-rose-400 hover:bg-rose-500 p-3 text-sm"
            sx={{ display: "block", margin: "auto" }}
            onClick={hanldeOrder}
          >
            Hoàn tất đặt lịch <br />
            {time.startDate === "" &&
            time.endDate === "" &&
            time.day === "" &&
            time.date === "" &&
            time.month === "" &&
            time.year === "" &&
            time.hour === "" ? null : (
              <Typography className="text-xs mt-1 capitalize">
                {time.day} {time.hour}:00 {time.date}/{time.month}
              </Typography>
            )}
          </Button>
        </Paper>
        <Snackbar
          open={checkInfoBooking.status}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            {checkInfoBooking.message}
          </Alert>
        </Snackbar>
      </Container>
      {checkSuccessOrder === true ? (
        <DialogOrderSuccess></DialogOrderSuccess>
      ) : null}
    </Stack>
  );
};
export default Booking;
