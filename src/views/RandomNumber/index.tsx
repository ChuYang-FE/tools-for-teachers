import {
  CheckOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, InputNumber, Space, Switch, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const RandomNumber = () => {
  const cacheRandomNumber = localStorage.getItem("cacheRandomNumber");
  const cacheNeedStorage = localStorage.getItem("cacheNeedStorage");

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [result, setResult] = useState(0);
  const [needStorage, setNeedStorage] = useState(
    cacheNeedStorage ? JSON.parse(cacheNeedStorage) : false
  );
  const [historyResult, setHistoryResult] = useState<number[]>(
    needStorage && cacheRandomNumber ? JSON.parse(cacheRandomNumber) : []
  );

  const { t } = useTranslation();

  const handleRandom = () => {
    // the range of Math.random() is [0, 1), not include 1. So need to add 1
    const res = Math.floor(min + (max - min + 1) * Math.random());
    setResult(res);
    const allRes = [...historyResult, res];
    setHistoryResult(allRes);
    localStorage.setItem("cacheRandomNumber", JSON.stringify(allRes));
  };

  const handleClear = () => {
    setHistoryResult([]);
    localStorage.removeItem("cacheRandomNumber");
  };

  const handleSwitch = (checked: boolean) => {
    setNeedStorage(checked);
    localStorage.setItem("cacheNeedStorage", JSON.stringify(checked));
  };

  return (
    <Space direction="vertical">
      <h2>{t("randomNum.title")}</h2>
      <h4>{t("randomNum.desc")}</h4>
      <Space>
        <InputNumber
          onChange={(value: number) => setMin(value)}
          placeholder={t("randomNum.min")}
        />
        <span>~</span>
        <InputNumber
          onChange={(value: number) => setMax(value)}
          placeholder={t("randomNum.max")}
        />
        <Button type="primary" onClick={handleRandom}>
          {t("randomNum.start")}
        </Button>
      </Space>
      <h4>{t("randomNum.result")}</h4>
      <h3>{result}</h3>
      <hr />
      <Space>
        <h4>{t("randomNum.history")}</h4>
        <Button type="primary" danger onClick={handleClear}>
          {t("randomNum.clearHistory")}
        </Button>
      </Space>

      <Space>
        <Space>
          <span>{t("randomNum.cache")}</span>
          <Tooltip title={t("randomNum.cacheTip")}>
            <QuestionCircleOutlined />
          </Tooltip>
        </Space>
        <Switch
          onChange={handleSwitch}
          checked={needStorage}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Space>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {historyResult.map((item, index) => (
          <div key={`${index}${item}`} style={{ minWidth: 120 }}>
            第{index + 1}次：<h3>{item}</h3>
          </div>
        ))}
      </div>
    </Space>
  );
};

export default RandomNumber;
