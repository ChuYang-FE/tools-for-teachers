import { Button, InputNumber, Switch, Tooltip } from "antd";
import {
  QuestionCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useState } from "react";

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
    <div>
      <h2>随机数</h2>
      <h4>随机生成指定范围内的数值：</h4>
      <div style={{ margin: "10px 0" }}>
        <InputNumber
          onChange={(value: number) => setMin(value)}
          placeholder="最小值"
        />
        <span> ~ </span>
        <InputNumber
          onChange={(value: number) => setMax(value)}
          placeholder="最大值"
        />
        <Button
          type="primary"
          onClick={handleRandom}
          style={{
            margin: "0 10px",
          }}
        >
          开始生成
        </Button>
      </div>
      <h4>本次结果：</h4>
      <h3>{result}</h3>
      <hr />
      <h4>
        历史结果：
        <Button type="primary" danger onClick={handleClear}>
          清空历史
        </Button>
      </h4>

      <div style={{ margin: "10px 0" }}>
        <span>
          缓存
          <Tooltip title="启用后，将缓存所有历史结果">
            <QuestionCircleOutlined />
          </Tooltip>
          ：
        </span>
        <Switch
          onChange={handleSwitch}
          checked={needStorage}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {historyResult.map((item, index) => (
          <div key={`${index}${item}`} style={{ minWidth: 120 }}>
            第{index + 1}次：<h3>{item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomNumber;
