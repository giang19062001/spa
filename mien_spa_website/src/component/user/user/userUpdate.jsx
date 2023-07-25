import { useEffect, useState, useRef } from "react";
import {
  Avatar,
  Container,
  Grid,
  Stack,
  Paper,
  Button,
  FormGroup,
  FormControlLabel,
  Box,
  CircularProgress,
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../../../css/user.scss";
import OrderProComponent from "./orderPro";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/auth/userReducer";
import { useNavigate } from "react-router-dom";
import { selectLoading, selectUser } from "../../../redux/auth/authSelector";
import { fetchUserById, updateUser } from "../../../redux/auth/authThunk";
import { OderSerComponent } from "./orderSer";
import {
  convertBase64,
  CssSwitch,
  CssTextField,
  date,
} from "../../../util/custom";
import validate from "validate.js";
import { schemaUser } from "../../../util/validate";



const UserUpdate = (props) => {
 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [userUpdate, setUserUpdate] = useState({
    ...user,
    updatedAt: Date.parse(date),
  });

  const [dialogSuccess, setDialogSuccess] = useState(false);
  const [baseImage, setBaseImage] = useState(null);

  useEffect(() => {
    dispatch(fetchUserById(user?.usId));
  }, [user?.usImage, dispatch, user?.usId]);

  const hanldeChangeOpenFormPassword = () => {
    props.callbackOpenChangePassword();
  };
  const handleCloseDialogSuccess = () => {
    setDialogSuccess(false);
  };
  const handlePhoto = async (event) => {
    const files = event.target.files;
    const base64 = await convertBase64(files[0]);
    setBaseImage(base64);
    setUserUpdate((preState) => ({
      ...preState,
      usImage: files[0],
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleUpdate = () => {
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        usUserName: true,
        usDob: true,
        usPhoneNo: true,
        usAddress: true,
      },
    }));
    if (validation.isvalid === true) {
      dispatch(updateUser(userUpdate)).then((res) => {
        dispatch(fetchUserById(res.payload.usId));
        setDialogSuccess(true);
      });
    }
  };

  // validation
  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  useEffect(() => {
    const errors = validate.validate(userUpdate, schemaUser);
    setValidation((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [userUpdate]);

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  const handleChange = (event) => {
    setUserUpdate((preState) => ({
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

  //address
  const autoCompleteRef = useRef();
  const valueDirection = useRef();
  const options = {
    componentRestrictions: { country: "vn" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      valueDirection.current,
      options
    );
  }, []);


  console.log("userUpdate", userUpdate);

  return (
    <Container sx={{ paddingY: 5 }}>
      <Paper elevation={8} sx={{ padding: 5 }}>
        <Grid container spacing={6}>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Stack id="idBoxUser" spacing={2}>
              <Avatar
                alt=""
                className="w-60 h-60 mx-auto"
                src={baseImage ? baseImage : user?.usImage}
              />

              <label
                for="usImage"
                className="bg-sky-500 text-slate-50 rounded-full p-2 w-24 mx-auto hover:cursor-pointer hover:scale-105"
              >
                Chọn ảnh
              </label>
              <input id="usImage" type="file" onChange={handlePhoto} />
              <Button
                className="bg-red-600 text-slate-50 hover:bg-red-800 w-40 mx-auto "
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </Stack>
          </Grid>
          <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
            <Stack spacing={2}>
              <CssTextField
                defaultValue={userUpdate?.usUserName}
                type="text"
                label="Họ tên"
                name="usUserName"
                onChange={handleChange}
                error={hasError("usUserName")}
                helperText={
                  hasError("usUserName")
                    ? validation.errors.usUserName?.[0]
                    : null
                }
              ></CssTextField>
              <CssTextField
                defaultValue={userUpdate?.usDob}
                type="date"
                name="usDob"
                InputProps={{
                  inputProps: {
                    min: "1900-01-01",
                    max: new Date().toISOString().split("T")[0],
                  },
                }}
                onChange={handleChange}
                error={hasError("usDob")}
                helperText={
                  hasError("usDob") ? validation.errors.usDob?.[0] : null
                }
              ></CssTextField>
              <CssTextField
                defaultValue={userUpdate?.usPhoneNo}
                type="text"
                label="Số điện thoại"
                name="usPhoneNo"
                onChange={handleChange}
                error={hasError("usPhoneNo")}
                helperText={
                  hasError("usPhoneNo")
                    ? validation.errors.usPhoneNo?.[0]
                    : null
                }
              ></CssTextField>
                <CssTextField
                  defaultValue={userUpdate?.usAddress}
                  type="text"
                  label="Địa chỉ "
                  name="usAddress"
                  onBlur={handleChange}
                  fullWidth
                  inputRef={valueDirection}
                  error={hasError("usAddress")}
                  helperText={
                    hasError("usAddress")
                      ? validation.errors.usAddress?.[0]
                      : null
                  }
                />
             

              <Stack className="mx-auto" direction="row" spacing={3}>
                <Button
                  className="bg-rose-300 text-slate-50 hover:bg-rose-500 rounded-full"
                  onClick={handleUpdate}
                >
                  Lưu thay đổi
                </Button>
                <button
                  className="border-2 border-rose-300 rounded-full p-1 text-rose-300 hover:scale-110 "
                  onClick={hanldeChangeOpenFormPassword}
                >
                  <EditIcon></EditIcon>Thay đổi mật khẩu
                </button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Paper>


      <Dialog open={dialogSuccess} onClose={handleCloseDialogSuccess}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <img style={{width:150,margin:"auto",display:"block"}} src={require("../../../assets/stickSuccess.gif")} alt=""/>
          <Typography>Cập nhập thông tin thành công</Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default UserUpdate;
