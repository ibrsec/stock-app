import { createTheme } from "@mui/material";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "@emotion/react";
import { blueGrey, grey } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey["900"],
      },
      secondary: {
        main: blueGrey["900"],
      },
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
