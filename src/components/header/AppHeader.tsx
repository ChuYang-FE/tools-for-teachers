import { Layout, Radio, RadioChangeEvent } from "antd";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import { Locale } from "antd/lib/locale-provider";
import { useTranslation } from "react-i18next";

const { Header } = Layout;

type Props = {
  changeLocale: (e: RadioChangeEvent) => void;
  locale: Locale | undefined;
};

const AppHeader = ({ changeLocale, locale }: Props) => {
  const { t } = useTranslation();

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "space-between",
        backgroundColor: "#fff",
      }}
    >
      <h1>{t("Welcome")}</h1>
      <div className="change-locale">
        <span style={{ marginRight: 16 }}>语言: </span>
        <Radio.Group value={locale} onChange={changeLocale}>
          <Radio.Button key="cn" value={zhCN}>
            中文
          </Radio.Button>
          <Radio.Button key="en" value={enUS}>
            English
          </Radio.Button>
        </Radio.Group>
        <div>HeaderRight</div>
        <div>github url</div>
      </div>
    </Header>
  );
};

export default AppHeader;
