import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchOrderProByDate } from "../../redux/orderPro/orderThunk";
import { fetchOrderSerByDate } from "../../redux/orderSer/orderThunk";
import { date, formatter } from "../../util/custom";

const RevenueFilter = () => {
  const month = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  const dateValue = new Date(date);
  const dispatch = useDispatch();
  const [dateFilter, setDateFilter] = useState(dateValue);
  const [dataOrderSer, setDataOrderSer] = useState();
  const [dataOrderPro, setDataOrderPro] = useState();

  useEffect(() => {
    dispatch(
      fetchOrderSerByDate(
        dateFilter.getFullYear() +
          "-" +
          String(month[dateValue.getUTCMonth()]).padStart(2, "0") +
          "-" +
          String(dateFilter.getDate()).padStart(2, "0")
      )
    ).then((res) => {
      setDataOrderSer(res.payload);
    });
    dispatch(
      fetchOrderProByDate(
        dateFilter.getFullYear() +
          "-" +
          String(month[dateValue.getUTCMonth()]).padStart(2, "0") +
          "-" +
          String(dateFilter.getDate()).padStart(2, "0")
      )
    ).then((res) => {
      setDataOrderPro(res.payload);
    });
  }, []);
  const hanldeFilter = () => {
    dispatch(
      fetchOrderSerByDate(
        dateFilter.getFullYear() +
          "-" +
          String(month[dateValue.getUTCMonth()]).padStart(2, "0") +
          "-" +
          String(dateFilter.getDate()).padStart(2, "0")
      )
    ).then((res) => {
      setDataOrderSer(res.payload);
    });
    dispatch(
      fetchOrderProByDate(
        dateFilter.getFullYear() +
          "-" +
          String(month[dateValue.getUTCMonth()]).padStart(2, "0") +
          "-" +
          String(dateFilter.getDate()).padStart(2, "0")
      )
    ).then((res) => {
      setDataOrderPro(res.payload);
    });
  };

  return (
    <Paper className="my-12 py-12" elevation={6}>
      <Container maxWidth="xl">
        <Typography
          align="center"
          className="font-bold text-slate-700 text-xl mb-6"
        >
          Tìm kiếm hóa đơn doanh thu theo ngày
        </Typography>
        <Stack
          direction={"row"}
          justifyContent="center"
          alignItems={"center"}
          spacing={6}
          className="border-double  border-4 border-rose-300 rounded-lg p-3	"
        >
          <DatePickerComponent
            id="datepicker"
            placeholder="Tìm kiếm doanh thu theo ngày"
            format="dd-MM-yyyy"
            width={"30%"}
            value={dateValue}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          <Button
            className="bg-rose-400 hover:bg-rose-500 text-slate-50"
            onClick={hanldeFilter}
          >
            LỌC
          </Button>
        </Stack>
        <Divider className="mb-8 mt-6" />
        {dataOrderPro || dataOrderSer ? (
          <div>
            <Stack
              direction={"row"}
              justifyContent="center"
              alignItems={"center"}
              spacing={6}
            >
              <div>
                <Typography
                  align="center"
                  className="font-bold text-slate-700  mb-4"
                >
                  Doanh thu SPA
                </Typography>
                <Box sx={{ width: 500, height: 250 }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            className="bg-rose-600 text-slate-50"
                          >
                            Mã hóa đơn dịch vụ
                          </TableCell>

                          <TableCell className="bg-rose-600 text-slate-50">
                            Gía trị hóa đơn
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataOrderSer?.map((data) => (
                          <TableRow>
                            <TableCell align="center">
                              {data?.orSerId}
                            </TableCell>
                            <TableCell align="center" className="text-red-500">
                              {formatter.format(data?.orSer_Total)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography align="center" className=" mt-6">
                    Tổng tiền:{" "}
                    <b className="text-red-500">
                      {formatter.format(
                        dataOrderSer?.reduce(
                          (preValue, currentValue) =>
                            preValue + currentValue.orSer_Total,
                          0
                        )
                      )}
                    </b>
                  </Typography>
                </Box>
              </div>
              <div>
              <Typography
                  align="center"
                  className="font-bold text-slate-700  mb-4"
                >
                  Doanh thu mỹ phẩm
                </Typography>
                <Box sx={{ width: 500, height: 250 }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="center"
                            className="bg-rose-600 text-slate-50"
                          >
                            Mã đơn hàng
                          </TableCell>

                          <TableCell className="bg-rose-600 text-slate-50">
                            Gía trị đơn hàng
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataOrderPro?.map((data) => (
                          <TableRow>
                            <TableCell align="center">
                              {data?.orProId}
                            </TableCell>
                            <TableCell align="center" className="text-red-500">
                              {formatter.format(data?.orProTotal)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography align="center" className=" mt-6">
                    Tổng tiền:{" "}
                    <b className="text-red-500">
                      {formatter.format(
                        dataOrderPro?.reduce(
                          (preValue, currentValue) =>
                            preValue + currentValue.orProTotal,
                          0
                        )
                      )}
                    </b>
                  </Typography>
                </Box>
              </div>
            </Stack>
            <Divider className="my-6" />
            <Typography align="center" className=" mt-6 text-xl">
              Tổng doanh thu :{" "}
              <b className="text-red-500 text-3xl">
                {formatter.format(
                  dataOrderPro?.reduce(
                    (preValue, currentValue) =>
                      preValue + currentValue.orProTotal,
                    0
                  ) +
                    dataOrderSer?.reduce(
                      (preValue, currentValue) =>
                        preValue + currentValue.orSer_Total,
                      0
                    )
                )}
              </b>
            </Typography>
          </div>
        ) : null}
      </Container>
    </Paper>
  );
};
export default RevenueFilter;
