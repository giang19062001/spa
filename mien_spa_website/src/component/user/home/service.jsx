import { Typography, Box, Container, Grid } from "@mui/material";
import "../../../css/service.scss";
import { Link } from "react-router-dom";
import { selectListServices } from "../../../redux/serce/serviceSelector";
import { useSelector } from "react-redux";

const Service = () => {
  const listSer = useSelector(selectListServices);

  return (
    <Container sx={{ marginY: 5 }} data-aos="fade-up">
      <Box>
        <Typography variant="h5" className="font-bold mb-6">
          TẤT CẢ DỊCH VỤ
        </Typography>
        <Grid container spacing={2}>
          {listSer?.map((ser, index) =>
            ser?.isDelete === false ? (
              <Grid item xs={6} md={3} id="idGridService" key={index}>
                <Link to={`service/` + ser?.seId}>
                  <img
                    src={
                      process.env.REACT_APP_API_URL +
                      "/image/service/" +
                      ser?.seImage
                    }
                    id="idImageService"
                    className="rounded-t-md hover:cursor-pointer  border border-rose-400 h-42 md:h-72 w-96 object-fill"
                    alt=""
                  />
                  <Typography
                    id="idTypographyService"
                    align="center"
                    className="rounded-full bg-rose-300  font-bold text-slate-50 p-2 "
                  >
                    {ser.seName}
                  </Typography>
                </Link>
              </Grid>
            ) : null
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Service;
