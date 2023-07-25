import {
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchOrderByWeek } from "../../redux/orderPro/orderThunk";
import moment from "moment-timezone";
import "moment/min/locales";
import { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Chart = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const timeList = [
    new Date(moment().tz("Asia/Ho_Chi_Minh").subtract(0, "d")),
    new Date(moment().tz("Asia/Ho_Chi_Minh").subtract(1, "d")),
    new Date(moment().tz("Asia/Ho_Chi_Minh").subtract(2, "d")),
    new Date(moment().tz("Asia/Ho_Chi_Minh").subtract(3, "d")),
    new Date(moment().tz("Asia/Ho_Chi_Minh").subtract(4, "d")),
    new Date(moment().tz("Asia/Ho_Chi_Minh").subtract(5, "d")),
    new Date(moment().tz("Asia/Ho_Chi_Minh").subtract(6, "d")),
  ];

  useEffect(() => {
    dispatch(fetchOrderByWeek(timeList)).then((res) => {
      setData(res.payload);
    });
  }, [dispatch]);


  const tooltip = { enable: true, shared: false };
  const primaryyAxis = { labelFormat: "${value} VNĐ", };
  const primarxyAxis = { valueType: "Category" };
  const marker = { dataLabel: { visible: true } };
  return (
    <div>
      {data === undefined ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      <ChartComponent
      title="Biểu đồ doanh thu trong tuần"
        id="charts"
        primaryXAxis={primarxyAxis}
        primaryYAxis={primaryyAxis}
        tooltip={tooltip}
      >
        <Inject
          services={[ColumnSeries, DataLabel, Tooltip, LineSeries, Category]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data}
            xName="date"
            yName="total"
            type="Column"
            marker={marker}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
      
    </div>
  );
};

export default Chart;
