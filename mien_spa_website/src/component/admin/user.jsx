import * as React from "react";

import {
  Paper,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  FormGroup,
  FormControl,
  FormLabel,
  Backdrop,
  CircularProgress,
  FormControlLabel,
  Dialog,
  DialogContent,
  Button,
  Stack,
  Checkbox,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectListRole,
  selectListUser,
  selectUser,
} from "../../redux/auth/authSelector";
import {
  fetchAllUser,
  fetchUserByIdAdmin,
  postRole,
} from "../../redux/auth/authThunk";
const columns = [
  "Avatar",
  "ID",
  "Email",
  "Họ tên",
  "Ngày sinh",
  "Số điện thoại",
  "Địa chỉ",
  "Chức vụ",
  "",
];

const User = () => {
  const users = useSelector(selectListUser);
  const user = useSelector(selectUser);
  const roles = useSelector(selectListRole);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialogUser, setOpenDialogUser] = React.useState(false);
  const [openDialogSuccess, setOpenDialogSuccess] = React.useState(false);

  const [userDetail, setUserDetail] = React.useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const hanldeCloseDialogSuccess = () => {
    setOpenDialogSuccess(false);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const hanldeCloseDialogUser = () => {
    setOpenDialogUser(false);
  };
  const handleOpenDetailUser = (id) => {
    dispatch(fetchUserByIdAdmin(id)).then((res) => {
      setUserDetail(res.payload);
      setOpenDialogUser(true);
    });
  };
  const hanldeChangeChecked = (event) => {
    const {
      target: { value },
    } = event;
    if (userDetail.listRole.includes(value)) {
      setUserDetail((preState) => ({
        ...preState,
        listRole: [...userDetail.listRole.filter((item) => item !== value)],
      }));
    } else {
      setUserDetail((preState) => ({
        ...preState,
        listRole: [...userDetail.listRole, value],
      }));
    }
  };
  const handlePostRole = () => {
    const obj = { usrUserId: userDetail.usId, listRole: userDetail.listRole };
    dispatch(postRole(obj)).then(() => {
      dispatch(fetchAllUser());
      setOpenDialogUser(false);
      setOpenDialogSuccess(true);
    });
  };


  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginY: 2 }}>
      <Typography variant="h5" align="center" className="font-bold mb-6">
        Danh sách <b className="text-rose-600">khách hàng</b>
      </Typography>

      <TableContainer sx={{ maxHeight: 2000, marginTop: 4 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} className="bg-rose-600 text-slate-50">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <>
                      <TableCell>
                        <Avatar
                          className="w-24 h-24"
                          src={
                            process.env.REACT_APP_API_URL +
                            "/image/allUser/" +
                            row?.usImage
                          }
                        />
                      </TableCell>
                      <TableCell className="text-rose-500 font-bold">
                        {row?.usId}
                      </TableCell>

                      <TableCell className="text-sky-500 ">
                        {row?.usEmailNo}
                      </TableCell>
                      <TableCell>{row?.usUserName}</TableCell>
                      <TableCell>{row?.usDob}</TableCell>
                      <TableCell className="text-red-600 font-bold ">
                        {row?.usPhoneNo}
                      </TableCell>
                      <TableCell>{row?.usAddress}</TableCell>
                      {row?.listRole?.includes("ROLE_ADMIN") &&
                      row?.listRole?.length >= 2 ? (
                        <TableCell>
                          <Typography
                            align="center"
                            className="bg-red-500 text-slate-50 font-bold rounded-lg p-2 text-sm"
                          >
                            Quản trị
                          </Typography>
                        </TableCell>
                      ) : row?.listRole?.length >= 2 && !row?.listRole?.includes("ROLE_ADMIN")  ? (
                        <TableCell>
                          <Typography
                            align="center"
                            className="bg-sky-500 text-slate-50 font-bold rounded-lg p-2 text-sm"
                          >
                            Nhân viên
                          </Typography>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Typography
                            align="center"
                            className="bg-green-500 text-slate-50 font-bold rounded-lg p-2 text-sm "
                          >
                            Khách
                          </Typography>
                        </TableCell>
                      )}
                      {
                      row.listRole?.includes("ROLE_ADMIN") ||  user.usId === row?.usId ? (
                        <TableCell>
                          <Button
                            className="bg-slate-400 hover:bg-slate-500 rounded-full text-slate-50 "
                            disabled={true}
                          >
                            Chỉnh sửa{" "}
                          </Button>
                        </TableCell>
                      ): (
                        <TableCell>
                          <Button
                            className="bg-yellow-400 hover:bg-yellow-500 rounded-full text-slate-50 "
                            onClick={() => handleOpenDetailUser(row?.usId)}
                          >
                            Chỉnh sửa{" "}
                          </Button>
                        </TableCell>
                      )}
                    </>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialogSuccess} onClose={hanldeCloseDialogSuccess}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <img
            style={{ width: 150, margin: "auto", display: "block" }}
            src={require("../../assets/stickSuccess.gif")}
            alt=""
          />

          <Typography>Cập nhập tài khoản người dùng thành công</Typography>
          <Button id="idButton1" onClick={hanldeCloseDialogSuccess}>
            {" "}
            Đóng
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialogUser}
        onClose={hanldeCloseDialogUser}
        maxWidth={"md"}
        fullWidth
      >
        <DialogContent>
          {userDetail ? (
            <div>
              <Stack direction={"row"} spacing={6} sx={{ padding: 5 }}>
                <Stack>
                  <Avatar
                    sx={{ width: 200, height: 200 }}
                    src={userDetail?.usImage && userDetail?.usImage}
                  />
                  <Typography align="justify" sx={{ marginY: 1 }}>
                    Họ tên: {userDetail?.usUserName}
                  </Typography>
                  <Typography align="justify" sx={{ marginY: 1 }}>
                    Email:{" "}
                    <b style={{ color: "#38bdf8" }}>{userDetail?.usEmailNo}</b>
                  </Typography>
                  <Typography align="justify" sx={{ marginY: 1 }}>
                    Ngày sinh: {userDetail?.usDob}
                  </Typography>
                  <Typography align="justify" sx={{ marginY: 1 }}>
                    Số điện thoại:{" "}
                    <b style={{ color: "#f43f5e" }}> {userDetail?.usPhoneNo}</b>
                  </Typography>
                  <Typography align="justify" sx={{ marginY: 1 }}>
                    Địa chỉ: {userDetail?.usAddress}
                  </Typography>
                  <Button id="idButton1" onClick={handlePostRole}>
                    Lưu chỉnh sửa
                  </Button>
                </Stack>
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                  onChange={hanldeChangeChecked}
                >
                  <FormLabel>Danh sách vai trò </FormLabel>
                  <FormGroup>
                    {roles.map((data, index) =>
                      data.roName === "ROLE_USER" ? (
                        <FormControlLabel
                          sx={{ padding: 1 }}
                          control={
                            <Checkbox
                              checked={true}
                              disabled
                              key={index}
                              value={data?.roName}
                              color={"primary"}
                            />
                          }
                          label={data?.roDisplayName}
                        />
                      ) : data.roName === "ROLE_ADMIN"  ? null : (
                        <FormControlLabel
                          sx={{ padding: 1 }}
                          control={
                            <Checkbox
                              defaultChecked={
                                userDetail?.listRole?.indexOf(data?.roName) > -1
                              }
                              key={index}
                              value={data?.roName}
                              color={"primary"}
                            />
                          }
                          label={data?.roDisplayName}
                        />
                      )
                    )}
                  </FormGroup>
                </FormControl>
              </Stack>
            </div>
          ) : (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </DialogContent>
      </Dialog>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default User;
