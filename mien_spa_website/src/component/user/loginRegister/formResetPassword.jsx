import React, { useEffect } from "react";

import {
  DialogContent,
  Dialog,
  Button,
  Stack,
  LinearProgress,
  Box,
  Typography,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { CssTextField } from "../../../util/custom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectLoading,
  selectOtp,
} from "../../../redux/otp/otpSelector";
import { useState } from "react";
import { forgot_password } from "../../../redux/otp/otpThunk";
import CloseIcon from "@mui/icons-material/Close";
import { validate } from "validate.js";
import { schemaPassword } from "../../../util/validate";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const FormResetPassword = (props) => {
  const email = useSelector(selectEmail);
  const otp = useSelector(selectOtp);
  const loading = useSelector(selectLoading);
  const [dataPassword, setDataPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const handleCloseFormResetPassword = () => {
    props.parentCallbackResetPassword();
  };
  const [visibilityState, setVisibilityState] = useState(false);

  const hanldeVisibility = () => {
    if (visibilityState === false) {
      setVisibilityState(true);
    } else {
      setVisibilityState(false);
    }
  };
  const [visibilityStateConfirm, setVisibilityStateConfirm] = useState(false);

  const hanldeVisibilityConfirm = () => {
    if (visibilityStateConfirm === false) {
      setVisibilityStateConfirm(true);
    } else {
      setVisibilityStateConfirm(false);
    }
  };
 
  //validation
  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  useEffect(() => {
    const errors = validate.validate(dataPassword, schemaPassword);
    setValidation((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataPassword]);

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  const handleChange = (event) => {
    setDataPassword((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [event.target.name]: true,
      },
    }));
  };

  const hanldeComfirm = () => {
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        password: true,
        confirmPassword: true,
      },
    }));
    if (validation.isvalid === true) {
      dispatch(
        forgot_password({
          email: email,
          otp: otp,
          password: dataPassword.password,
        })
      ).then(() => {
        handleCloseFormResetPassword();
      });
    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleCloseFormResetPassword}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h6">Vui lòng nhập mật khẩu mới vào đây</Typography>
        <IconButton
          aria-label="close"
          onClick={handleCloseFormResetPassword}
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
        <Stack spacing={3} sx={{ marginY: 2 }}>
          <CssTextField
            label="Mật khẩu mới"
            type={visibilityState ? "text" : "password"}
            name="password"
            onChange={handleChange}
            error={hasError("password")}
            helperText={
              hasError("password") ? validation.errors.password?.[0] : null
            }
            InputProps={{
              endAdornment: (
                <IconButton onClick={hanldeVisibility}>
                  <VisibilityOffIcon></VisibilityOffIcon>
                </IconButton>
              ),
            }}
          ></CssTextField>
          <CssTextField
            label="Xác nhận mật khẩu"
            type={visibilityStateConfirm ? "text" : "password"}
            name="confirmPassword"
            error={hasError("confirmPassword")}
            onChange={handleChange}
            helperText={
              hasError("confirmPassword")
                ? validation.errors.confirmPassword?.[0]
                : null
            }
            InputProps={{
              endAdornment: (
                <IconButton onClick={hanldeVisibilityConfirm}>
                  <VisibilityOffIcon></VisibilityOffIcon>
                </IconButton>
              ),
            }}
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
          >
            Lưu mật khẩu
          </Button>
        </Stack>
      </DialogContent>
  
    </Dialog>
  );
};

export default FormResetPassword;
