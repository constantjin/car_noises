import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

import App from "./App";

// Axios base config
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
