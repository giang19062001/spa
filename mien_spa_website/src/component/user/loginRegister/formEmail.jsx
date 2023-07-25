import React, { useState,  } from "react";

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
import { generateOTP } from "../../../redux/otp/otpThunk";
import FormOTP from "./formOtp";
import {  selectLoading } from "../../../redux/otp/otpSelector";

const FormEmail = (props) => {
  const [email, setEmail] = useState();
  const [checkEmail, setCheckEmail] = useState({
    status: false,
    message: "",
  });
  const [openFormOtp, setOpenFormOtp] = useState(false);

  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();
  const handleCloseFormEmail = () => {
    props.parentCallbackEmail();
  };
  const handelCloseFormOtp = () => {
    handleCloseFormEmail();
    setOpenFormOtp(false);
  };

  const hanldeComfirm = () => {
    if (!email?.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)) {
      setCheckEmail({ status: true, message: "Email không đúng định dạng" });
    } else {
      setCheckEmail({ status: false, message: "" });
      dispatch(generateOTP(email)).then((res) => {
        console.log("res",res)
        if (res.error) {
          setCheckEmail({
            status: true,
            message: "Email chưa được đăng ký tài khoản với Miên Spa",
          });
        } else {
          setOpenFormOtp(true);
        }
      });
    }
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleCloseFormEmail}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography variant="h6">
            Vui lòng điền email để gửi mã OTP
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseFormEmail}
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
              label="Email"
              type="text"
              name="email"
              error={checkEmail.status ? true : false}
              helperText={checkEmail.status ? checkEmail.message : null}
              onChange={(e) => setEmail(e.target.value)}
            ></CssTextField>
            {loading === true ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : null}

            <Button
              id="idButton1"
              style={{ marginTop: 20 }}
              onClick={hanldeComfirm}
              disabled={loading}
            >
              Gửi mã xác thực
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      {openFormOtp === true ? (
        <FormOTP parentCallbackOtp={handelCloseFormOtp}></FormOTP>
      ) : null}
    </div>
  );
};

export default FormEmail;
