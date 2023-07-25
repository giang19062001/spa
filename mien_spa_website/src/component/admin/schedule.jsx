import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Year,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { L10n, Internationalization } from "@syncfusion/ej2-base";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DataManager } from "@syncfusion/ej2-data";

import {
  BootstrapDialog,
  BootstrapDialogTitle,
  date,
  formatter,
} from "../../util/custom";
import "../../css/shedule.scss";
import {
  Backdrop,
  Button,
  CircularProgress,
  DialogContent,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Popover,
  IconButton,
  Stack,
  Typography,
  Avatar,
  Box,
  Dialog,
  DialogTitle,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { pink } from "@mui/material/colors";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/serce/serviceThunk";
import { selectListServices } from "../../redux/serce/serviceSelector";
import {  putOrderSer } from "../../redux/orderSer/orderThunk";
import { selectStatusOrderSer } from "../../redux/orderSer/orderSelector";
import { fetchUserByIdAdmin } from "../../redux/auth/authThunk";

L10n.load({
  "en-US": {
    schedule: {
      saveButton: "Lưu",
      cancelButton: "Đóng",
      deleteButton: "Xóa",
      newEvent: "THÊM SỰ KIỆN",
      editEvent: "CHỈNH SỬA SỰ KIỆN",
      save: "Thêm",
      moreDetails: "Chi tiết",
      addTitle: "Số điện thoại khách ",
      title: "Số điện thoại khách ",
      today: "Hôm nay",
      day: "Ngày",
      week: "Tuần",
      month: "Tháng",
      year: "Năm",
      start: "Thời gian bắt đầu",
      end: "Thời gian kết thúc",
    },
  },
});

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Schedule = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  //anchor
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  //anchor

  const [detail, setDetail] = React.useState();
  const [dataPut, setDataPut] = React.useState();
  const [dialogDetail, setDialogDetail] = React.useState(false);
  const [userDetail, setUserDetail] = React.useState();
  const [openDialogSuccess, setOpenDialogSuccess] = React.useState(false);

  const services = useSelector(selectListServices);
  const isLoading = useSelector(selectStatusOrderSer);
  const handleClose = () => {
    setDialogDetail(false);
  };
  const hanldeCloseDialogSuccess = () =>{
    setOpenDialogSuccess(false)
  }
  const handleFetchDetailUser = (id) => {
    dispatch(fetchUserByIdAdmin(id)).then((res) => {
      setUserDetail(res.payload);
    });
  };
  const handleFetchDetail = (data) => {
    setDetail(data);
    setDataPut(data);
    setDialogDetail(true);
  };
  const handelEdit = () => {
    const objPut = { ...dataPut, updatedAt: Date.parse(date) };
    dispatch(putOrderSer(objPut)).then(() => {
      setDialogDetail(false);
      setOpenDialogSuccess(true)
    });
  };

  const token = localStorage.getItem("token");

  let dataManagerOrder = new DataManager({
    url: "http://localhost:8181/api/OrdersSer",
    headers: [
      {
        Authorization: `Bearer ${token}`,
      },
    ],
  });

  const instance = new Internationalization();

  function getTimeString(value) {
    return instance.formatDate(value, { skeleton: "hm" });
  }

  const subjectLengthValidation = (args) => {
    return args["value"].length >= 8;
  };

  const subjectNumberValidation = (args) => {
    return args["value"].match("^[0-9]+$");
  };

  function eventTemplate(props) {
    return (
      <div
        className="template-wrap"
        style={{
          background:
            props.orSerStatus === "Đang tiến hành" ? "#facc15" : props.orSerStatus === "Đã hoàn thành" ? "#10b981" :"#ef4444",
        }}
      >
        <div className="subject">SĐT: {props.orSerPhoneNo}</div>
        <div className="time">
          {getTimeString(props.orSerStartTime)} -{" "}
          {getTimeString(props.orSerEndTime)}
        </div>
      </div>
    );
  }

  function onPopupOpen(args) {
    if (args.type === "Editor") {
      if (!args.data.Guid) {
        args.cancel = true;
      } else {
        args.cancel = true;
        handleFetchDetail(args.data);
      }
    }
  }

  const onPopupClose = (args) => {};

  let scheduleObj;

  console.log("dataPut", dataPut);

  return (
    <Paper>
      {isLoading === true ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
       <Dialog
                  open={openDialogSuccess}
                  onClose={hanldeCloseDialogSuccess}
                >
                  <DialogTitle>Thông báo</DialogTitle>
                  <DialogContent>
                    <img
                      style={{ width: 150, margin: "auto", display: "block" }}
                      src={require("../../assets/stickSuccess.gif")}
                      alt=""
                    />

                    <Typography>Cập nhập đơn hàng thành công</Typography>
                    <Button id="idButton1" onClick={hanldeCloseDialogSuccess}>
                      {" "}
                      Đóng
                    </Button>
                  </DialogContent>
                </Dialog>
      <BootstrapDialog onClose={handleClose} open={dialogDetail}>
        <BootstrapDialogTitle
          sx={{ background: "#fda4af", color: "white" }}
          onClose={handleClose}
        >
          CHỈNH SỬA
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {detail?.orSerStatus === "Đã hoàn thành" || detail?.orSerStatus === "Hủy lịch" ? (
            <table
              name="table-field"
              style={{ width: "100%", userSelect: "none" }}
            >
              <tr>
                <td className="e-textlabel">Mã lịch hẹn</td>
                <td>
                  <input
                    className="e-field e-input"
                    name="orSerId"
                    id="orSerId"
                    data-name="orSerId "
                    type="text"
                    value={detail?.orSerId}
                  />
                </td>
              </tr>
              <tr>
                <td className="e-textlabel">Mã khách hàng</td>
                <td>
                  <Stack direction={"row"}>
                    <input
                      className="e-field e-input"
                      name="orSerUserId"
                      id="orSerUserId"
                      data-name="orSerUserId "
                      type="text"
                      value={
                        detail?.orSerUserId
                          ? detail?.orSerUserId
                          : "Khách vãng lai"
                      }
                    />
                      {detail?.orSerUserId?(
                  <IconButton
                  onClick={(e) => {
                    handleClickAnchor(e);
                    handleFetchDetailUser(detail?.orSerUserId);
                  }}
                  >
                  <PersonSearchIcon></PersonSearchIcon>
                  </IconButton>
                    ):null}
                    <Popover
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleCloseAnchor}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <div style={{padding:20}}>
                        {userDetail?(
                          <div>
                            <Avatar
                            sx={{ width: 100, height: 100 }}
                            src={userDetail?.usImage && userDetail?.usImage}
                            />
                            <Typography align="justify" sx={{ marginY: 1 }}>
                            Họ tên: {userDetail?.usUserName}
                            </Typography>
                            <Typography align="justify" sx={{ marginY: 1 }}>
                            Email:{" "}
                            <b style={{ color: "#38bdf8" }}>
                              {userDetail?.usEmailNo}
                            </b>
                            </Typography>
                            <Typography align="justify" sx={{ marginY: 1 }}>
                            Ngày sinh: {userDetail?.usDob}
                            </Typography>
                            <Typography align="justify" sx={{ marginY: 1 }}>
                            Số điện thoại:{" "}
                            <b style={{ color: "#f43f5e" }}>
                              {" "}
                              {userDetail?.usPhoneNo}
                            </b>
                            </Typography>
                            <Typography align="justify" sx={{ marginY: 1 }}>
                            Địa chỉ: {userDetail?.usAddress}
                            </Typography>
                            </div>
                        ):(
                          <Box sx={{ display: 'flex' }}>
                          <CircularProgress />
                        </Box>
                        )}
                     
                      </div>
                      
                    </Popover>
                  </Stack>
                </td>
              </tr>
              <tr>
                <td className="e-textlabel">Số điện thoại</td>
                <td>
                  <input
                    style={{ fontWeight: "bold", color: "#f43f5e" }}
                    className="e-field e-input"
                    name="orSerPhoneNo"
                    id="orSerPhoneNo"
                    data-name="orSerPhoneNo "
                    type="text"
                    value={detail?.orSerPhoneNo}
                  />
                </td>
              </tr>

              <tr>
                <td className="e-textlabel">Thời gian </td>
                <td>
                  <DateTimePickerComponent
                    readOnly={true}
                    id="orSerStartTime"
                    name="orSerStartTime"
                    data-name="orSerStartTime"
                    value={new Date(detail?.orSerStartTime)}
                    format="dd/MM/yy hh:mm a"
                  ></DateTimePickerComponent>{" "}
                </td>
              </tr>

              <tr>
                <td className="e-textlabel">Tình trạng</td>
                <td>
               
                  {detail?.orSerStatus === "Đã hoàn thành"?(
                    <span
                    style={{
                      display: "flex",
                      gap: "15px",
                      color: "#10b981",
                      fontWeight: "bold",
                    }}
                  >
                    Đã hoàn thành
                  </span>
                  ):(
                    <span
                    style={{
                      display: "flex",
                      gap: "15px",
                      color: "#b91c1c",
                      fontWeight: "bold",
                    }}
                  >
                    Đã hủy
                  </span>
                  )}
                  <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
                </td>
              </tr>

              <tr>
                <td className="e-textlabel">Dịch vụ</td>
                <td id="dialog__td--gird">
                  {services.map((data, index) =>
                    detail?.listSerId?.indexOf(data?.seId) > -1 ? (
                      <p id="dialog__p--seName">{data.seName}</p>
                    ) : null
                  )}
                </td>
              </tr>
              <tr>
                <td className="e-textlabel">Tổng tiền </td>

                <td>
                  <b style={{ color: "red" }}>
                    {" "}
                    {formatter.format(detail?.orSer_Total)}
                  </b>
                </td>
              </tr>
            </table>
          ) : (
            <table
              name="table-field"
              style={{ width: "100%", userSelect: "none" }}
            >
              <tr>
                <td className="e-textlabel">Mã lịch hẹn</td>
                <td>
                  <input
                    className="e-field e-input"
                    name="orSerId"
                    id="orSerId"
                    data-name="orSerId "
                    type="text"
                    value={detail?.orSerId}
                  />
                </td>
              </tr>
              <tr>
                <td className="e-textlabel">Mã khách hàng</td>
                <td>
                <Stack direction={"row"}>
                    <input
                      className="e-field e-input"
                      name="orSerUserId"
                      id="orSerUserId"
                      data-name="orSerUserId "
                      type="text"
                      value={
                        detail?.orSerUserId
                          ? detail?.orSerUserId
                          : "Khách vãng lai"
                      }
                    />
                    {detail?.orSerUserId?(
                  <IconButton
                  onClick={(e) => {
                    handleClickAnchor(e);
                    handleFetchDetailUser(detail?.orSerUserId);
                  }}
                  >
                  <PersonSearchIcon></PersonSearchIcon>
                  </IconButton>
                    ):null}
                   
                    <Popover
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleCloseAnchor}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <div style={{padding:20}}>
                        {userDetail?(
                          <div>
                            <Avatar
                            sx={{ width: 100, height: 100 }}
                            src={userDetail?.usImage && userDetail?.usImage}
                            />
                            <Typography align="justify" sx={{ marginY: 1 }}>
                            Họ tên: {userDetail?.usUserName}
                            </Typography>
                            <Typography align="justify" sx={{ marginY: 1 }}>
                            Email:{" "}
                            <b style={{ color: "#38bdf8" }}>
                              {userDetail?.usEmailNo}
                            </b>
                            </Typography>
                            <Typography align="justify" sx={{ marginY: 1 }}>
                            Ngày sinh: {userDetail?.usDob}
                            </Typography>
                            <Typography align="justify" sx={{ marginY: 1 }}>
                            Số điện thoại:{" "}
                            <b style={{ color: "#f43f5e" }}>
                              {" "}
                              {userDetail?.usPhoneNo}
                            </b>
                            </Typography>
                            <Typography align="justify" sx={{ marginY: 1 }}>
                            Địa chỉ: {userDetail?.usAddress}
                            </Typography>
                            </div>
                        ):(
                          <Box sx={{ display: 'flex' }}>
                          <CircularProgress />
                        </Box>
                        )}
                     
                      </div>
                      
                    </Popover>
                  </Stack>
                </td>
              </tr>
              <tr>
                <td className="e-textlabel">Số điện thoại</td>
                <td>
                  <input
                    style={{ fontWeight: "bold", color: "#f43f5e" }}
                    className="e-field e-input"
                    name="orSerPhoneNo"
                    id="orSerPhoneNo"
                    data-name="orSerPhoneNo "
                    type="text"
                    value={detail?.orSerPhoneNo}
                  />
                </td>
              </tr>

              <tr>
                <td className="e-textlabel">Thời gian </td>
                <td>
                  <DateTimePickerComponent
                    id="orSerStartTime"
                    name="orSerStartTime"
                    data-name="orSerStartTime"
                    value={new Date(detail?.orSerStartTime)}
                    format="dd/MM/yy hh:mm a"
                    readOnly={true}
                  ></DateTimePickerComponent>{" "}
                </td>
              </tr>

              <tr>
                <td className="e-textlabel">Tình trạng</td>
                <td>
                  <span style={{ display: "flex", gap: "15px" }}>
                    <RadioGroup
                      row
                      name="orSerStatus"
                      defaultValue={detail?.orSerStatus}
                    >
                      <FormControlLabel
                        onChange={(e) =>
                          setDataPut((preState) => ({
                            ...preState,
                            orSerStatus: e.target.value,
                          }))
                        }
                        value="Đang tiến hành"
                        control={
                          <Radio
                            sx={{
                              color: pink[500],
                              "&.Mui-checked": {
                                color: pink[500],
                              },
                            }}
                          />
                        }
                        label="Đang tiến hành"
                      />

                      <FormControlLabel
                        onChange={(e) =>
                          setDataPut((preState) => ({
                            ...preState,
                            orSerStatus: e.target.value,
                          }))
                        }
                        value="Đã hoàn thành"
                        control={
                          <Radio
                            sx={{
                              color: pink[500],
                              "&.Mui-checked": {
                                color: pink[500],
                              },
                            }}
                          />
                        }
                        label="Đã hoàn thành"
                      />
                       <FormControlLabel
                        onChange={(e) =>
                          setDataPut((preState) => ({
                            ...preState,
                            orSerStatus: e.target.value,
                          }))
                        }
                        value="Hủy lịch"
                        control={
                          <Radio
                            sx={{
                              color: pink[500],
                              "&.Mui-checked": {
                                color: pink[500],
                              },
                            }}
                          />
                        }
                        label="Hủy lịch"
                      />
                    </RadioGroup>
                  </span>

                  <Divider sx={{ marginTop: 1, marginBottom: 2 }} />
                </td>
              </tr>

              <tr>
                <td className="e-textlabel">Dịch vụ</td>
                <td id="dialog__td--gird">
                  {services.map((data, index) =>
                    detail?.listSerId?.indexOf(data?.seId) > -1 ? (
                      <p id="dialog__p--seName">{data.seName}</p>
                    ) : null
                  )}
                </td>
              </tr>

              <tr>
                <td className="e-textlabel">Tổng tiền </td>

                <td>
                  <b style={{ color: "red" }}>
                    {" "}
                    {formatter.format(detail?.orSer_Total)}
                  </b>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Divider sx={{ marginTop: 3 }} />
                  <div id="dialog__td">
                   
                    <Button id="dialog__Button--Save" onClick={handelEdit}>
                      Lưu
                    </Button>
                  </div>
                </td>
              </tr>
            </table>
          )}
        </DialogContent>
      </BootstrapDialog>
      <ScheduleComponent
        width="100%"
        height="800px"
        readOnly={true}
        ref={(schedule) => (scheduleObj = schedule)}
        currentView="Month"
        selectedDate={new Date(date)}
        showQuickInfo={false}
        popupOpen={onPopupOpen}
        popupClose={onPopupClose}
        eventSettings={{
          dataSource: dataManagerOrder,
          template: eventTemplate,
          fields: {
            id: { name: "orSerId" },
            subject: {
              name: "orSerPhoneNo",
              validation: {
                required: true,
                minLength: [
                  subjectLengthValidation,
                  "Số điện thoại phải hơn 8 chữ số",
                ],
                regex: [
                  subjectNumberValidation,
                  "Số điện thoại chỉ có thể là số",
                ],
              },
            },
            startTime: {
              name: "orSerStartTime",
              validation: { required: true },
            },
            endTime: { name: "orSerEndTime", validation: { required: true } },
          },
        }}
      >
        <ViewsDirective>
          <ViewDirective option="Day" startHour="8:00" endHour="21:00" />
          <ViewDirective option="Week" startHour="8:00" endHour="21:00" />
          <ViewDirective option="Month" />
          <ViewDirective option="Year" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Year]} />
      </ScheduleComponent>
    </Paper>
  );
};
export default Schedule;
