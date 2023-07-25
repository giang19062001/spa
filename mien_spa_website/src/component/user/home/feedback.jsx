import { Box, Container,Typography,Avatar } from "@mui/material"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { dataUser } from "../../../util/data";

const Feedback = () =>{
    return (
      <Container data-aos="fade-up" sx={{ marginY: 5 }}>
        <Typography variant="h5" className="font-bold mb-6">
          NHẬN XÉT CỦA KHÁCH HÀNG
        </Typography>
        <Container maxWidth="md">
          <Carousel autoPlay showThumbs={false} infiniteLoop={true}>
            {dataUser.map((data, index) => (
              <Box key={index} className="flex flex-col sm:flex-row items-center space-x-4">
                <Avatar
                  alt=""
                  src={require("../../../assets/"+data.us_Image)}
                  className="h-52 w-52"
                />
                <Box>
                  <Typography align="left" className="font-bold">
                    {data.us_Name}
                  </Typography>
                  <Typography className=" mb-6" align="justify">
                    Tôi đã dùng nhiều cách để trị mụn lưng như : kem trị mụn ,
                    thuốc , đi spa mà vẫn không khỏi . Cũng may đến Bống Spa gặp
                    chuyên viên tư vấn trị mụn rất nhiệt tình . Kết hợp điều trị
                    tại spa và chăm sóc thêm tại nhà cho hiệu quả tốt thiệt
                  </Typography>
                </Box>
              </Box>
            ))}
           
          </Carousel>
        </Container>
      </Container>
    );
}

export default Feedback