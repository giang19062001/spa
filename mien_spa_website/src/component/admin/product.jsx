import * as React from "react";

import {
  Table,
  Paper,
  Button,
  Typography,
  Avatar,
  Stack,
  Box,
  FormControl,
  MenuItem,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  TablePagination,
  FormHelperText,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
  DialogTitle,
} from "@mui/material";

import {
  blockProducts,
  deleteProducts,
  fetchProducts,
  postProduct,
  putProducts,
} from "../../redux/product/productThunk";
import {
  selectListProduct,
  selectStatusProduct,
} from "../../redux/product/productSelector";
import { selectListCate } from "../../redux/category/cateSelector";
import { useDispatch, useSelector } from "react-redux";

import {
  convertBase64,
  CssInputLabel,
  CssSelect,
  CssTextField,
  date,
  formatter,
} from "../../util/custom";
import { fetchCategories } from "../../redux/category/cateThunk";
import { validate } from "validate.js";
import { schemaProduct } from "../../util/validate";
import { useState } from "react";

const Product = (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [avatar, setAvatar] = React.useState();

  const [openDialogCreate, setOpenDialogCreate] = React.useState(false);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);

  const [dataCrud, setDataCrud] = useState({
    open: false,
    data: undefined,
    message: "",
    crud: "",
  });
  const [crudSuccess, setCrudSuccess] = useState({
    open: false,
    message: "",
  });

  const products = useSelector(selectListProduct);
  const listCate = useSelector(selectListCate);
  const statusProduct = useSelector(selectStatusProduct);
  const columns = [
    "Ảnh minh họa",
    "Mã sản phẩm",
    "Tên sản phẩm",
    "Gía sản phẩm",
    "",
  ];

  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const [dataPost, setDataPost] = React.useState({
    category_id: "",
    proBrand: "",
    proContent: "",
    proName: "",
    featureImgPath: null,
    proPrice: "",
    proTurnOn: true,
    isDelete: false,
    createdAt: Date.parse(date),
  });
  const [dataPut, setDataPut] = React.useState({
    category_id: "",
    proId: "",
    proBrand: "",
    proContent: "",
    proName: "",
    featureImgPath: null,
    proPrice: "",
    proTurnOn: true,
    isDelete: false,
    updatedAt: Date.parse(date),
  });

  const handleClickOpenDialog = () => {
    setOpenDialogCreate(true);
    setDataPost({
      category_id: "",
      proBrand: "",
      proContent: "",
      proName: "",
      featureImgPath: null,
      proPrice: "",
      proTurnOn: true,
      isDelete: false,
      createdAt: Date.parse(date),
    });
  };

  const handleCloseDialogCreate = () => {
    setAvatar(null);
    setOpenDialogCreate(false);
    setValidationPost((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        proName: false,
        proContent: false,
        proBrand: false,
        proPrice: false,
        category_id: false,
        featureImgPath: false,
      },
    }));
  };
  const handleClickOpenDialogEdit = (data) => {
    setDataPut(data);
    setOpenDialogEdit(true);
  };
  const handleCloseDialogEdit = () => {
    setAvatar(null);
    setOpenDialogEdit(false);
  };

  const handleChangeImageCreate = async (e) => {
    const files = e.target.files;
    const base64 = await convertBase64(files[0]);
    setAvatar(base64);
    setDataPost((preState) => ({
      ...preState,
      featureImgPath: files[0],
    }));
  };
  const handleChangeImageEdit = async (e) => {
    const files = e.target.files;
    const base64 = await convertBase64(files[0]);
    setAvatar(base64);
    setDataPut((preState) => ({
      ...preState,
      featureImgPath: files[0],
    }));
  };

  const handleBlock = () => {
    dispatch(
      blockProducts({ data: dataCrud.data, date: Date.parse(date) })
    ).then(() => {
      setDataCrud({ open: false, data: undefined, message: "", crud: "" });

      dispatch(fetchProducts());
      setCrudSuccess({
        open: true,
        message: "Khóa/ mở khóa sản phẩm thành công",
      });
    });
  };
  const handleDelete = () => {
    dispatch(
      deleteProducts({ data: dataCrud.data, date: Date.parse(date) })
    ).then(() => {
      setDataCrud({ open: false, data: undefined, message: "", crud: "" });
      dispatch(fetchProducts());
      setCrudSuccess({
        open: true,
        message: "Xóa sản phẩm thành công",
      });
    });
  };
  const hanldeCloseDialogCrud = () => {
    setDataCrud({ open: false, data: undefined, message: "", crud: "" });
  };
  const hanldeCloseDialogSuccess = () => {
    setCrudSuccess({ open: false, message: "" });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //validate post
  const [validationPost, setValidationPost] = React.useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  const [checkDupliProPost, setCheckDupliProPost] = React.useState(false);
  React.useEffect(() => {
    if (products?.some((pro) => pro?.proName === dataPost?.proName) === true) {
      setCheckDupliProPost(true);
    } else {
      setCheckDupliProPost(false);
    }
  }, [products, dataPost?.proName]);

  React.useEffect(() => {
    const errors = validate.validate(dataPost, schemaProduct);
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

  const handleAdd = () => {
    if (validationPost.isvalid === true) {
      dispatch(postProduct(dataPost)).then(() => {
        setAvatar(null);
        setOpenDialogCreate(false);
        setValidationPost((pre) => ({
          ...pre,
          touched: {
            ...pre.touched,
            proName: false,
            proContent: false,
            proBrand: false,
            proPrice: false,
            category_id: false,
            featureImgPath: false,
          },
        }));
        setCrudSuccess({
          open: true,
          message: "Thêm sản phẩm thành công",
        });
        dispatch(fetchProducts());

      });
    }
  };

  //validate put
  const [validationPut, setValidationPut] = React.useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  const [checkDupliProPut, setCheckDupliProPut] = React.useState(false);
  React.useEffect(() => {
    if (
      products?.some(
        (pro) =>
          pro?.proName === dataPut?.proName && pro?.proId !== dataPut?.proId
      ) === true
    ) {
      setCheckDupliProPut(true);
    } else {
      setCheckDupliProPut(false);
    }
  }, [products, dataPut.proName, dataPost?.proName, dataPut?.proId]);

  React.useEffect(() => {
    const errors = validate.validate(dataPut, schemaProduct);
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
    dispatch(putProducts({ data: dataPut, date: Date.parse(date) })).then(
      () => {
        setAvatar(null);
        setOpenDialogEdit(false);
        setCrudSuccess({
          open: true,
          message: "Cập nhập sản phẩm thành công",
        });
        dispatch(fetchProducts());

      }
    );
  };

  console.log("valid",validationPut?.isvalid)
  console.log("dataPut",dataPut)

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginY: 2 }}>
      {statusProduct === true ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Box>
          <Typography variant="h5" align="center" className="font-bold mb-4">
            Danh sách <b className="text-rose-600">sản phẩm</b>
          </Typography>
          <Button
            style={{ display: "block", margin: "auto" }}
            onClick={handleClickOpenDialog}
            className=" text-lg capitalize text-rose-500 font-semibold transition ease-in-out delay-50 
            hover:-translate-y-1 hover:scale-110 duration-300 border-solid border-2 border-rose-500 rounded-xl"
          >
            Thêm sản phẩm
          </Button>
          <TableContainer sx={{ maxHeight: 2000, marginTop: 4 }}>
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
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) =>
                    row?.isDelete === false ? (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <>
                          <TableCell>
                            <Avatar
                              variant="square"
                              className="w-36 h-36 rounded-lg "
                              src={
                                process.env.REACT_APP_API_URL +
                                "/image/product/" +
                                row.featureImgPath
                              }
                              alt=""
                            />
                          </TableCell>
                          <TableCell className="">{row.proId}</TableCell>

                          <TableCell>{row.proName}</TableCell>
                          <TableCell className="text-red-500 font-bold">
                            {" "}
                            {formatter.format(row.proPrice)}
                          </TableCell>
                          <TableCell>
                            <Button
                              className="bg-yellow-400 hover:bg-yellow-500 text-slate-50"
                              onClick={() => handleClickOpenDialogEdit(row)}
                            >
                              Cập nhập
                            </Button>
                          </TableCell>
                          {row.proTurnOn === false ? (
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
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />{" "}
        </Box>
      )}

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
              Sản phẩm
            </Typography>

            <CssTextField
              fullWidth
              type="text"
              label="Tên sản phẩm"
              name="proName"
              onChange={handleChangeCreate}
              error={hasErrorPost("proName") || checkDupliProPost === true}
              helperText={
                hasErrorPost("proName")
                  ? validationPost.errors.proName?.[0]
                  : null || checkDupliProPost === true
                  ? "Tên sản phẩm đã tồn tại"
                  : null
              }
            />
            <CssTextField
              fullWidth
              type="text"
              label="Gía sản phẩm"
              name="proPrice"
              onChange={handleChangeCreate}
              error={hasErrorPost("proPrice")}
              helperText={
                hasErrorPost("proPrice")
                  ? validationPost.errors.proPrice?.[0]
                  : null
              }
            />
            <CssTextField
              fullWidth
              type="text"
              label="Thương hiệu sản phẩm"
              name="proBrand"
              onChange={handleChangeCreate}
              error={hasErrorPost("proBrand")}
              helperText={
                hasErrorPost("proBrand")
                  ? validationPost.errors.proBrand?.[0]
                  : null
              }
            />
            <FormControl fullWidth error={hasErrorPost("category_id")}>
              <CssInputLabel>Thể loại</CssInputLabel>
              <CssSelect
                name="category_id"
                label="Thể loại"
                onChange={handleChangeCreate}
              >
                {listCate?.map((cate, index) => (
                  <MenuItem key={index} value={cate.cateId}>
                    {cate.cateName}
                  </MenuItem>
                ))}
              </CssSelect>
              <FormHelperText>
                {hasErrorPost("category_id")
                  ? validationPost.errors.category_id?.[0]
                  : null}
              </FormHelperText>
            </FormControl>
            <CssTextField
              fullWidth
              type="text"
              label="Mô tả sản phẩm"
              rows={4}
              multiline
              name="proContent"
              onChange={handleChangeCreate}
              error={hasErrorPost("proContent")}
              helperText={
                hasErrorPost("proContent")
                  ? validationPost.errors.proContent?.[0]
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
                  style={{
                    borderRadius: "30px",
                    width: 300,
                    height: 300,
                    marginBottom: 10,
                  }}
                  alt=""
                  src={avatar && avatar}
                />
                <FormHelperText error={hasErrorPost("featureImgPath")}>
                  {hasErrorPost("featureImgPath")
                    ? validationPost.errors.featureImgPath?.[0]
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

            {validationPost.isvalid === true && checkDupliProPost === false ? (
              <Button id="idButton1" onClick={handleAdd}>
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

      {/* edit */}
      {/* edit */}
      {/* edit */}
      {/* edit */}
      {/* edit */}
      {/* edit */}
      {/* edit */}
      {/* edit */}
      {/* edit */}
      {/* edit */}

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
              name="proId"
              defaultValue={dataPut.proId}
              inputProps={{ readOnly: true }}
            />
            <CssTextField
              fullWidth
              type="text"
              label="Tên sản phẩm"
              name="proName"
              onChange={handleChangeEdit}
              defaultValue={dataPut.proName}
              error={hasErrorPut("proName") || checkDupliProPut === true}
              helperText={
                hasErrorPut("proName")
                  ? validationPut.errors.proName?.[0]
                  : null || checkDupliProPut === true
                  ? "Tên sản phẩm đã tồn tại"
                  : null
              }
            />
            <CssTextField
              fullWidth
              type="text"
              label="Gía sản phẩm"
              name="proPrice"
              onChange={handleChangeEdit}
              defaultValue={dataPut.proPrice}
              error={hasErrorPut("proPrice")}
              helperText={
                hasErrorPut("proPrice")
                  ? validationPut.errors.proPrice?.[0]
                  : null
              }
            />
            <CssTextField
              fullWidth
              type="text"
              label="Hãng hiệu"
              rows={4}
              multiline
              name="proBrand"
              onChange={handleChangeEdit}
              defaultValue={dataPut.proBrand}
              error={hasErrorPut("proBrand")}
              helperText={
                hasErrorPut("proBrand")
                  ? validationPut.errors.proBrand?.[0]
                  : null
              }
            />
            <FormControl fullWidth error={hasErrorPut("category_id")}>
              <CssInputLabel>Thể loại</CssInputLabel>
              <CssSelect
                name="category_id"
                label="Thể loại"
                onChange={handleChangeEdit}
                defaultValue={dataPut.category_id}
              >
                {listCate?.map((cate, index) => (
                  <MenuItem key={index} value={cate.cateId}>
                    {cate.cateName}
                  </MenuItem>
                ))}
              </CssSelect>
              <FormHelperText>
                {hasErrorPut("category_id")
                  ? validationPost.errors.category_id?.[0]
                  : null}
              </FormHelperText>
            </FormControl>
            <CssTextField
              fullWidth
              type="text"
              label="Mô tả sản phẩm"
              name="proContent"
              rows={4}
              multiline
              onChange={handleChangeEdit}
              defaultValue={dataPut.proContent}
              error={hasErrorPut("proContent")}
              helperText={
                hasErrorPut("proContent")
                  ? validationPut.errors.proContent?.[0]
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
                  sx={{ borderRadius: "30px", width: 300, height: 300 }}
                  alt=""
                  src={
                    avatar
                      ? avatar
                      : process.env.REACT_APP_API_URL +
                        "/image/product/" +
                        dataPut.featureImgPath
                  }
                />
                <FormHelperText error={hasErrorPut("featureImgPath")}>
                  {hasErrorPut("featureImgPath")
                    ? validationPost.errors.featureImgPath?.[0]
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
            {validationPut.isvalid === true && checkDupliProPut === false ? (
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
export default Product;
