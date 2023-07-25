import React, { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Stack,
  LinearProgress,
  Box,
  Typography,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { CssTextField } from "../../../util/custom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectLoading,
  selectSuccess,
  selectValidate,
} from "../../../redux/otp/otpSelector";
import { validateOtp } from "../../../redux/otp/otpThunk";
import FormResetPassword from "./formResetPassword";
import { turnOffValidateSuccess } from "../../../redux/otp/otpReducer";

const FormOTP = (props) => {
  const [otp, setOtp] = useState();
  const [checkOtp, setCheckOtp] = useState({
    status: false,
    message: "",
  });
  const [timer, setTimer] = useState(300);
  const timeId = useRef(null);
  const clear = () => {
    window.clearInterval(timeId.current);
  };
  const email = useSelector(selectEmail);
  const success = useSelector(selectValidate);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    timeId.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    return () => clear();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clear();
      handleCloseFormOtp();
    }
  }, [timer]);

  const handelCloseFormPassword = () => {
    handleCloseFormOtp();
    dispatch(turnOffValidateSuccess());
  };
  const handleCloseFormOtp = () => {
    props.parentCallbackOtp();
  };

  const hanldeComfirm = () => {
    dispatch(validateOtp({ email: email, otp: otp })).then((res) => {
      if (res.error) {
        setCheckOtp({
          status: true,
          message: "Mã OTP không hợp lệ",
        });
      } else {
        setCheckOtp({ status: false, message: "" });
      }
    });
  };

  return (
    <div>
      <Dialog open={true} onClose={handleCloseFormOtp} fullWidth maxWidth="sm">
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6">
            Vui lòng kiểm tra email và điền mã OTP vào đây
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseFormOtp}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#dc2626",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ marginY: 2 }}>
            <CssTextField
              label="Mã OTP"
              type="number"
              onChange={(e) => setOtp(e.target.value)}
              error={checkOtp.status ? true : false}
              helperText={checkOtp.status ? checkOtp.message : null}
            ></CssTextField>
            <p>
              Thời gian xác thực : <b>{timer} giây </b>
            </p>
            {loading === true ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : null}
            <Button
              id="idButton1"
              style={{ marginTop: 20 }}
              onClick={hanldeComfirm}
            >
              Xác thực OTP
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      {success === true ? (
        <FormResetPassword
          parentCallbackResetPassword={handelCloseFormPassword}
        ></FormResetPassword>
      ) : null}
    </div>
  );
};

export default FormOTP;
