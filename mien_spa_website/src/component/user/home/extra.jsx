import {  Container, Grid } from "@mui/material"

const Extra = () =>{
    return(
        <Container data-aos="fade-up"   sx={{marginY:5}}>
            <Grid container spacing={2}>
                <Grid item md={4}>
                <img src={require("../../../assets/extra1.jpg")} className="rounded-lg hover:cursor-pointer hover:scale-95 h-80 w-96 "  alt="" />
                </Grid>
                <Grid item md={4}>
                <img src={require("../../../assets/extra3.jpeg")} className="rounded-lg hover:cursor-pointer hover:scale-95 h-80 w-96"  alt="" />
                </Grid>
                <Grid item md={4}>
                <img src={require("../../../assets/extra6.jpeg")} className="rounded-lg hover:cursor-pointer hover:scale-95 h-80 w-96"  alt="" />
                </Grid>
                <Grid item md={4}>
                <img src={require("../../../assets/extra4.jpeg")} className="rounded-lg hover:cursor-pointer hover:scale-95 h-80 w-96"  alt="" />
                </Grid>
                <Grid item md={4}>
                <img src={require("../../../assets/extra5.jpeg")} className="rounded-lg hover:cursor-pointer hover:scale-95 h-80 w-96"  alt="" />
                </Grid>
                <Grid item md={4}>
                <img src={require("../../../assets/extra2.jpg")} className="rounded-lg hover:cursor-pointer hover:scale-95 h-80 w-96"  alt="" />
                </Grid>
                <Grid item md={4}>
                <img src={require("../../../assets/extra7.jpg")} className="rounded-lg hover:cursor-pointer hover:scale-95 h-80 w-96"  alt="" />
                </Grid>
                <Grid item md={4}>
                <img src={require("../../../assets/extra8.jpg")} className="rounded-lg hover:cursor-pointer hover:scale-95 h-80 w-96"  alt="" />
                </Grid>
                <Grid item md={4}>
                <img src={require("../../../assets/extra9.jpg")} className="rounded-lg hover:cursor-pointer hover:scale-95 h-80 w-96"  alt="" />
                </Grid>

            </Grid>
        </Container>
    )
} 
export default Extra