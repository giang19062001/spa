import * as React from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
  Button,
  Typography,
  Stack,
  Box,
  FormHelperText,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
  DialogTitle,
} from "@mui/material";

import {
  blockServices,
  deleteServices,
  fetchServices,
  postService,
  putServices,
} from "../../redux/serce/serviceThunk";
import {
  selectListServices,
  selectStatusServices,
} from "../../redux/serce/serviceSelector";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";

import {
  convertBase64,
  CssTextField,
  date,
  formatter,
} from "../../util/custom";
import { validate } from "validate.js";
import { schemaService } from "../../util/validate";

const Service = (props) => {
  const dispatch = useDispatch();
  const services = useSelector(selectListServices);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [avatar, setAvatar] = React.useState();
  const [openDialogCreate, setOpenDialogCreate] = React.useState(false);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);

  const [dataCrud, setDataCrud] = React.useState({
    open: false,
    data: undefined,
    message: "",
    crud: "",
  });
  const [crudSuccess, setCrudSuccess] = React.useState({
    open: false,
    message: "",
  });

  const [dataPost, setDataPost] = React.useState({
    // seId: "",
    seName: "",
    sePrice: "",
    seDescription: "",
    seNote: "",
    seTurnOn: true,
    seImage: null,
    isDelete: false,
    createdAt: Date.parse(date),
  });
  const [dataPut, setDataPut] = React.useState({
    seId: "",
    seName: "",
    sePrice: "",
    seDescription: "",
    seNote: "",
    seTurnOn: true,
    seImage: null,
    isDelete: false,
    createdAt: Date.parse(date),
  });

  React.useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const statusSer = useSelector(selectStatusServices);

  const columns = [
    "Ảnh minh họa",
    "Mã sản phẩm",
    "Tên dịch vụ",
    "Gía dịch vụ",
    "",
  ];

  const hanldeCloseDialogCrud = () => {
    setDataCrud({ open: false, data: undefined, message: "", crud: "" });
  };
  const hanldeCloseDialogSuccess = () => {
    setCrudSuccess({ open: false, message: "" });
  };

  const handleClickOpenDialogCreate = () => {
    setOpenDialogCreate(true);
  };

  const handleCloseDialogCreate = () => {
    setAvatar(null);
    setOpenDialogCreate(false);
  };

  const handleClickOpenDialogEdit = (data) => {
    setDataPut(data);
    setOpenDialogEdit(true);
  };
  const handleCloseDialogEdit = () => {
    setAvatar(null);
    setOpenDialogEdit(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBlock = () => {
    dispatch(
      blockServices({ data: dataCrud.data, date: Date.parse(date) })
    ).then(() => {
      setDataCrud({ open: false, data: undefined, message: "", crud: "" });
      dispatch(fetchServices());
      setCrudSuccess({
        open: true,
        message: "Khóa/ mở khóa sản phẩm thành công",
      });
    });
  };
  const handleDelete = (data) => {
    dispatch(deleteServices({ data: data, date: Date.parse(date) })).then(
      () => {
        setDataCrud({ open: false, data: undefined, message: "", crud: "" });
        dispatch(fetchServices());
        setCrudSuccess({
          open: true,
          message: "Xóa dịch vụ thành công",
        });
      }
    );
  };

  const handleChangeImageCreate = async (e) => {
    const files = e.target.files;
    const base64 = await convertBase64(files[0]);
    setAvatar(base64);

    setDataPost((preState) => ({
      ...preState,
      seImage: files[0],
    }));
  };
  const handleChangeImageEdit = async (e) => {
    const files = e.target.files;
    const base64 = await convertBase64(files[0]);
    setAvatar(base64);
    setDataPut((preState) => ({
      ...preState,
      seImage: files[0],
    }));
  };

  //validate
  //validate post
  const [validationPost, setValidationPost] = React.useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  const [checkDupliSerPost, setCheckDupliSerPost] = React.useState(false);
  React.useEffect(() => {
    if (services?.some((ser) => ser?.seName === dataPost?.seName) === true) {
      setCheckDupliSerPost(true);
    } else {
      setCheckDupliSerPost(false);
    }
  }, [services, dataPost?.seName]);

  React.useEffect(() => {
    const errors = validate.validate(dataPost, schemaService);
    setValidationPost((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataPost]);

  const hasErrorPost = (field) => {
    return validationPost.touched[field] && validationPost.errors[field]
      ? true
      : false;
  };

  const handleChangeCreate = (event) => {
    setDataPost((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
    setValidationPost((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [event.target.name]: true,
      },
    }));
  };
  const handlePostSer = () => {
    if (validationPost.isvalid === true) {
      dispatch(postService(dataPost)).then(() => {
        setAvatar(null);
        setOpenDialogCreate(false);
        setValidationPost((pre) => ({
          ...pre,
          touched: {
            ...pre.touched,
            seName: true,
            seDescription: true,
            seNote: true,
            sePrice: true,
            seImage: true,
          },
        }));
        setCrudSuccess({
          open: true,
          message: "Thêm sản phẩm thành công",
        });
      });
      dispatch(fetchServices());
    }
  };

  //validate put
  const [validationPut, setValidationPut] = React.useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  const [checkDupliSerPut, setCheckDupliSerPut] = React.useState(false);
  React.useEffect(() => {
    if (
      services?.some(
        (ser) => ser?.seName === dataPut?.seName && ser?.seId !== dataPut?.seId
      ) === true
    ) {
      setCheckDupliSerPut(true);
    } else {
      setCheckDupliSerPut(false);
    }
  }, [dataPut?.seId, dataPut?.seName, services]);

  React.useEffect(() => {
    const errors = validate.validate(dataPut, schemaService);
    setValidationPut((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataPut]);

  const hasErrorPut = (field) => {
    return validationPut.touched[field] && validationPut.errors[field]
      ? true
      : false;
  };
  const handleChangeEdit = (event) => {
    setDataPut((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
    setValidationPut((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleEdit = () => {
    dispatch(putServices({ data: dataPut, date: Date.parse(date) })).then(
      () => {
        setAvatar(null);
        setOpenDialogEdit(false);
        setCrudSuccess({
          open: true,
          message: "Cập nhập sản phẩm thành công",
        });
        dispatch(fetchServices());
      }
    );
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginY: 2 }}>
      {statusSer === true ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Box>
          <Typography variant="h5" align="center" className="font-bold mb-4">
            Danh sách <b className="text-rose-600">dịch vụ</b>
          </Typography>

          <Button
            style={{ display: "block", margin: "auto" }}
            onClick={handleClickOpenDialogCreate}
            className=" text-lg capitalize text-rose-500 font-semibold transition ease-in-out delay-50 
        hover:-translate-y-1 hover:scale-110 duration-300 border-solid border-2 border-rose-500 rounded-xl"
          >
            Thêm dịch vụ
          </Button>
          <TableContainer sx={{ maxHeight: 1500, marginTop: 4 }}>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) =>
                    index === 4 ? (
                      <TableCell
                        key={index}
                        align="center"
                        className="bg-rose-600 text-slate-50"
                        colSpan={4}
                      >
                        {column}
                      </TableCell>
                    ) : (
                      <TableCell
                        key={index}
                        className="bg-rose-600 text-slate-50"
                      >
                        {column}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {services
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) =>
                    row?.isDelete === false ? (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <>
                          <TableCell>
                            <Avatar
                              variant="square"
                              className="w-36 h-36 rounded-lg"
                              src={
                                process.env.REACT_APP_API_URL +
                                "/image/service/" +
                                row.seImage
                              }
                              alt=""
                            />
                          </TableCell>
                          <TableCell className="">{row.seId}</TableCell>

                          <TableCell>{row.seName}</TableCell>
                          <TableCell className="text-red-500 font-bold">
                            {formatter.format(row.sePrice)}
                          </TableCell>

                          <TableCell>
                            <Button
                              className="bg-yellow-400 hover:bg-yellow-500 text-slate-50"
                              onClick={() => handleClickOpenDialogEdit(row)}
                            >
                              Cập nhập
                            </Button>
                          </TableCell>
                          {row.seTurnOn === false ? (
                            <TableCell>
                              <Button
                                className="bg-green-500 hover:bg-green-600 text-slate-50"
                                // onClick={() => handleBlock(row)}
                                onClick={() =>
                                  setDataCrud({
                                    open: true,
                                    data: row,
                                    message:
                                      "Bạn có chắc muốn mở khóa sản phẩm này",
                                    crud: "block",
                                  })
                                }
                              >
                                Mở khóa
                              </Button>
                            </TableCell>
                          ) : (
                            <TableCell>
                              <Button
                                className="bg-orange-500 hover:bg-orange-600 text-slate-50"
                                // onClick={() => handleBlock(row)}
                                onClick={() =>
                                  setDataCrud({
                                    open: true,
                                    data: row,
                                    message:
                                      "Bạn có chắc muốn khóa sản phẩm này",
                                    crud: "block",
                                  })
                                }
                              >
                                Khóa
                              </Button>
                            </TableCell>
                          )}
                          {/* <TableCell>
                            <Button
                              className="bg-red-500 hover:bg-red-600 text-slate-50"
                              // onClick={() => handleDelete(row)}
                              onClick={() =>
                                setDataCrud({
                                  open: true,
                                  data: row,
                                  message: "Bạn có chắc muốn xóa sản phẩm này",
                                  crud: "delete",
                                })
                              }
                            >
                              Xóa
                            </Button>
                          </TableCell> */}
                        </>
                      </TableRow>
                    ) : null
                  )}
                <Dialog open={dataCrud.open} onClose={hanldeCloseDialogCrud}>
                  <DialogTitle>Thông báo</DialogTitle>
                  <DialogContent>
                    <img
                      style={{ width: 150, margin: "auto", display: "block" }}
                      src={require("../../assets/warning.png")}
                      alt=""
                    />

                    <Typography>{dataCrud.message}</Typography>
                    {dataCrud.crud === "delete" ? (
                      <Button id="idButton1" onClick={handleDelete}>
                        {" "}
                        Xác nhận
                      </Button>
                    ) : dataCrud.crud === "block" ? (
                      <Button id="idButton1" onClick={handleBlock}>
                        {" "}
                        Xác nhận
                      </Button>
                    ) : null}
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={crudSuccess.open}
                  onClose={hanldeCloseDialogSuccess}
                >
                  <DialogTitle>Thông báo</DialogTitle>
                  <DialogContent>
                    <img
                      style={{ width: 150, margin: "auto", display: "block" }}
                      src={require("../../assets/stickSuccess.gif")}
                      alt=""
                    />

                    <Typography>{crudSuccess.message}</Typography>
                    <Button id="idButton1" onClick={hanldeCloseDialogSuccess}>
                      {" "}
                      Đóng
                    </Button>
                  </DialogContent>
                </Dialog>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={services.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
      {/* create */}
      {/* create */}
      {/* create */}
      {/* create */}
      {/* create */}
      {/* create */}
      {/* create */}
      {/* create */}

      <Dialog
        open={openDialogCreate}
        onClose={handleCloseDialogCreate}
        maxWidth={"md"}
        fullWidth
      >
        <DialogContent>
          <Stack spacing={2}>
            <Typography
              align="center"
              variant="h5"
              style={{ fontWeight: "bold", color: "#e11d48" }}
            >
              Dịch vụ
            </Typography>

            <CssTextField
              fullWidth
              type="text"
              label="Tên dịch vụ"
              name="seName"
              onChange={handleChangeCreate}
              error={hasErrorPost("seName") || checkDupliSerPost === true}
              helperText={
                hasErrorPost("seName")
                  ? validationPost.errors.seName?.[0]
                  : null || checkDupliSerPost === true
                  ? "Tên dịch vụ đã tồn tại"
                  : null
              }
            />
            <CssTextField
              fullWidth
              type="text"
              label="Gía dịch vụ"
              name="sePrice"
              onChange={handleChangeCreate}
              error={hasErrorPost("sePrice")}
              helperText={
                hasErrorPost("sePrice")
                  ? validationPost.errors.sePrice?.[0]
                  : null
              }
            />
            <CssTextField
              fullWidth
              type="text"
              label="Mô tả chi tiết dịch vụ"
              rows={4}
              multiline
              name="seDescription"
              onChange={handleChangeCreate}
              error={hasErrorPost("seDescription")}
              helperText={
                hasErrorPost("seDescription")
                  ? validationPost.errors.seDescription?.[0]
                  : null
              }
            />
            <CssTextField
              fullWidth
              type="text"
              label="Mô tả quy trình dịch vụ"
              name="seNote"
              rows={4}
              multiline
              onChange={handleChangeCreate}
              error={hasErrorPost("seNote")}
              helperText={
                hasErrorPost("seNote")
                  ? validationPost.errors.seNote?.[0]
                  : null
              }
            />
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <div>
                <Avatar
                  style={{ borderRadius: "30px", width: 300, height: 300 }}
                  alt=""
                  src={avatar && avatar}
                />
                <FormHelperText error={hasErrorPost("seImage")}>
                  {hasErrorPost("seImage")
                    ? validationPost.errors.seImage?.[0]
                    : null}
                </FormHelperText>
              </div>
              <label
                for="photo"
                style={{
                  backgroundColor: "#22d3ee",
                  color: "white",
                  borderRadius: "30px",
                  padding: 6,
                  cursor: "pointer",
                }}
              >
                Thêm ảnh
              </label>
            </Stack>
            <input
              style={{ display: "none" }}
              type="file"
              id="photo"
              name="photo"
              onChange={(e) => handleChangeImageCreate(e)}
              accept="image/png, image/jpg, image/jpeg"
            />
            {validationPost.isvalid === true && checkDupliSerPost === false ? (
              <Button id="idButton1" onClick={handlePostSer}>
                Thêm
              </Button>
            ) : (
              <Button id="idButtonDisable" disabled>
                Thêm
              </Button>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialogEdit}
        onClose={handleCloseDialogEdit}
        maxWidth={"md"}
        fullWidth
      >
        <DialogContent>
          <Stack spacing={2}>
            <Typography
              align="center"
              variant="h5"
              style={{ fontWeight: "bold", color: "#e11d48" }}
            >
              Dịch vụ
            </Typography>
            <CssTextField
              fullWidth
              type="text"
              label="Mã dịch vụ"
              name="seId"
              defaultValue={dataPut.seId}
              inputProps={{ readOnly: true }}
            />
            <CssTextField
              fullWidth
              type="text"
              label="Tên dịch vụ"
              name="seName"
              onChange={handleChangeEdit}
              defaultValue={dataPut.seName}
              error={hasErrorPut("seName") || checkDupliSerPut === true}
              helperText={
                hasErrorPut("seName")
                  ? validationPut.errors.seName?.[0]
                  : null || checkDupliSerPut === true
                  ? "Tên sản phẩm đã tồn tại"
                  : null
              }
            />
            <CssTextField
              fullWidth
              type="text"
              label="Gía dịch vụ"
              name="sePrice"
              onChange={handleChangeEdit}
              defaultValue={dataPut.sePrice}
              error={hasErrorPut("sePrice")}
              helperText={
                hasErrorPut("sePrice")
                  ? validationPut.errors.sePrice?.[0]
                  : null
              }
            />
            <CssTextField
              fullWidth
              type="text"
              label="Mô tả chi tiết dịch vụ"
              rows={4}
              multiline
              name="seDescription"
              onChange={handleChangeEdit}
              defaultValue={dataPut.seDescription}
              error={hasErrorPut("seDescription")}
              helperText={
                hasErrorPut("seDescription")
                  ? validationPut.errors.seDescription?.[0]
                  : null
              }
            />
            <CssTextField
              fullWidth
              type="text"
              label="Mô tả quy trình dịch vụ"
              name="seNote"
              rows={4}
              multiline
              onChange={handleChangeEdit}
              defaultValue={dataPut.seNote}
              error={hasErrorPut("seNote")}
              helperText={
                hasErrorPut("seNote") ? validationPut.errors.seNote?.[0] : null
              }
            />

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <div>
                <Avatar
                  sx={{ borderRadius: "30px", width: 300, height: 300 }}
                  alt=""
                  src={
                    avatar
                      ? avatar
                      : process.env.REACT_APP_API_URL +
                        "/image/service/" +
                        dataPut.seImage
                  }
                />
                <FormHelperText error={hasErrorPut("seImage")}>
                  {hasErrorPut("seImage")
                    ? validationPut.errors.seImage?.[0]
                    : null}
                </FormHelperText>
              </div>
              <label
                for="photo"
                style={{
                  backgroundColor: "#22d3ee",
                  color: "white",
                  borderRadius: "30px",
                  padding: 6,
                  cursor: "pointer",
                }}
              >
                Chỉnh sửa ảnh
              </label>
            </Stack>
            <input
              style={{ display: "none" }}
              type="file"
              id="photo"
              name="photo"
              onChange={(e) => handleChangeImageEdit(e)}
              accept="image/png, image/jpg, image/jpeg"
            />
            {validationPut.isvalid === true && checkDupliSerPut === false ? (
              <Button id="idButton1" onClick={handleEdit}>
                Lưu thay đổi
              </Button>
            ) : (
              <Button id="idButtonDisable" disabled>
                Lưu thay đổi
              </Button>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};
export default Service;
