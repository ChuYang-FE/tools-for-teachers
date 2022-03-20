import { Layout, Radio, RadioChangeEvent } from "antd";

import { Locale } from "antd/lib/locale-provider";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";

const { Header } = Layout;

type Props = {
  changeLocale: (e: RadioChangeEvent) => void;
  locale: Locale | undefined;
};

const AppHeader = ({ changeLocale, locale }: Props) => {
  return (
    <Header style={{ display: "flex", alignItems: "space-between" }}>
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
