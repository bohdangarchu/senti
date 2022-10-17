import App from "./App";
import React from "react";
import { render } from "react-dom";

const appDiv = document.getElementById("app");
render(<App name="appname" />, appDiv);
