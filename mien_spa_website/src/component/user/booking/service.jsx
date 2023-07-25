import {
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  Stack,
  Accordion,
  AccordionDetails,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  removeService,
} from "../../../redux/serce/serviceReducer.js";
import {
  selectListServices,
  selectCartServices,
} from "../../../redux/serce/serviceSelector";
import { formatter } from "../../../util/custom.js";

const Service = (props) => {
  const dispatch = useDispatch();

  const listSer = useSelector(selectListServices);
  const cartSer = useSelector(selectCartServices);
  const handleAdd = (ser) => {
    dispatch(addService(ser));
  };

  const handleRemove = (ser) => {
    dispatch(removeService(ser));
  };

  const totalSum = cartSer?.reduce(
    (preValue, currentValue) =>
      preValue + currentValue.sePrice ,
    0
  );


  return (
    <Box>
      <Accordion>
        {/* <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Danh sách dịch vụ</Typography>
        </AccordionSummary> */}
        <AccordionDetails className="p-9">
          <Grid container spacing={2}>
            {listSer.map((data, index) =>
              data?.isDelete === false ? (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  <Card className="w-48">
                    <CardMedia
                      component="img"
                      src={
                        process.env.REACT_APP_API_URL +
                        "/image/service/" +
                        data?.seImage
                      }
                      className="rounded-t-md hover:cursor-pointer h-40 w-96 object-fill"
                    />
                    <CardContent>
                      <Typography className="text-neutral-700  font-sans">
                        {data.seName}
                      </Typography>
                      <Typography className="text-red-500 font-bold  font-sans">
                        {" "}
                        {formatter.format(data?.sePrice)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {data?.seTurnOn === true ? (
                        cartSer?.find((ser) => ser.seId === data.seId) ? (
                          <Button
                            className="mx-auto text-slate-50 bg-rose-300 "
                            variant="outlined"
                            fullWidth
                            disabled
                          >
                            Đã Chọn
                          </Button>
                        ) : (
                          <Button
                            className="mx-auto text-rose-400 border border-rose-400 hover:border-rose-500 hover:text-rose-500"
                            variant="outlined"
                            fullWidth
                            onClick={() => {
                              handleAdd(data);
                              props.parentCallback();
                            }}
                          >
                            Chọn
                          </Button>
                        )
                      ) : (
                        <Button
                          className="bg-slate-400 text-slate-50  rounded-lg"
                          sx={{ display: "block", margin: "auto" }}
                          disabled
                        >
                          Tạm ngưng dịch vụ
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Stack className="m-6">
        <Typography className="mb-4 text-red-500">
          Đã chọn {cartSer?.length} dịch vụ :    <b>{formatter.format(totalSum)}</b>
        </Typography>
        <Grid container>
          {cartSer?.map((ser, index) => (
            <Grid
              item
              md={3}
              key={index}
              className="border rounded-lg  flex items-center justify-center m-2"
            >
              <Typography>{ser.seName}</Typography>
              <IconButton onClick={() => handleRemove(ser)}>
                <ClearIcon className="text-red-500"></ClearIcon>
              </IconButton>
            </Grid>
          ))}
        </Grid>
     
      </Stack>
    </Box>
  );
};
export default Service;
