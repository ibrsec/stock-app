import { createTheme } from "@mui/material";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "@emotion/react";
import { blueGrey, grey } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { PersistGate } from "redux-persist/lib/integration/react";

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
          <PersistGate loading={null} persistor={persistor} >

          <AppRouter />
          </PersistGate>
        </Provider>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
