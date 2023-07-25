import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/authSelector";
import { validate } from "validate.js";
import { schemaInforBooking } from "../../../util/validate";

const Phone = (props) => {
  const user = useSelector(selectUser);
  const [InforBooking, setInforBooking] = useState({
    phone: user ? (user?.usPhoneNo !== null ? user?.usPhoneNo : "") : "",
  });


  // validation
  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  useEffect(() => {
    const errors = validate.validate(InforBooking, schemaInforBooking);
    setValidation((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [InforBooking]);

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  const handleChange = (e) => {
    setInforBooking({ phone: e.target.value });
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [e.target.name]: true,
      },
    }));
  };

  useEffect(() => {
    props.parentCallback({
      phone: InforBooking.phone,
      validate: validation.isvalid ,
      message: validation.errors.phone?.[0]
    });
  }, [InforBooking, validation.errors.phone, validation.isvalid]);

  return (
    <Box className="flex space-x-2">
      <TextField
        type="text"
        label="Vui lòng nhập số điện thoại"
        fullWidth
        name="phone"
        defaultValue={InforBooking.phone}
        onChange={handleChange}
        error={hasError("phone")}
        helperText={hasError("phone") ? validation.errors.phone?.[0] : null}
      ></TextField>
    </Box>
  );
};
export default Phone;
