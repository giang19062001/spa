import * as React from "react";
import { Avatar, Paper, Typography,Table,TableBody,TableContainer,TableHead,TableRow, Button, Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../redux/auth/authSelector";
import { useState } from "react";
import {
  fetchOrderSerById,
  fetchOrderSerByUser,
  fetchOrderSerDetail,
  putOrderSer,
} from "../../../redux/orderSer/orderThunk";
import { selectListServices } from "../../../redux/serce/serviceSelector";
import { date, formatter, StyledTableCell, StyledTableRow } from "../../../util/custom.js";
import { useNavigate } from "react-router-dom";

export const OderSerComponent = () => {
  const userId = useSelector(selectUserId);
  const listServices = useSelector(selectListServices);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [dataOrder, setDataOrder] = useState([]);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [openDialogSuccess, setOpenDialogSuccess] = useState(false);

  const [dataPut, setDataPur] = useState();

  React.useEffect(() => {
    const arr = [];
    if (userId) {
      dispatch(fetchOrderSerByUser(userId)).then((res) => {
        res.payload.forEach((element) => {
          dispatch(
            fetchOrderSerDetail({ data: element, listServices: listServices })
          ).then((resFinal) => {
            arr.push(resFinal.payload);
            setDataOrder(arr);
          });
        });
      });
    }
  }, [dispatch, listServices, userId]);

  const handleOpenDialogConfirm = (id) =>{
    setOpenDialogConfirm(true)
    dispatch(fetchOrderSerById(id)).then((res)=>{
      
      setDataPur(res.payload)
    })
  }
  const handleCloseDialogConfirm = () =>{
    setOpenDialogConfirm(false)

  }
  const hanldeCloseDialogSuccess = () =>{
    setOpenDialogSuccess(false)
    navigate(0)

  }
  const hanldeUpdateStatus = () =>{
    const objPut = { ...dataPut,orSerStatus:"Hủy lịch", updatedAt: Date.parse(date) };
    dispatch(putOrderSer(objPut)).then(() => {
      setOpenDialogConfirm(false)
      setOpenDialogSuccess(true)
    });
  }
  


  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, userSelect: "none" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Dịch vụ yêu cầu</StyledTableCell>
            <StyledTableCell align="center">Ngày hẹn</StyledTableCell>
            <StyledTableCell align="center">Tổng tiền dự kiến thanh toán</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataOrder?.length === 0 ? (
            <StyledTableRow>
              <StyledTableCell align="center" colSpan={5}>
                <Typography align="center" className="text-red-500 font-bold">
                  Danh sách đặt dịch vụ trống
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            dataOrder?.map((row, index) => (
         
                <StyledTableRow key={index}>
                <StyledTableCell Cell align="center">
                  {row.services?.map((ser, indexSer) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        marginBottom: 10,
                      }}
                    >
                      <Avatar
                        variant="circular"
                        src={
                          process.env.REACT_APP_API_URL +
                          "/image/service/" +
                          ser?.seImage
                        }
                        className="w-20 h-20"
                        alt=""
                      />
                      <p>{ser?.seName}</p>
                    </div>
                  ))}
                </StyledTableCell>
 
                <StyledTableCell
                  align="center"
                  className="text-sky-500 font-bold"
                >
                  {(row.order.orSerStartTime).replace("T",' / ')}
                </StyledTableCell>
                <StyledTableCell align="center"  sx={{ color: "red", fontWeight: "900" }}>
                 
                  {formatter.format(row.order.orSer_Total)}
                </StyledTableCell>
                <StyledTableCell align="center" >
                 {row?.order?.orSerStatus === "Đang tiến hành"?(
                    <Button className="bg-orange-400 text-slate-50 hover:bg-orange-600" 
                    onClick={()=>handleOpenDialogConfirm(row?.order?.orSerId)}>Hủy lịch</Button>
                 ):row?.order?.orSerStatus === "Đã hoàn thành"?(
                   <Typography className="text-green-500 font-bold">Đã hoàn thành</Typography>
                 ):(
                  <Typography className="text-orange-400 font-bold">Đã hủy</Typography>

                 )}
                  
               </StyledTableCell>
               
              </StyledTableRow>
            
           
            ))
          )}
        </TableBody>
      </Table>
      <Dialog open={openDialogConfirm} onClose={handleCloseDialogConfirm}>
      
        <DialogContent>
        <DialogTitle>
                Thông báo
            </DialogTitle>
        <img style={{width:150,margin:"auto",display:"block"}} src={require("../../../assets/warning.png")} alt=""/>
       
        <Typography>Bạn chắc chắn muốn hủy lịch đã hẹn</Typography>
               <Button id="idButton1" onClick={hanldeUpdateStatus}> Xác nhận</Button>
        </DialogContent>
      </Dialog>
      <Dialog open={openDialogSuccess} onClose={hanldeCloseDialogSuccess}>
  
           <DialogContent>
           <img style={{width:150,margin:"auto",display:"block"}} src={require("../../../assets/stickSuccess.gif")} alt=""/>

               <Typography>Hủy lịch thành công</Typography>
               <Button id="idButton1" onClick={hanldeCloseDialogSuccess}> Đóng</Button>

           </DialogContent>
          </Dialog>
    </TableContainer>
  );
};
