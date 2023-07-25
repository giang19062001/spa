import { Box, Container, Rating,Button } from "@mui/material"
import { CssTextField } from "../../../util/custom"

const Comment = () =>{
    return(
        <Container sx={{marginY:5}}>
            <Box className="relative">
                <CssTextField multiline rows={4} label="Đánh giá dịch vụ" fullWidth >
                </CssTextField>
                <Rating className="absolute bottom-0 left-0 p-4"></Rating>
                <Button className="absolute bottom-0 right-0 m-4 bg-rose-300 text-slate-50 hover:bg-rose-500">Gửi đánh giá</Button>

            </Box>
        </Container>
    )
}
export default Comment