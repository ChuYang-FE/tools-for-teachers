import { Layout } from "antd";

import "./App.css";

// import { AppHeader } from "./components";
import { AppBody } from "./views";

const App = () => (
  <Layout style={{ width: "100%", height: "100%" }}>
    {/* <AppHeader /> */}
    <AppBody />
  </Layout>
);

export default App;
