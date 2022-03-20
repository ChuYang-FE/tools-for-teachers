import { useState } from "react";

import { ConfigProvider, Layout, RadioChangeEvent } from "antd";

import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";

import "moment/locale/zh-cn";
import "moment/locale/zh-cn";

import { AppBody } from "./views";
import { AppHeader } from "./components";
import "./App.css";

moment.locale("en");

const App = () => {
  const [locale, setLocale] = useState(zhCN);

  const changeLocale = (e: RadioChangeEvent) => {
    const localeValue = e.target.value;
    console.log(localeValue);
    setLocale(localeValue);
    if (!localeValue) {
      moment.locale("zh-cn");
    } else {
      moment.locale("en");
    }
  };

  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <ConfigProvider locale={locale}>
        <AppHeader changeLocale={changeLocale} locale={locale} />
        <AppBody key={locale ? locale.locale : "en"} />
      </ConfigProvider>
    </Layout>
  );
};

export default App;
