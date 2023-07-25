import moment from "moment-timezone";
import "moment/min/locales";
import { alpha, styled } from "@mui/material/styles";
import {
  TextField,Switch,TableCell,TableRow,Box,Typography,Tab,Select,InputLabel, Dialog, DialogTitle, IconButton
} from "@mui/material";
import  { tableCellClasses } from "@mui/material/TableCell";
import CloseIcon from '@mui/icons-material/Close';

import MuiAppBar from "@mui/material/AppBar";

import { pink } from "@mui/material/colors";

export const formatter = new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  });

export const date = moment
.tz(new Date(), "Asia/Ho_Chi_Minh")
.format("LLLL");

export   const convertBase64 = (blod) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blod);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "30px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fb7185      ",
    },
  },
  "& label.Mui-focused": {
    color: "#fb7185      ",
  },
});

export const CssSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
    "&.Mui-checked": {
      color: pink[600],
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
  "& .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fda4af",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "",
  },
}));


export const TabCustomTime = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  marginBottom: 15,
  marginTop: 10,
  "&.Mui-selected": {
    backgroundColor: "#fb7185",
    color: "white",
    borderRadius: 25,
    padding: 5,
  },
}));


export function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



export function tabNumber(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}


export const CssSelect = styled(Select)({
  borderRadius: "30px",
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fb7185 ",
  },
});

export const CssInputLabel = styled(InputLabel)({
  "&.Mui-focused": {
    color: "#fb7185",
  },
});


//user
export const drawerWidth = 220;
export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export const TabCustom = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontSize: "small",
  "&.Mui-selected": {
    backgroundColor: "#fb7185      ",
  },
}));

//admin
export const drawerWidthAdmin = 240;

export const AppBarAdmin = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DrawerHeaderAdmin = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));


export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

