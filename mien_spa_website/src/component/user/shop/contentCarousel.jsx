import React, { useState } from "react";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {Box,Button,Typography,Rating,CardMedia,CardContent,Card} from '@mui/material';
import '../../../css/contentCarousel.scss'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectListProduct } from "../../../redux/product/productSelector";
import { formatter } from "../../../util/custom";
export default function ContentCarousel() {


  const [value, setValue] = useState(0);
  const listProduct = useSelector(selectListProduct)

 

  const moveBehind = () => {

    value === (-100 * (listProduct.length - 4))
      ? setValue(0)
      : setValue(value - 100);
  };
  const moveAhead = () => {

    value === 0
      ? setValue(-100 * (listProduct.length - 4))
      : setValue(value + 100);
  };





  return (
      <Box className="BoxContentCarousel">
          {listProduct.map((data, index) => (
             data?.isDelete === false ? (
              <Box 
                key={index}
                className="BoxChildContentCarousel bg-slate-50"
                style={{ transform: `translateX(${value}%)` }}
              >
               <Card sx={{ maxWidth: 280 }} 
                id="idCardShop"
               className="hover:shadow hover:shadow-2xl hover:shadow-slate-200 rounded-lg mb-5">
                  <Link to={`/product/`+data?.proId}>
                    <CardMedia
                      component="img"
                      src={process.env.REACT_APP_API_URL+"/image/product/" + data?.featureImgPath}
                      alt=""
                      id="idImgShop"
                      className="w-72 h-60  object-contain"
                    />
                    <CardContent>
                      <Typography   align="justify">    
                        {data?.proName}
                      </Typography>
                      <Typography   align="justify">    
                        <b style={{color:"red"}}>
                        {formatter.format(data?.proPrice)}
                          </b>
                      </Typography>
                      <Rating name="no-value" readOnly value={4} />
                      <Button id="idButtonShop">Xem chi tiết</Button>

                    </CardContent>
                  </Link>
                    </Card>
              </Box>):null
            ))}
       <ArrowCircleLeftIcon id="moveBehind" onClick={moveAhead} />

 <ArrowCircleRightIcon id="moveAhead" onClick={moveBehind} />

      </Box>

  );
}
