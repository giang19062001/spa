import { Container,Box,Typography,Grid} from "@mui/material"

const Doctor = () =>{
    return(
       <Container data-aos="fade-up" >
           <Box>
           <Typography  variant="h5" className="font-bold mb-6">ĐỘI NGŨ CHUYÊN VIÊN ĐƯỢC ĐÀO TẠO CHUYÊN NGHIỆP </Typography>
           <Typography align="justify" className=" text-slate-600 p-4">
                    100 % đội ngũ chuyên viên , kỹ thuật viên , y sĩ , điều dưỡng tại Omega Spa đều là những chuyên viên tốt nhất trong
                    ngành thẩm mỹ , dày dặn kỹ năng , kinh nghiệm trong nghề , cùng với tâm huyết và sự chuyên nghiệp , họ mang đến cho
                    khách hàng những dịch vụ tốt nhất .
                  </Typography>
          
           <Grid container spacing={2} className="mt-4">
                <Grid item md={4}>
                <img src={require("../../../assets/doctor.jpg")} className="rounded-lg w-96 h-96 object-cover"  alt="" />

                </Grid>
                <Grid item  md={4}>
                <img src={require("../../../assets/doctor1.jpg")} className="rounded-lg  w-96 h-96 object-cover"  alt="" />
                </Grid>
                <Grid item  md={4}>
                <img src={require("../../../assets/doctor2.jpg")} className="rounded-lg  w-96 h-96 object-cover "  alt="" />
                </Grid>
           </Grid>
           </Box>
       </Container>
    )
}
export default Doctor