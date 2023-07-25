import { Container, Box, Grid, Typography } from "@mui/material";
import { dataTreatment } from "../../../util/data";
const Treatment = () => {
  return (
    <Container sx={{ marginY: 5 }} data-aos="fade-up">
      <Box>
        <Typography variant="h5" className="font-bold mb-6">
          MỘT SỐ HÌNH ẢNH TIÊU BIỂU CỦA KHÁCH HÀNG SAU KHI ĐIỀU TRỊ{" "}
        </Typography>

        <Grid container spacing={2}>
          {dataTreatment.map((tm, index) => (
            <Grid item md={3} key={index}>
                <img
                  src={require("../../../assets/" + tm?.photo)}
                  className="rounded-lg  hover:scale-125  transition duration-150 ease-out h-72 w-96 object-cover"
                  alt=""
                />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
export default Treatment;
