import { Routes, Route } from "react-router-dom";

import App from "./App";
const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      {/* <Route path="about" element={<About />} />
      <Route path="404" element={<NotFound />} />
      <Route path="login" element={<Login />} /> */}
    </Routes>
  );
};

export default PageRoutes;
