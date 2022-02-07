import { Layout, Menu } from "antd";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">抽奖</Menu.Item>
        <Menu.Item key="2">文件处理</Menu.Item>
        {/* <Menu.Item key="3">nav 3</Menu.Item> */}
      </Menu>
    </Header>
  );
};

export default AppHeader;
