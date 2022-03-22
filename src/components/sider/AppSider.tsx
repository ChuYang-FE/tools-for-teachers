import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

const subMenu = [
  {
    key: "tools",
    icon: <LaptopOutlined />,
    title: "小工具",
    menuItems: [
      {
        key: "randomNumber",
        path: "/randomNumber",
        title: "随机数",
      },
      {
        key: "randomName",
        path: "/randomName",
        title: "随机点名",
      },
      {
        key: "turntable",
        path: "/turntable",
        title: "转盘",
      },
      {
        key: "dice",
        path: "/dice",
        title: "骰子",
      },
    ],
  },
  {
    key: "docs",
    icon: <UserOutlined />,
    title: "文件处理",
    menuItems: [
      {
        key: "excel",
        path: "/excel",
        title: "Excel 文件",
      },
      {
        key: "word",
        path: "/word",
        title: "Word 文件",
      },
    ],
  },
];

const AppSider = () => {
  const keyPathString = localStorage.getItem("currentMenu") || "[]";
  const cachekeyPath = JSON.parse(keyPathString);
  const [keyPath, setKeyPath] = useState<string[]>(cachekeyPath);

  useEffect(() => {
    localStorage.setItem("currentMenu", JSON.stringify(keyPath));
  }, [keyPath]);

  const clickSubMenu = (e: { keyPath: string[] }) => {
    setKeyPath(e.keyPath);
  };

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultOpenKeys={keyPath.length > 0 ? keyPath : [subMenu[0].key]}
        defaultSelectedKeys={
          keyPath.length > 0 ? keyPath : [subMenu[0].menuItems[0].key]
        }
        style={{ height: "100%", borderRight: 0 }}
        onSelect={clickSubMenu}
      >
        {subMenu.map((item) => {
          const { key, icon, title, menuItems } = item;
          return (
            <SubMenu key={key} icon={icon} title={title}>
              {menuItems.map((subItem) => {
                const { key, path, title } = subItem;
                return (
                  <Menu.Item key={key}>
                    <Link to={path}>{title}</Link>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default AppSider;
