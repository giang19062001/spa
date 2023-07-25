import {
  Typography,
  Stack,
  Box,
  Button,
  LinearProgress,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import "../../../css/loginRegister.scss";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser, register } from "../../../redux/auth/authThunk";
import {
  selectLoading,
  selectListUser,
} from "../../../redux/auth/authSelector";
import { CssTextField } from "../../../util/custom";
import validate from "validate.js";
import { useEffect } from "react";
import { schemaRegister } from "../../../util/validate";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const Register = (props) => {
  const loading = useSelector(selectLoading);

  const [dataRegister, setDataRegister] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const [visibilityState,setVisibilityState] = useState(false)
  const [visibilityStateConfirm,setVisibilityStateConfirm] = useState(false)

  const hanldeVisibility = ()=> {
    if(visibilityState === false){
      setVisibilityState(true)
    }else{
      setVisibilityState(false)
    }
  }
  
  const hanldeVisibilityConfirm = ()=> {
    if(visibilityStateConfirm === false){
      setVisibilityStateConfirm(true)
    }else{
      setVisibilityStateConfirm(false)
    }
  }

  const handleCloseFormRegister = () => {
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        username: false,
        password: false,
        email: false,
        confirmPassword: false,
      },
    }));
    props.parentCallbackRegister();
  };
  const handleOpenFormLogin = () => {
    props.parentCallbackLogin();
  };

  const hanldeRegister = () => {
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        username: true,
        password: true,
        email: true,
        confirmPassword: true,
      },
    }));
    if (validation.isvalid === true ) {
      dispatch(register(dataRegister)).then(() => {
        handleOpenFormLogin();
        handleCloseFormRegister();
      });
    }
  };

  // validation

  const [checkUserExist, setCheckUserExist] = useState(false);
  const listUser = useSelector(selectListUser);
  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  // useEffect(() => {
  //   if(!validPassword.test(dataRegister?.password)){
  //     setCheckPassword(true)
  //   }else{
  //     setCheckPassword(false)
  //   }
  // }, [dataRegister?.password]);

  useEffect(() => {
    const check = listUser?.some(
      (LUser) => LUser.usEmailNo === dataRegister.email
    );
    if (check === true) {
      setCheckUserExist(true);
    } else if (check === false) {
      setCheckUserExist(false);
    }
  }, [checkUserExist, dataRegister, listUser]);
  useEffect(() => {
    const errors = validate.validate(dataRegister, schemaRegister);
    setValidation((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataRegister]);

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  const handleChange = (event) => {
    setDataRegister((preState) => ({
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


  return (
    <Dialog
      open={props.openValue}
      onClose={handleCloseFormRegister}
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <Box
          id="idFormLoginRegister"
          style={{ padding: "1px", marginBottom: "15px" }}
        >
          <Typography
            id="idTypographyLoginRegister"
            align="center"
            variant="h5"
          >
            Đăng Ký
          </Typography>
        </Box>

        <Stack spacing={2} sx={{ marginBottom: 5 }}>
          <CssTextField
            fullWidth
            type="text"
            label="Email"
            name="email"
            onChange={handleChange}
            error={hasError("email") || checkUserExist === true}
            helperText={
              hasError("email")
                ? validation.errors.email?.[0]
                : null || checkUserExist === true
                ? "Email đã được đăng ký"
                : null
            }
          />
          <CssTextField
            fullWidth
            type="text"
            label="Họ tên"
            name="username"
            onChange={handleChange}
            error={hasError("username")}
            helperText={
              hasError("username") ? validation.errors.username?.[0] : null
            }
          />
          <CssTextField
            fullWidth
            type={visibilityState ? "text" : "password"}
            label="Mật khẩu"
            id="password"
            name="password"
            onChange={handleChange}
            error={hasError("password") }
            helperText={
              hasError("password")
                ? validation.errors.password?.[0]
                
                : null
            }
            InputProps={{
              endAdornment: (
                <IconButton onClick={hanldeVisibility}>
                <VisibilityOffIcon></VisibilityOffIcon>
              </IconButton>
              ),
            }}
          />
         
          <CssTextField
            fullWidth
            type={visibilityStateConfirm ? "text" : "password"}
            id="password"
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            onChange={handleChange}
            error={hasError("confirmPassword")}
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
          />
        </Stack>
        {loading === true ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : null}
        <Button id="idButton1" onClick={hanldeRegister} disabled={loading}>
          ĐĂNG KÝ
        </Button>
        <Typography align="center" sx={{ marginTop: 2 }}>
          <small>Nếu đã có tài khoản xin hãy đăng nhập</small>
        </Typography>
        <Button
          id="idButton2"
          onClick={() => {
            handleOpenFormLogin();
            handleCloseFormRegister();
          }}
        >
          ĐĂNG NHẬP
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default Register;
