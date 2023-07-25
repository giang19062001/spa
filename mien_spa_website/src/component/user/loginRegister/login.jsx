
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  Dialog,
  DialogContent,
  Typography,
  Stack,
  Box,
  Button,
  Snackbar,
  Alert,
  LinearProgress,
  IconButton,
  DialogTitle
} from "@mui/material";
import "../../../css/loginRegister.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  selectCheckSuccess,
  selectError,
  selectLoading,
} from "../../../redux/auth/authSelector";
import { turnOffError, turnOffRegisterSuccess } from "../../../redux/auth/userReducer";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CssTextField } from "../../../util/custom";
import validate from "validate.js";
import FormEmail from "./formEmail";
import { schemaLogin } from "../../../util/validate";
import { selectReset } from "../../../redux/otp/otpSelector";
import { turnOffAlertResetPasswordSuccess } from "../../../redux/otp/otpReducer";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alertSuccess = useSelector(selectCheckSuccess);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const resetPassword = useSelector(selectReset)

  const [openFormEmail, setOpenFormEmail] = useState(false);
  const [visibilityState,setVisibilityState] = useState(false)
  
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  const hanldeVisibility = ()=> {
    if(visibilityState === false){
      setVisibilityState(true)
    }else{
      setVisibilityState(false)
    }
  }

  const handleCloseFormLogin = () => {
    dispatch(turnOffError())
    props.parentCallbackLogin();
  };
  const handleOpenFormRegister = () => {
    props.parentCallbackRegister();
  };

  const handleOpenFormOtpEmail = () => {
    setOpenFormEmail(true);
  };
  const handelCloseFormEmail = () => {
    setOpenFormEmail(false);
  };

  const hanldeCloseDialogRegiterSuccess = () =>{
    dispatch(turnOffRegisterSuccess());
  }
  const hanldeCloseDialogChangePasswordSuccess = () =>{
    dispatch(turnOffAlertResetPasswordSuccess());

  
  }
  useEffect(()=>{
     dispatch(turnOffError())
  },[])

  // validation
  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });

  useEffect(() => {
    const errors = validate.validate(dataLogin, schemaLogin);
    setValidation((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataLogin]);

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  const handleChange = (event) => {
    setDataLogin((preState) => ({
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

  const handleLogin = () => {
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        password: true,
        email: true,
      },
    }));
    if (validation.isvalid === true) {
      dispatch(login({ dataLogin }))
      .then((res)=>{
        if(!res.error){
          if (res.payload.roles?.length >= 2) {
            navigate('/admin')
          } else {
            navigate(0)
          }
        }
        
      })
    }
  };

  console.log("isloadding",loading)
  return (
    <>
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={props.openValue}
      onClose={handleCloseFormLogin}
    >
      <DialogContent>
        <Stack spacing={3}>
          <Box id="idFormLoginRegister">
            <Typography
              id="idTypographyLoginRegister"
              align="center"
              variant="h5"
            >
              Đăng nhập
            </Typography>
          </Box>

          {/* <Stack
            direction="row"
            spacing={2}
            style={{ display: "block", margin: "auto" }}
          >
            <IconButton id="idIconSocial">
              <GoogleIcon></GoogleIcon>
            </IconButton>
            <IconButton id="idIconSocial">
              <FacebookIcon></FacebookIcon>
            </IconButton>
          </Stack> */}
          {/* <Typography align="center">
            <small>Hoặc đăng nhập tài khoản Miên Spa</small>
          </Typography> */}

          <CssTextField
            fullWidth
            label="Email"
            type="text"
            name="email"
            onChange={handleChange}
            error={hasError("email")}
            helperText={hasError("email") ? validation.errors.email?.[0] : null}
          />
          <CssTextField
            fullWidth
            label="Mật khẩu"
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
          />
          {loading === true ? (
            <Box sx={{ width: "100%",marginY:5 }}>
              <LinearProgress />
            </Box>
          ) : null}
          {error === true ? (
            <Alert align="center" severity="error" >
              Email hoặc mật khẩu không chính xác
            </Alert>
          ) : null}
          <Button id="idButton1" onClick={handleLogin} disabled={loading}>
            ĐĂNG NHẬP
          </Button>

          <button
            type="submit"
            onClick={handleOpenFormOtpEmail}
            style={{
              display: "block",
              margin: "0 auto",
              color: "#009EFF",
              marginTop: 20,
            }}
          >
            Quên mật khẩu
          </button>

          <Typography align="center">
            <small>Nếu chưa có tài khoản xin hãy đăng ký</small>
          </Typography>
          <Button
            id="idButton2"
            onClick={() => {
              handleCloseFormLogin();
              handleOpenFormRegister();
            }}
          >
            ĐĂNG KÝ
          </Button>
        </Stack>
      </DialogContent>
      {openFormEmail === true ? (
        <FormEmail
          parentCallbackEmail={handelCloseFormEmail}
        ></FormEmail>
      ) : null}

      <Dialog open={alertSuccess} onClose={hanldeCloseDialogRegiterSuccess}>
            <DialogTitle>
                Thông báo
            </DialogTitle>
           <DialogContent>
           <img style={{width:150,margin:"auto",display:"block"}} src={require("../../../assets/stickSuccess.gif")} alt=""/>

               <Typography>Đăng ký tài khoản thành công</Typography>
               <Button id="idButton1" onClick={hanldeCloseDialogRegiterSuccess}> Đóng</Button>

           </DialogContent>
     </Dialog>
 
     <Dialog open={resetPassword} onClose={hanldeCloseDialogChangePasswordSuccess}>
            <DialogTitle>
                Thông báo
            </DialogTitle>
           <DialogContent>
           <img style={{width:150,margin:"auto",display:"block"}} src={require("../../../assets/stickSuccess.gif")} alt=""/>

               <Typography> Thay đổi mật khẩu thành công </Typography>
               <Button id="idButton1" onClick={hanldeCloseDialogChangePasswordSuccess}> Đóng</Button>

           </DialogContent>
     </Dialog>
   
    </Dialog>
 
    </>
  );
};
export default Login;
