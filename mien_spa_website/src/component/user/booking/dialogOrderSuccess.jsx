import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectCheckSuccess } from "../../../redux/orderSer/orderSelector";

import React from "react";
import { offSuccess } from "../../../redux/orderSer/orderReducer";
import { selectUser } from "../../../redux/auth/authSelector";
import { useNavigate } from "react-router-dom";
import { clearCartServices } from "../../../redux/serce/serviceReducer";

const DialogOrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
    const user = useSelector(selectUser)
  const checkSuccessOrder = useSelector(selectCheckSuccess);

  const handleOff = () => {
    dispatch(offSuccess());
    dispatch(clearCartServices())
    if(user){
      navigate(`/user/${user?.usId}`)

    }else{
      navigate(`/`)

    }

  };

  return (
    <Dialog open={checkSuccessOrder} onClose={handleOff}>
      <DialogContent>
        <img
          src={require("../../../assets/thank.jpg")}
          alt=""
          width={450}
          style={{ display: "block", margin: "auto" }}
        ></img>
        <p
          align="center"
          style={{
            fontWeight: "bold",
            marginTop: 15,
            backgroundColor: "#fb7185",
            color: "white",
            borderRadius: 30,
            padding: 10,
          }}
        >
          Đặt lịch thành công. Miên spa sẽ liên hệ cho quý khách sau
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default DialogOrderSuccess;
