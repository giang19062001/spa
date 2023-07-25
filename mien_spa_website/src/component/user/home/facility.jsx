import { Container,Box, Typography,Grid } from "@mui/material"

const Facility = () =>{
    return (
        <Container sx={{marginY:5}} data-aos="fade-up" >
            <Box>
             <Typography  variant="h5" className="font-bold mb-6">CƠ SỞ VẬT CHẤT HIỆN ĐẠI</Typography>
             <Typography className="text-md text-slate-600 mb-6 font-sans " align="justify">
              Toàn bộ hệ thống các chi nhánh Thẩm mỹ viện Omaga Spa đều được thiết kế với kiến trúc hiện đại,
              đạt tiêu chuẩn đẳng cấp 5 sao. Không gian từ phòng chờ đến phòng dịch vụ đều sang trọng, 
              được trang bị nội thất cao cấp, bày trí tinh tế, tiện nghi. 
              Đặc biệt là các trang thiết bị máy móc công nghệ được nhập khẩu cao cấp,
               xuất xứ rõ ràng, đạt chuẩn an toàn với nhiều tính năng vượt trội.
             </Typography>
             <Grid container spacing={2}>
                    <Grid item md={3} sm={6} xs={6}>
                    <img src={require("../../../assets/kientruc-3.jpg")} className="rounded-lg h-48"  alt="" />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}>
                    <img src={require("../../../assets/kientruc-8.jpg")} className="rounded-lg h-48" alt="" />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}>
                    <img src={require("../../../assets/kientruc-4.jpg")} className="rounded-lg h-48" alt="" />
                    </Grid>
                    <Grid item md={3} sm={6} xs={6}>
                    <img src={require("../../../assets/kientruc-2.jpg")} className="rounded-lg h-48" alt="" />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Facility