import {
  Box,
  Container,
  Grid,
  Card,
  Typography,
  Button,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  Slide
} from "@mui/material";
import { selectListProduct } from "../../../redux/product/productSelector";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { formatter } from "../../../util/custom";
import "../../../css/productSameCate.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductSameCate = ({ product }) => {
  const listProduct = useSelector(selectListProduct);
  const [data, setData] = useState();
  const [dataCompare, setDataCompare] = useState();
  const [openCompare, setOpenCompare] = React.useState(false);

  const handleOpenCompare = () => {
    setOpenCompare(true);
  };

  const handleCloseCompare = () => {
    setOpenCompare(false);
  };
  useEffect(() => {
    setData(
      listProduct.filter(
        (item) =>
          item.category_id === product.category_id &&
          item.proId !== product.proId
      )
    );
  }, [product.category_id, product.proId]);

  console.log("data", data);
  return (
    <Container>
      {data?.length === 0 ? null : (
        <Box>
          <Typography className="font-bold text-xl pb-6">
            Danh sách sản phẩm cùng thể loại
          </Typography>
          <Grid container spacing={5}>
            {data?.map((data, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card
                  id="idCardProductSameCate"
                  sx={{ maxWidth: 345 }}
                  className="hover:shadow hover:shadow-2xl hover:shadow-slate-200 bg-slate-50 rounded-lg z-10 relative select-none"
                >
                  <CardMedia
                    component="img"
                    src={
                      process.env.REACT_APP_API_URL +
                      "/image/product/" +
                      data?.featureImgPath
                    }
                    alt=""
                    id="idImgProductSameCate"
                    className="w-72 h-60  object-contain"
                  />
                  <CardContent>
                    <Typography align="center" sx={{ fontWeight: "bold" }}>
                      {data?.proName}
                    </Typography>
                    <Typography
                      align="center"
                      sx={{ fontWeight: "bold", color: "red" }}
                    >
                      {" "}
                      {formatter.format(data?.proPrice)}
                    </Typography>
                    <Link to={`/product/` + data?.proId}>
                      <Button id="idButtonProductSameCate">Xem chi tiết</Button>
                    </Link>

                    <Button
                      id="idButtonCompareProductSameCate"
                      onClick={() => {
                        handleOpenCompare();
                        setDataCompare(data);
                      }}
                    >
                      So sánh{" "}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Dialog
        open={openCompare}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCompare}
      >
        <DialogContent style={{ userSelect: "none" }}>
          <Grid container spacing={2} sx={{ padding: 5 }}>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box id="idBoxCompareProductSameCate">
                <img
                  id="idImgCompareProductSameCate"
                  src={
                    process.env.REACT_APP_API_URL +
                    "/image/product/" +
                    product?.featureImgPath
                  }
                  alt=""
                />
                <Typography
                  align="center"
                  sx={{ fontWeight: "bold", margin: 2 }}
                >
                  {product.proName}
                </Typography>
               
                <Typography
                  align="center"
                  sx={{  margin: 2 }}
                >
                  Nhãn hàng: <b>{product.proBrand}</b>
                </Typography>
                <Typography
                  align="center"
                  sx={{ color: "red", fontWeight: "bold" }}
                >
                  {formatter.format(product?.proPrice)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              {dataCompare === undefined ? (
                <p>loading...</p>
              ) : (
                <Box id="idBoxCompareProductSameCate">
                  <img
                    id="idImgCompareProductSameCate"
                    src={
                      process.env.REACT_APP_API_URL +
                      "/image/product/" +
                      dataCompare?.featureImgPath
                    }
                    alt=""
                  />
                  <Typography
                    align="center"
                    sx={{ fontWeight: "bold", margin: 2 }}
                  >
                    {dataCompare.proName}
                  </Typography>
                 
                  <Typography
                  align="center"
                  sx={{  margin: 2 }}
                >
                  Nhãn hàng: <b>{dataCompare.proBrand}</b>
                </Typography>
                <Typography
                    align="center"
                    sx={{ color: "red", fontWeight: "bold" }}
                  >
                    {formatter.format(dataCompare?.proPrice)}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
export default ProductSameCate;
