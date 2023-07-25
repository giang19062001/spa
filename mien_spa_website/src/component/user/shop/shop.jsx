import * as React from "react";

import { Container, Box, Button ,Card,CardContent,CardMedia,Typography,Grid,Rating,Pagination,Stack} from "@mui/material";
import { useState } from "react";

import usePagination from "../../../util/pagination";
import { Link } from "react-router-dom";
import ContentCarousel from "./contentCarousel";
import "../../../css/shop.scss";
import { selectListProduct } from "../../../redux/product/productSelector";
import { useSelector } from "react-redux";
import { selectListCate } from "../../../redux/category/cateSelector";
import { useEffect } from "react";
import { formatter } from "../../../util/custom";

export default function Shop() {
  const listProduct = useSelector(selectListProduct);

  const listCate = useSelector(selectListCate);

  let [page, setPage] = useState(1);
  const [chooseCateAll, setChooseCateAll] = useState(true);

  const [data, setData] = useState();

  useEffect(() => {
    setData(listProduct);
  }, [listProduct]);
  
  const PER_PAGE = 8;

  const count = Math.ceil(data?.length / PER_PAGE);

  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleChangeCate = (id) => {
    if (id === "all") {
      setData(listProduct);
    } else {
      setData(listProduct.filter((item) => item.category_id === id));
    }
  };

  console.log(listCate)

  return (
    <Box className="bg-slate-100">
      <Container className="py-12">
        <Typography id="idTypographyShop">DANH SÁCH SẢN PHẨM BÁN CHẠY</Typography>

        <ContentCarousel></ContentCarousel>
        <Typography className="p-6 text-xl font-bold" align="center">
          DANH SÁCH TẤT CẢ SẢN PHẨM
        </Typography>
        <Box className="mb-6 flex flex-wrap space-x-2 ">
          <div>
            <input
              type="radio"
              id={"all"}
              value="all"
              name="radioCate"
              style={{ display: "none" }}
              checked={chooseCateAll}
              onClick={() => setChooseCateAll(true)}
            />
            <div
              className="text-slate-50 rounded-full p-2 hover:bg-rose-500 m-1 "
              id="idBoxCateShop"
            >
              <label
                className="radioCate hover:cursor-pointer select-none "
                for={"all"}
                onClick={() => handleChangeCate("all")}
              >
                Tất cả
              </label>
            </div>
          </div>
          {listCate?.map((data, index) => (
            <div>
              <input
                type="radio"
                id={data?.cateName}
                value={data?.cateId}
                name="radioCate"
                style={{ display: "none" }}
              />
              <div
                className="text-slate-50 rounded-full p-2 hover:bg-rose-500  hover:cursor-pointer m-1"
                id="idBoxCateShop"
              >
                <label
                  className="radioCate hover:cursor-pointer select-none text-slate-50 rounded-full p-2 "
                  for={data?.cateName}
                  onClick={() => {
                    handleChangeCate(data?.cateId);
                    setChooseCateAll(false);
                  }}
                >
                  {data?.cateName}
                </label>
              </div>
            </div>
          ))}
        </Box>
          {data?.length === 0 ? (
            <div>
              <Typography align="center" className="text-red-500 font-bold text-xl mt-20">Chưa có sản phẩm nào</Typography>
            </div>

          ) : (
            <Grid container spacing={5} >

            {_DATA?.currentData()?.map((data, index) => (
                data?.isDelete === false ? (
              <Grid item xs={6} sm={3} md={3} lg={3} xl={3} key={index}>
                <Card
                  id="idCardShop"
                  sx={{ maxWidth: 345 }}
                  className="hover:shadow hover:shadow-2xl hover:shadow-slate-200 bg-slate-50 rounded-lg z-10 relative select-none"
                >
                  <Link to={`/product/` + data?.proId}>
                    <CardMedia
                      component="img"
                      src={process.env.REACT_APP_API_URL+"/image/product/" + data?.featureImgPath}

                      alt=""
                      id="idImgShop"
                      className="w-72 h-60  object-contain"
                    />
                    <CardContent>
                      <Typography align="justify">{data?.proName}</Typography>
                      <Typography align="justify">
                      <b style={{color:"red"}}>
                        {formatter.format(data?.proPrice)}
                          </b>
                      </Typography>
                      <Rating name="no-value" readOnly value={5} />
                      <Button id="idButtonShop">Xem chi tiết</Button>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>):null
            ))}
            </Grid>

          )}
      </Container>
      <Stack className="flex justify-center items-center py-12">
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          color="primary"
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
}
