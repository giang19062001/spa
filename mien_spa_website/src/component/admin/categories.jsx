import * as React from "react";

import {
  Button,
  Typography,
  Stack,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  DialogContent,
  Dialog,
  CircularProgress,
  LinearProgress,
  Backdrop,
  DialogTitle,
} from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  postCategories,
  putCategories,
} from "../../redux/category/cateThunk";
import { selectStatusCate } from "../../redux/category/cateSelector";
import { CssTextField, date } from "../../util/custom";
import { validate } from "validate.js";
import { shemaCate } from "../../util/validate";

const columns = ["Mã thể loại", "Tên thể loại", "Ngày tạo thể loại", ""];

const Categories = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDialogCreate, setOpenDialogCreate] = React.useState(false);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
    const [crudSuccess, setCrudSuccess] = React.useState({
      open: false,
      message: "",
    });

  const [dataListCate, setDataListCate] = React.useState([]);
  const [dataPost, setDataPost] = React.useState({
    cateIdParent: 0,
    cateName: "",
    isDelete: false,
    createdAt: Date.parse(date),
  });
  const [dataPut, setDataPut] = React.useState({
    cateId: 0,
    cateIdParent: 0,
    cateName: "",
    isDelete: false,
  });

  const isLoading = useSelector(selectStatusCate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories()).then((res) => {
      setDataListCate(res.payload);
    });
  }, [dispatch]);

  const hanldeCloseDialogSuccess = () => {
    setCrudSuccess({ open: false, message: "" });
  };
  const handleClickOpenDialogCreate = () => {
    setOpenDialogCreate(true);
  };

  const handleCloseDialogCreate = () => {
    setOpenDialogCreate(false);
    setDataPost((preState) => ({
      ...preState,
      cateName: "",
    }));
  };
  const handleClickOpenDialogEdit = (data) => {
    setDataPut(data);
    setOpenDialogEdit(true);
  };

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //validate
  // validation
  const [checkDuplicatePost, setCheckDuplicatePost] = React.useState(false);
  useEffect(() => {
    if (
      dataListCate?.some((cate) => cate?.cateName === dataPost?.cateName) ===
      true
    ) {
      setCheckDuplicatePost(true);
    } else {
      setCheckDuplicatePost(false);
    }
  }, [dataListCate, dataPost?.cateName]);
  const [checkDuplicatePut, setCheckDuplicatePut] = React.useState(false);
  useEffect(() => {
    if (
      dataListCate?.some(
        (cate) =>
          cate?.cateName === dataPut?.cateName &&
          cate?.cateId !== dataPut?.cateId
      ) === true
    ) {
      setCheckDuplicatePut(true);
    } else {
      setCheckDuplicatePut(false);
    }
  }, [dataListCate, dataPut?.cateId, dataPut?.cateName]);

  const [validationPost, setValidationPost] = React.useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  const [validationPut, setValidationPut] = React.useState({
    touched: {},
    errors: {},
    isvalid: false,
  });

  useEffect(() => {
    const errors = validate.validate(dataPost, shemaCate);
    setValidationPost((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataPost]);
  useEffect(() => {
    const errors = validate.validate(dataPut, shemaCate);
    setValidationPut((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataPut]);

  const hasErrorPost = (field) => {
    return validationPost.touched[field] && validationPost.errors[field]
      ? true
      : false;
  };
  const hasErrorPut = (field) => {
    return validationPut.touched[field] && validationPut.errors[field]
      ? true
      : false;
  };

  const hanldeChangePost = (e) => {
    setDataPost((preState) => ({
      ...preState,
      cateName: e.target.value,
    }));
    setValidationPost((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [e.target.name]: true,
      },
    }));
  };
  const handlePostCate = () => {
    setValidationPost((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        cateName: false,
      },
    }));
    if (validationPost.isvalid === true) {
      dispatch(postCategories(dataPost)).then(() => {
        dispatch(fetchCategories()).then((res) => {
          setDataListCate(res.payload);
          setDataPost((preState) => ({
            ...preState,
            cateName: "",
          }));
        });
        setOpenDialogCreate(false);
        setCrudSuccess({
          open: true,
          message: "Thêm thể loại thành công",
        });
      });
    }
  };

  const handleChangePut = (e) => {
    setDataPut((preState) => ({
      ...preState,
      cateName: e.target.value,
    }));
    setValidationPut((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [e.target.name]: true,
      },
    }));
  };
  const handlePutCate = () => {
    setValidationPost((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        cateName: false,
      },
    }));
    if (validationPut.isvalid === true) {
      dispatch(putCategories({ ...dataPut, updatedAt: Date.parse(date) })).then(
        () => {
          dispatch(fetchCategories()).then((res) => {
            setDataListCate(res.payload);
          });
          setOpenDialogEdit(false);
          setCrudSuccess({
            open: true,
            message: "Cập nhập thể loại thành công",
          });
        }
      );
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginY: 2 }}>
      {isLoading === true ? (
         <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={true}
       >
         <CircularProgress color="inherit" />
       </Backdrop>
      ) : (
        <Box>
          <Typography variant="h5" align="center" className="font-bold mb-4">
            Danh sách <b className="text-rose-600">Thể loại</b>
          </Typography>
          <Button
            style={{ display: "block", margin: "auto" }}
            onClick={handleClickOpenDialogCreate}
            className=" text-lg capitalize text-rose-500 font-semibold transition ease-in-out delay-50 
            hover:-translate-y-1 hover:scale-110 duration-300 border-solid border-2 border-rose-500 rounded-xl"
          >
            Thêm thể loại
          </Button>
          <TableContainer sx={{ maxHeight: 1000, marginTop: 4 }}>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) =>
                    index === 3 ? (
                      <TableCell
                        key={index}
                        align="center"
                        className="bg-rose-600 text-slate-50"
                        colSpan={2}
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
                {dataListCate
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <>
                          <TableCell>
                            <p className="font-bold border-double  border-4 border-rose-300 rounded-lg p-2	w-10 ">
                              {row.cateId}
                            </p>
                          </TableCell>
                          <TableCell className="">{row.cateName}</TableCell>
                          <TableCell className="">
                            {new Date(row.createdAt).toLocaleString()}
                          </TableCell>

                          <TableCell>
                            <Button
                              className="bg-yellow-400 hover:bg-yellow-500 text-slate-50"
                              onClick={() => handleClickOpenDialogEdit(row)}
                            >
                              Cập nhập
                            </Button>
                          </TableCell>
                        </>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={dataListCate?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Dialog open={openDialogCreate} onClose={handleCloseDialogCreate}>
            <DialogContent>
              <Stack spacing={2}>
                <Typography
                  align="center"
                  variant="h5"
                  style={{ fontWeight: "bold", color: "#e11d48" }}
                >
                  Thể loại
                </Typography>
                <CssTextField
                  fullWidth
                  type="text"
                  label="Tên thể loại"
                  name="cateName"
                  onChange={(e) => hanldeChangePost(e)}
                  error={
                    hasErrorPost("cateName") || checkDuplicatePost === true
                  }
                  helperText={
                    hasErrorPost("cateName")
                      ? validationPost.errors.cateName?.[0]
                      : null || checkDuplicatePost === true
                      ? "Tên thể loại đã tồn tại"
                      : null
                  }
                />
                {validationPost.isvalid === true &&
                checkDuplicatePost === false ? (
                  <Button
                    id="idButton1"
                    style={{ marginTop: 10 }}
                    onClick={handlePostCate}
                  >
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
          <Dialog open={openDialogEdit} onClose={handleCloseDialogEdit}>
            <DialogContent>
              <Stack spacing={2}>
                <Typography
                  align="center"
                  variant="h5"
                  style={{ fontWeight: "bold", color: "#e11d48" }}
                >
                  Thể loại
                </Typography>
                <CssTextField
                  fullWidth
                  type="text"
                  label="Tên thể loại"
                  name="cateName"
                  value={dataPut.cateName}
                  onChange={(e) => handleChangePut(e)}
                  error={hasErrorPut("cateName") || checkDuplicatePut === true}
                  helperText={
                    hasErrorPut("cateName")
                      ? validationPut.errors.cateName?.[0]
                      : null || checkDuplicatePut === true
                      ? "Tên thể loại đã tồn tại"
                      : null
                  }
                />

                {validationPut.isvalid === true &&
                checkDuplicatePut === false ? (
                  <Button
                    id="idButton1"
                    style={{ marginTop: 10 }}
                    onClick={handlePutCate}
                  >
                    Lưu
                  </Button>
                ) : (
                  <Button id="idButtonDisable" disabled>
                    Lưu
                  </Button>
                )}
              </Stack>
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
        </Box>
      )}
    </Paper>
  );
};
export default Categories;
