import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../src/App.css";
import { Provider } from "react-redux";
import { store } from "./Modules/Store/Store";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./Modules/ThemeProvider/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </StrictMode>
);
