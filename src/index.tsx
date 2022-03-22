import "./index.css";
import "./i18n";

import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  Dice,
  Excel,
  NotFound,
  RandomName,
  RandomNumber,
  Turntable,
  Word,
} from "./views";

ReactDOM.render(
  // <React.StrictMode>
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<RandomNumber />} />
        <Route path="randomNumber" element={<RandomNumber />} />
        <Route path="randomName" element={<RandomName />} />
        <Route path="turntable" element={<Turntable />} />
        <Route path="dice" element={<Dice />} />
        <Route path="excel" element={<Excel />} />
        <Route path="word" element={<Word />} />
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
