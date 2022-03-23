import { Layout, Select } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import { useEffect, useState } from "react";
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
        alignItems: "space-between",
        backgroundColor: "#fff",
      }}
    >
      <h1>{t("Welcome")}</h1>
      <div className="change-locale">
        <span style={{ marginRight: 16 }}>语言: </span>
        <Select
          defaultValue="zh-cn"
          value={currentLang}
          style={{ width: 120 }}
          onChange={changeLocale}
        >
          <Option value="zh-cn">简体中文</Option>
          <Option value="en">English</Option>
          <Option value="disabled" disabled>
            繁體中文
          </Option>
        </Select>
        <div>HeaderRight</div>
        <div>github url</div>
      </div>
    </Header>
  );
};

export default AppHeader;
