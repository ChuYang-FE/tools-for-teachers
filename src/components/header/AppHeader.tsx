import { GithubOutlined } from "@ant-design/icons";
import { Layout, Select, Space } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import { useTranslation } from "react-i18next";

const { Header } = Layout;
const { Option } = Select;

type Props = {
  changeLocale: (
    value: string,
    option: DefaultOptionType | DefaultOptionType[]
  ) => void;
  currentLang: string;
};

const AppHeader = ({ changeLocale, currentLang }: Props) => {
  const { t } = useTranslation();

  return (
    <Header
      style={{
        display: "flex",
        padding: "0 2.5%",
        justifyContent: "space-between",
        backgroundColor: "#fff",
      }}
    >
      <h1>{t("header.welcome")}</h1>
      <Space>
        <Select
          defaultValue="zh-cn"
          value={currentLang}
          style={{ width: 100 }}
          onChange={changeLocale}
        >
          <Option value="zh-cn">简体中文</Option>
          <Option value="en">English</Option>
          <Option value="disabled" disabled>
            繁體中文
          </Option>
        </Select>
        <GithubOutlined
          style={{ fontSize: 20 }}
          onClick={() =>
            window.open(
              "https://github.com/ChuYang-FE/tools-for-teachers",
              "_blank"
            )
          }
        />
      </Space>
    </Header>
  );
};

export default AppHeader;
