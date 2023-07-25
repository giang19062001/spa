import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Comment from "./comment";
import { addCart } from "../../../redux/product/productReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartProduct,
  selectListProduct,
} from "../../../redux/product/productSelector";
import ProductSameCate from "./productSameCate";
import { formatter } from "../../../util/custom";

const ProductDetail = () => {
  // window.scrollTo({ top: 50, behavior: "auto" });

  const params = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);

  const listProduct = useSelector(selectListProduct);
  const cartList = useSelector(selectCartProduct);
  const [addSuccess, setAddSuccess] = useState(false);
  const [addFailed, setAddFailed] = useState(false);
  useEffect(() => {
    const data = listProduct.filter((item) => item.proId === params.id);
    setProduct(data?.[0]);
  }, [listProduct, params.id]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAddFailed(false)
    setAddSuccess(false)
  };

  const handleAddCart = () => {
    const quantityOnCart = cartList?.find((item) => item.proId === params.id);
    if (quantityOnCart?.quantity === 10 || quantity > 10) {
      setAddFailed(true);
    } else {
      setAddSuccess(true);
      dispatch(addCart({ ...product, quantity }));
    }
  };
  const handleDecrease = () => {
    setQuantity(quantity - 1);
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  console.log("cartList", cartList);
  return (
    <Container sx={{ marginY: 20 }}>
      {product === undefined ? (
        <p>loading...</p>
      ) : (
        <Box>
          <Paper elevation={6} sx={{ padding: 3, marginBottom: 5 }}>
            <Grid container spacing={4}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Avatar
                  variant="square"
                  className="mx-auto w-60 h-60 sm:w-60 sm:h-60 md:w-96 md:h-96 lg:w-96 lg:h-96  xl:w-96 xl:h-96   rounded-lg"
                  src={
                    process.env.REACT_APP_API_URL +
                    "/image/product/" +
                    product?.featureImgPath
                  }
                ></Avatar>
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className="space-y-6"
              >
                <Typography className="font-bold text-2xl">
                  {product?.proName}
                </Typography>
                <Typography className="text-red-500 font-bold">
                  {formatter.format(product?.proPrice)}
                </Typography>
                <Rating readOnly value={3}></Rating>
                <Stack direction="row" alignItems="center" spacing={4}>
                  <Typography>Số lượng: </Typography>
                  <IconButton
                    onClick={handleDecrease}
                    disabled={quantity === 1}
                  >
                    <RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>
                  </IconButton>
                  <Typography>{quantity}</Typography>
                  <IconButton onClick={handleIncrease}>
                    <AddCircleOutlineIcon></AddCircleOutlineIcon>
                  </IconButton>
                </Stack>

                <Typography align="justify">
                  Thương hiệu sản phẩm : <b> {product?.proBrand}</b>
                </Typography>
                <Typography align="justify">{product?.proContent}</Typography>
                {product?.proTurnOn === false ? (
                  <Button
                    className="bg-slate-400 text-slate-50 font-bold rounded-full"
                    sx={{ display: "block", margin: "auto" }}
                    disabled
                  >
                    Tạm hết hàng
                  </Button>
                ) : (
                  <Button
                    sx={{ display: "block", margin: "auto" }}
                    className="bg-rose-400 text-slate-50 hover:bg-rose-500"
                    onClick={handleAddCart}
                  >
                    Thêm giỏ hàng
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>

          <Comment></Comment>
          <ProductSameCate product={product}></ProductSameCate>
          {addSuccess === true ? (
            <Snackbar
              open={addSuccess}
              autoHideDuration={1000}
              onClose={handleCloseSnackbar}
            >
              <Alert severity="success" className="right-5 top-40 w-18 fixed">
                <AlertTitle>Success</AlertTitle>
                <strong>Đã thêm sản phẩm vào giỏ hàng</strong>
              </Alert>
            </Snackbar>
          ) : null}
          {addFailed === true ? (
            <Snackbar
              open={addFailed}
              autoHideDuration={1000}
              onClose={handleCloseSnackbar}
            >
              <Alert severity="error" className="right-5 top-40 w-18 fixed">
                <AlertTitle>Failed</AlertTitle>
                <strong>Sản phẩm đã thêm vượt quá số lượng cho phép</strong>
              </Alert>
            </Snackbar>
          ) : null}
        </Box>
      )}
    </Container>
  );
};

export default ProductDetail;
