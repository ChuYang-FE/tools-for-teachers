import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Dice, NotFound, RandomNumber, Turntable } from "./views";

ReactDOM.render(
  // <React.StrictMode>
  <HashRouter basename={process.env.REACT_APP_BASE_URL}>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Turntable />} />
        <Route path="turntable" element={<Turntable />} />
        <Route path="dice" element={<Dice />} />
        <Route path="randomNumber" element={<RandomNumber />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HashRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
