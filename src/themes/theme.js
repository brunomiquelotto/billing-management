import { createTheme } from "@mui/material/styles";

const appTheme = createTheme({
  typography: {
    "letterSpacing": 0.32,
    useNextVariants: true,
    h6: {
      fontWeight: 600,
      color: '#fff',
    },
    h5: {
      fontSize: 21,
      flexGrow: 1, 
      marginLeft: 2,
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1c4e80",
          color: "white",
          position: "fixed"
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: 18,
          fontWeight: 600,
          color: '#073857',
        },
        body: {
          fontSize: 15,
          color: '#073857',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#073857",
        },
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        colorPrimary: {
          main: "#fff"
        },
        colorSecondary: {
          main: "#073857"
        },
      }
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          padding: 5
        },
        elevation2: {
          padding: 15
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#073857"
    },
  }
});

export default appTheme;