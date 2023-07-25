import * as React from "react";
import { Box, Grid, Container ,Stack,Typography,AppBar} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Footer = () => {
  return (
    <Box sx={{ bottom: 0, position: "relative", width: "100%" }}>
      <AppBar position="static" className="bg-rose-300 py-12">
        <Container>
          <Grid container spacing={6}>
            <Grid item md={4}>
              <Stack spacing={2}>
                <img
                  src={require("../../../assets/OG Spa2.png")}
                  alt=""
                  className="mx-auto w-32 rounded-full"
                ></img>
                <Typography
                  align="center"
                  className="font-bold text-neutral-900"
                >
                  HỆ THỐNG LÀM ĐẸP HÀNG ĐẦU VIỆT NAM
                </Typography>
                <Typography align="center" className="text-neutral-900">
                  Omega Spa luôn nỗ lực không ngừng để đem đến cho khách hàng
                  những dịch vụ hoàn hảo nhất.
                </Typography>
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack className="" spacing={2}>
                <Typography className="text-neutral-900 font-bold">
                  HOTLINE
                </Typography>
                <Typography className="bg-slate-50 rounded-full text-neutral-900 p-2">
                  <PhoneIcon></PhoneIcon> &emsp;0901.311.113
                </Typography>
                <Typography className="text-neutral-900 font-bold">
                  ĐỊA CHỈ LIÊN HỆ
                </Typography>
                <Typography className="bg-slate-50 rounded-full text-neutral-900  p-2">
                  <EmailIcon></EmailIcon>&emsp;Email: gaspavn@gmail.com
                </Typography>
                <Typography className="text-neutral-900 font-bold">
                  TRỤ SỞ CHÍNH
                </Typography>
                <Typography className="bg-slate-50 rounded-full text-neutral-900  p-2">
                  <PlaceIcon></PlaceIcon>
                  17 Miếu Nổi, phường 2, Quận Phú Nhuận
                </Typography>
              </Stack>
            </Grid>
            <Grid item md={4}>
              <Stack spacing={2}>
                <Typography className="text-neutral-900 font-bold">
                  THỜI GIAN LÀM VIỆC
                </Typography>
                <Typography className="bg-slate-50 rounded-full text-neutral-900  p-2 ">
                  <CalendarMonthIcon></CalendarMonthIcon>
                  &emsp;8h30 - 19h30 thứ 2 - CN (Kể cả lễ, Tết)
                </Typography>
                <div
                  className="fb-page"
                  data-href="https://www.facebook.com/facebook"
                  data-width="380"
                  data-hide-cover="false"
                  data-show-facepile="false"
                ></div>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Footer;
