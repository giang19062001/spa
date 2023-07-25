import { Stack } from "@mui/material";
import { useState } from "react";
import { useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { validate } from "validate.js";
import { selectUser } from "../../../redux/auth/authSelector";
import { CssTextField } from "../../../util/custom";
import { schemaInforOrder } from "../../../util/validate";

const AutoComplete = (props) => {
  const user = useSelector(selectUser);

  const [InfoOrder, setInfoOrder] = useState({
    phone: user ? (user?.usPhoneNo !== null ? user?.usPhoneNo : "") : "",
    address: user ? (user?.usAddress !== null ? user?.usAddress : "") : "",
  });
  // validation

  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  useEffect(() => {
    const errors = validate.validate(InfoOrder, schemaInforOrder);
    setValidation((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [InfoOrder]);

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  const handleChangePhone = (e) => {
    setInfoOrder((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [e.target.name]: true,
      },
    }));
  };

  const autoCompleteRef = useRef();
  const valueDirection = useRef();
  const center = { lat: 10.796687731757233, lng: 106.69188576830778 };
  // const defaultBounds = {
  //   north: center.lat + 0.3,
  //   south: center.lat - 0.3,
  //   east: center.lng + 0.3,
  //   west: center.lng - 0.3,
  // };
  const options = {
    // bounds: defaultBounds,

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
  const calculateRoute = async (e) => {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin:
        "17 Đường Miếu Nổi, Phường 7, Phú Nhuận, Thành phố Hồ Chí Minh, Việt Nam",

      destination: valueDirection.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    let khoangcachFinal = 0;
    const khoangcach = results.routes[0].legs[0].distance.text.split(/\s/)?.[0]; // chuyển doi
    if (khoangcach.includes(",")) {
      khoangcachFinal = Math.ceil(Number(khoangcach.replace(",", ".")));
    } else {
      khoangcachFinal = Math.ceil(Number(khoangcach));
    }

    props.parentCallbackMap({
      distance: results.routes[0].legs[0].distance.text,
      address: valueDirection.current.value,
      ship: 5000 * khoangcachFinal,
    });
  };

  useEffect(() => {
    props.parentCallbackPhone({
      phone: InfoOrder.phone,
      message: validation.errors.phone?.[0],
    });
  }, [InfoOrder.phone, validation.errors.phone, validation.isvalid]);
  useEffect(() => {
    props.parentCallbackMapValidate({
      address: InfoOrder?.address,
      message: validation.errors.address?.[0],
    });
  }, [InfoOrder.address, validation.errors.address, validation.isvalid]);

  useEffect(() => {
    if (user) {
      if (user?.usAddress !== null) {
        valueDirection.current.value = user?.usAddress;
        calculateRoute();
      }
    }
  }, [user]);
  useEffect(() => {
    if (InfoOrder?.address === "") {
      props.parentCallbackMap({
        distance: "0 km",
        address: "",
        ship: 0,
      });
    } else {
      props.parentCallbackMapStateAddress({
        address: InfoOrder?.address,
      });
    }
  }, [InfoOrder?.address]);

  console.log("InfoOrder", InfoOrder);
  return (
    <div>
      <Stack
        direction={"column"}
        justifyContent="center"
        spacing={2}
        className="my-6"
      >
        <CssTextField
          defaultValue={
            user ? (user?.usAddress !== null ? user?.usAddress : "") : ""
          }
          type="text"
          label="Địa chỉ giao hàng"
          fullWidth
          name="address"
          inputRef={valueDirection}
          onBlur={(e) => {
            setInfoOrder((preState) => ({
              ...preState,
              [e.target.name]: valueDirection.current?.value,
            }));
            setValidation((pre) => ({
              ...pre,
              touched: {
                ...pre.touched,
                [e.target.name]: true,
              },
            }));
            calculateRoute();
          }}
          error={hasError("address")}
          helperText={
            hasError("address") ? validation.errors.address?.[0] : null
          }
        />
        <CssTextField
          defaultValue={
            user ? (user?.usPhoneNo !== null ? user?.usPhoneNo : "") : ""
          }
          type="text"
          name="phone"
          label="Số điện thoại giao hàng"
          fullWidth
          onChange={(e) => handleChangePhone(e)}
          error={hasError("phone")}
          helperText={hasError("phone") ? validation.errors.phone?.[0] : null}
        ></CssTextField>
      </Stack>
    </div>
  );
};
export default AutoComplete;
