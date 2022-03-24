import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

const subMenu = [
  {
    key: "tools",
    icon: <LaptopOutlined />,
    title: "sidebar.title.tool",
    menuItems: [
      {
        key: "randomNumber",
        path: "/randomNumber",
        title: "sidebar.subTitle.randomNumber",
      },
      {
        key: "randomName",
        path: "/randomName",
        title: "sidebar.subTitle.randomName",
      },
      {
        key: "turntable",
        path: "/turntable",
        title: "sidebar.subTitle.turntable",
      },
      {
        key: "dice",
        path: "/dice",
        title: "sidebar.subTitle.dice",
      },
    ],
  },
  {
    key: "docs",
    icon: <UserOutlined />,
    title: "sidebar.title.doc",
    menuItems: [
      {
        key: "excel",
        path: "/excel",
        title: "sidebar.subTitle.excel",
      },
      {
        key: "word",
        path: "/word",
        title: "sidebar.subTitle.word",
      },
    ],
  },
];

const AppSider = () => {
  const keyPathString = localStorage.getItem("currentMenu") || "[]";
  const cachekeyPath = JSON.parse(keyPathString);
  const [keyPath, setKeyPath] = useState<string[]>(cachekeyPath);
  const { t } = useTranslation();

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
            <SubMenu key={key} icon={icon} title={t(title)}>
              {menuItems.map((subItem) => {
                const { key, path, title } = subItem;
                return (
                  <Menu.Item key={key}>
                    <Link to={path}>{t(title)}</Link>
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
