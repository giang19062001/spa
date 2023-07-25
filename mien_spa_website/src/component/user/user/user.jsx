import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CssSwitch } from "../../../util/custom";
import ChangePassword from "./changePassword";
import OrderProComponent from "./orderPro";
import { OderSerComponent } from "./orderSer";
import UserUpdate from "./userUpdate";
import { useJsApiLoader } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { selectLoading } from "../../../redux/auth/authSelector";
const User = () => {
  //map

  const loading = useSelector(selectLoading);

  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [choose, setChoose] = useState(false);
  const [openFormPass, setOpenFormPass] = useState(false);
  const handleOpenFormPass = () => {
    if (openFormPass === false) {
      setOpenFormPass(true);
    } else {
      setOpenFormPass(false);
    }
  };

  const hanldeChangeChoose = () => {
    if (choose === false) {
      setChoose(true);
    } else {
      setChoose(false);
    }
  };

  console.log("isLoading", loading);

  return (
    <Container>
      {loading === true ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      {loading === true ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      {openFormPass === true ? (
        <ChangePassword callbackOpenUser={handleOpenFormPass}></ChangePassword>
      ) : isLoaded ? (
        <UserUpdate
          callbackOpenChangePassword={handleOpenFormPass}
        ></UserUpdate>
      ) : null}

      <Box sx={{ marginTop: 5, padding: 2 }}>
        <FormGroup className="flex flex-row  items-center justify-evenly">
          {choose === true ? (
            <>
              <p onClick={hanldeChangeChoose} id="idPUser">
                Danh sách đơn hàng
              </p>
              <FormControlLabel
                control={
                  <CssSwitch
                    sx={{ m: 1 }}
                    onChange={hanldeChangeChoose}
                    checked={choose}
                  />
                }
              />

              <p
                style={{ color: "#FDA4AF" }}
                id="idPUser"
                onClick={hanldeChangeChoose}
              >
                Danh sách lịch đặt dịch vụ
              </p>
            </>
          ) : (
            <>
              <p
                style={{ color: "#FDA4AF" }}
                id="idPUser"
                onClick={hanldeChangeChoose}
              >
                Danh sách đơn hàng
              </p>
              <FormControlLabel
                control={
                  <CssSwitch
                    sx={{ m: 1 }}
                    onChange={hanldeChangeChoose}
                    checked={choose}
                  />
                }
              />

              <p id="idPUser" onClick={hanldeChangeChoose}>
                Danh sách lịch đặt dịch vụ
              </p>
            </>
          )}
        </FormGroup>
        {choose !== true ? (
          <OrderProComponent></OrderProComponent>
        ) : (
          <OderSerComponent></OderSerComponent>
        )}
      </Box>
    </Container>
  );
};

export default User;
