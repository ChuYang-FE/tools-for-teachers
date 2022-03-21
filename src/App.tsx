import "moment/locale/zh-cn";
import "./App.css";

import { ConfigProvider, Layout, RadioChangeEvent } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import { useState } from "react";

import { AppHeader } from "./components";
import i18n from "./i18n";
import { AppBody } from "./views";

moment.locale("en");

const App = () => {
  const [locale, setLocale] = useState(zhCN);

  const changeLocale = (e: RadioChangeEvent) => {
    const localeValue = e.target.value;
    setLocale(localeValue);
    if (localeValue.locale === "zh-cn") {
      i18n.changeLanguage("cn");
    } else {
      i18n.changeLanguage("en");
    }
    console.log(i18n);
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
