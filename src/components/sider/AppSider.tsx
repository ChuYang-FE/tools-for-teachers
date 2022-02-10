import { Layout, Menu } from "antd";

import { UserOutlined, LaptopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

const AppSider = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["turntable"]}
        defaultOpenKeys={["tools"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <SubMenu key="tools" icon={<LaptopOutlined />} title="小工具">
          <Menu.Item key="turntable">
            <Link to={"/turntable"}>转盘</Link>
          </Menu.Item>
          <Menu.Item key="dice">
            <Link to={"/dice"}>骰子</Link>
          </Menu.Item>
          <Menu.Item key="randomNumber">
            <Link to={"/randomNumber"}>随机数</Link>
          </Menu.Item>
          <Menu.Item key="randomName">
            <Link to={"/randomName"}>随机点名</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="doc" icon={<UserOutlined />} title="文件处理">
          <Menu.Item key="excel">Excel 文件</Menu.Item>
          <Menu.Item key="word">Word 文件</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default AppSider;
