import {
  Stack,
  Button,
  Paper,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import { logout } from "../../../redux/auth/userReducer";

import { CssTextField, date } from "../../../util/custom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  changePassword,
  updatePassword,
  updateUser,
} from "../../../redux/auth/authThunk";
import { useState } from "react";
import { useEffect } from "react";
import { validate } from "validate.js";
import { schemaChangePassword } from "../../../util/validate";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { selectUser } from "../../../redux/auth/authSelector";

const ChangePassword = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialogError, setOpenDialogError] = useState(false);
  const [openDialogDuplicate, setOpenDialogDuplicate] = useState(false);
  const [openDialogSuccess, setOpenDialogSuccess] = useState(false);

  //visibility
  const [visibilityStateOld, setVisibilityStateOld] = useState(false);

  const hanldeVisibilityOld = () => {
    if (visibilityStateOld === false) {
      setVisibilityStateOld(true);
    } else {
      setVisibilityStateOld(false);
    }
  };
  const [visibilityStateNew, setVisibilityStateNew] = useState(false);

  const hanldeVisibilityNew = () => {
    if (visibilityStateNew === false) {
      setVisibilityStateNew(true);
    } else {
      setVisibilityStateNew(false);
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

  const handleBack = () => {
    props.callbackOpenUser();
  };

  // validation
  const [dataChangePassword, setDataChangePassword] = useState({
    passwordOld: "",
    passwordNew: "",
    confirmPassword: "",
  });
  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });

  useEffect(() => {
    const errors = validate.validate(dataChangePassword, schemaChangePassword);
    setValidation((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataChangePassword]);

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };
  const handleChange = (event) => {
    setDataChangePassword((preState) => ({
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

  const handleUpdatePassword = () => {
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        passwordOld: true,
        passwordNew: true,
        confirmPassword: true,
      },
    }));
    if (validation.isvalid === true) {
      let obj = {
        newPassword: dataChangePassword.passwordNew,
        oldPassword: dataChangePassword.passwordOld,
        userId: user?.usId,
      };
      dispatch(changePassword(obj)).then((res) => {
        console.log("res", res);
        if (res.error) {
          setOpenDialogError(true);
        } else if (res.payload === false) {
          setOpenDialogDuplicate(true);
        } else {
          setOpenDialogSuccess(true);
        }
       
      });
    }
  };

  const handleLogout = () =>{
    setOpenDialogSuccess(false)
     dispatch(logout());
        navigate("/");
  }

  return (
    <Container sx={{ paddingTop: 5 }}>
      <Paper elevation={6} className=" p-12">
        <Stack spacing={2}>
          <CssTextField
            type={visibilityStateOld ? "text" : "password"}
            onChange={handleChange}
            name="passwordOld"
            label="Mật khẩu hiện tại"
            defaultValue={""}
            InputProps={{
              endAdornment: (
                <IconButton onClick={hanldeVisibilityOld}>
                  <VisibilityOffIcon></VisibilityOffIcon>
                </IconButton>
              ),
            }}
            error={hasError("passwordOld")}
            helperText={
              hasError("passwordOld")
                ? validation.errors.passwordOld?.[0]
                : null
            }
          ></CssTextField>
          <CssTextField
            type={visibilityStateNew ? "text" : "password"}
            name="passwordNew"
            label="Mật khẩu mới"
            onChange={handleChange}
            defaultValue={""}
            InputProps={{
              endAdornment: (
                <IconButton onClick={hanldeVisibilityNew}>
                  <VisibilityOffIcon></VisibilityOffIcon>
                </IconButton>
              ),
            }}
            error={hasError("passwordNew")}
            helperText={
              hasError("passwordNew")
                ? validation.errors.passwordNew?.[0]
                : null
            }
          ></CssTextField>
          <CssTextField
            onChange={handleChange}
            name="confirmPassword"
            type={visibilityStateConfirm ? "text" : "password"}
            label="Xác nhận mật khẩu"
            defaultValue={""}
            InputProps={{
              endAdornment: (
                <IconButton onClick={hanldeVisibilityConfirm}>
                  <VisibilityOffIcon></VisibilityOffIcon>
                </IconButton>
              ),
            }}
            error={hasError("confirmPassword")}
            helperText={
              hasError("confirmPassword")
                ? validation.errors.confirmPassword?.[0]
                : null
            }
          ></CssTextField>
          <Stack className="mx-auto" direction="row" spacing={3}>
            <button
              className=" rounded-full p-1 text-rose-300 hover:scale-110"
              onClick={handleBack}
            >
              QUAY VỀ
            </button>
            <Button
              className="bg-rose-300 text-slate-50 hover:bg-rose-500 rounded-full"
              onClick={handleUpdatePassword}
            >
              Lưu mật khẩu
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Dialog open={openDialogError} onClose={() => setOpenDialogError(false)}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <img
            style={{ width: 150, margin: "auto", display: "block" }}
            src={require("../../../assets/warning.png")}
            alt=""
          />

          <Typography sx={{color:"red"}}>Mật khẩu cũ không đúng</Typography>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialogDuplicate}
        onClose={() => setOpenDialogDuplicate(false)}
      >
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <img
            style={{ width: 150, margin: "auto", display: "block" }}
            src={require("../../../assets/warning.png")}
            alt=""
          />

          <Typography  sx={{color:"red"}}>Mật khẩu không thể trùng với mật khẩu cũ</Typography>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialogSuccess}
        onClose={handleLogout}
      >
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <img
            style={{ width: 150, margin: "auto", display: "block" }}
            src={require("../../../assets/stickSuccess.gif")}
            alt=""
          />

          <Typography>Thay đổi mật khẩu thành công, vui lòng đăng nhập lại</Typography>
          <Button id="idButton1" onClick={handleLogout}>Đóng</Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
export default ChangePassword;
