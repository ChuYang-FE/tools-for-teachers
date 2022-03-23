import "moment/locale/zh-cn";
import "./App.css";

import { ConfigProvider, Layout } from "antd";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import { useEffect, useState } from "react";

import { AppHeader } from "./components";
import i18n from "./i18n";
import { AppBody } from "./views";

moment.locale("en");

const App = () => {
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("language") ?? "zh-cn"
  );

  const [locale, setLocale] = useState(zhCN);

  useEffect(() => {
    setLanguageData(currentLang);
  }, [currentLang]);

  const setLanguageData = (language: string) => {
    switch (language) {
      case "zh-cn":
        setLocale(zhCN);
        i18n.changeLanguage("cn");
        moment.locale("zh-cn");
        break;

      case "en":
        setLocale(enUS);
        i18n.changeLanguage("en");
        moment.locale("en");
        break;

      default:
        setLocale(zhCN);
        i18n.changeLanguage("cn");
        moment.locale("zh-cn");
        break;
    }
  };

  const changeLocale = (language: string) => {
    setCurrentLang(language);
    localStorage.setItem("language", language);
  };

  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <ConfigProvider locale={locale}>
        <AppHeader changeLocale={changeLocale} currentLang={currentLang} />
        <AppBody key={locale ? locale.locale : "zh-cn"} />
      </ConfigProvider>
    </Layout>
  );
};

export default App;
