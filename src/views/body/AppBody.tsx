import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { AppSider } from "../../components";

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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppBody;
