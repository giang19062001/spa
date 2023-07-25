import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comment from "./comment";
import { addService } from "../../../redux/serce/serviceReducer.js";
import { useDispatch,useSelector } from 'react-redux';
import { selectListServices,selectCartServices} from "../../../redux/serce/serviceSelector";
import { formatter } from "../../../util/custom";

const ServiceDetail = () => {
  const params = useParams();
  const [service, setService] = useState();
  const dispatch = useDispatch()

  const listSer = useSelector(selectListServices);
  const cartSer = useSelector(selectCartServices)

  useEffect(() => {
    const data = listSer.filter((item) => item.seId === params.id);
    setService(Object.assign(data?.[0])); //chuyển mảng thành đối tượng
  }, [listSer, params.id]);

 
  
  const handleAdd = (service) =>{
    dispatch(addService(service))
}

  return (
    <Container sx={{ marginY: 20 }}>
      {service === undefined ? (
        <p>loading...</p>
      ) : (
        <Box>
          <Paper elevation={1} sx={{ padding: 3 }}>
            <Grid container spacing={4}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Avatar
                  variant="square"
                  className="mx-auto w-60 h-60 sm:w-60 sm:h-60 md:w-96 md:h-96 lg:w-96 lg:h-96  xl:w-96 xl:h-96   rounded-lg"
                  src={process.env.REACT_APP_API_URL+"/image/service/"+ service?.seImage}
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
                  {service?.seName}
                </Typography>
                <Typography className="text-red-500 font-bold">
                {formatter.format(service?.sePrice)}{" "}
                </Typography>
                <Rating readOnly value={3}></Rating>

                <Typography align="justify">
                  {service.seDescription}
                </Typography>

                {service.seTurnOn === true ?(
                  cartSer?.find(ser => ser.seId === service.seId )?(
                    <Button   id="idButton1" disabled>Dịch vụ đã được thêm</Button>

                    ):(
                        <Button id="idButton1" onClick={()=>handleAdd(service)}>Chọn thêm dịch vụ</Button>

                    )
                ):(
                  <Button className="bg-slate-400 text-slate-50 font-bold rounded-full" sx={{display:"block",margin:"auto"}} disabled>Tạm ngưng dịch vụ</Button>

                )}
               
              </Grid>
            </Grid>
          </Paper>
          <Box className="my-12">
          <Typography align="justify" className="font-bold mb-4 text-lg">
                 Quy trình dịch vụ:
           </Typography> 
          <Typography align="justify">
                  {service.seNote}
           </Typography>   
          </Box>         

           <Comment></Comment>
        </Box>
      )}
    </Container>
  );
};
export default ServiceDetail;
