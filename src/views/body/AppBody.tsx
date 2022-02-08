import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { AppSider } from "../../components";
import Dice from "../Dice";
import RandomNumber from "../RandomNumber";
import Turntable from "../Turntable";

const { Content } = Layout;

const AppBody = () => {
  return (
    <Layout>
      <AppSider />
      <Layout style={{ padding: "24px" }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <Routes>
            <Route path="/turntable" element={<Turntable />} />
            <Route path="/dice" element={<Dice />} />
            <Route path="/randomNumber" element={<RandomNumber />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppBody;
