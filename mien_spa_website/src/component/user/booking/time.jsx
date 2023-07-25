import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Button,Box ,Tabs,AppBar} from "@mui/material";
import {  TabCustomTime, tabNumber, TabPanel } from "../../../util/custom";
import moment from "moment-timezone";
import "moment/min/locales";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Time = (props) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [timeChose, setTimeChose] = useState({
    hour: "",
    day: "",
    date: "",
    month: "",
    year: "",
    startDate:"",
    endDate:""
  });

  const dateList = [0, 1, 2, 3, 4, 5, 6, 7].map((id) => {
    return {
      time: new Date(
        moment().utc().tz("Asia/Ho_Chi_Minh").add(id, "d").format("LLLL")
      ),
      timeList: [
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 8, minute: 0 })
            .format("LLLL")
        ),
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 9, minute: 0 })
            .format("LLLL")
        ),
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 10, minute: 0 })
            .format("LLLL")
        ),
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 11, minute: 0 })
            .format("LLLL")
        ),
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 12, minute: 0 })
            .format("LLLL")
        ),
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 13, minute: 0 })
            .format("LLLL")
        ),
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 14, minute: 0 })
            .format("LLLL")
        ),
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 15, minute: 0 })
            .format("LLLL")
        ),
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 16, minute: 0 })
            .format("LLLL")
        ),
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 17, minute: 0 })
            .format("LLLL")
        ),
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 18, minute: 0 })
            .format("LLLL")
        ),
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 19, minute: 0 })
            .format("LLLL")
        ),
        new Date(
          moment().utc()
            .tz("Asia/Ho_Chi_Minh")
            .add(id, "d")
            .set({ hour: 20, minute: 0 })
            .format("LLLL")
        ),
      ],
    };
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    props.parentCallbackTime(timeChose);
  }, [timeChose]);

  const weekday = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  const month = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];


 
  return (
    <Box>
      <AppBar position="static" className="bg-slate-50 m-2">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          visibleScrollbar={true}
          allowScrollButtonsMobile={true}
          indicatorColor=""
        >
          {dateList.map((d, index) => (
            <TabCustomTime
              label={
                weekday[d.time.getUTCDay()] +
                ", " +
                d.time.getDate() +
                "/" +
                month[d.time.getUTCMonth()]
              }
              {...tabNumber(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {dateList.map((date, index) => (
          <TabPanel value={value} index={index} dir={theme.direction}>
            <Box className="flex flex-wrap justify-center items-center ">
              {date.timeList.map((time) =>
                new Date(
                  moment().tz("Asia/Ho_Chi_Minh").format("LLLL").valueOf()
                ) < time.getTime() ? (
                  time.getHours() !== timeChose.hour ||
                  time.getDate() !== timeChose.date ? (
                    <Button
                      className="w-20  h-14 text-rose-600 border-rose-600 m-2"
                      variant="outlined"
                      onClick={() => {
                        setTimeChose({
                          
                          hour: time.getHours(),
                          day: weekday[time.getUTCDay()],
                          date: time.getDate(),
                          month: month[time.getUTCMonth()],
                          year: time.getFullYear(),
                          endDate:(time.setHours(time.getHours()+1)),
                          startDate:(time.setHours(time.getHours()-1))
                        });
                        props.parentCallback();
                      }}
                    >
                      {time.getHours()}:00
                    </Button>
                  ) : (
                    <Button
                      className="w-20  h-14 text-slate-50  bg-rose-400 m-2"
                      variant="outlined"
                      onClick={() =>
                        setTimeChose({ hour: "", date: "", day: "", month: "",year:"",startDate:"",endDate:"" })
                      }
                    >
                      {time.getHours()}:00
                    </Button>
                  )
                ) : (
                  <Button
                    className="w-20  h-14 text-slate-600 border-slate-600 m-2"
                    variant="outlined"
                    disabled
                  >
                    {time.getHours()}:00
                  </Button>
                )
              )}
            </Box>
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  );
};
export default Time;
