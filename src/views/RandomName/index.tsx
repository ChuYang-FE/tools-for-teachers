import { useState, useEffect } from "react";

import {
  Switch,
  Tooltip,
  Button,
  Input,
  Tag,
  Space,
  Card,
  Badge,
  Popover,
  Empty,
} from "antd";
import {
  QuestionCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const RandomName = () => {
  const randomNameHistoryRes = localStorage.getItem("randomNameHistoryRes");
  const randomNameNeedStorage = localStorage.getItem("randomNameNeedStorage");

  const [popoverVisible, setPopoverVisible] = useState(false);

  const [namesArray, setNamesArray] = useState([]);
  const [result, setResult] = useState(0);

  const [needStorage, setNeedStorage] = useState(
    randomNameNeedStorage ? JSON.parse(randomNameNeedStorage) : false
  );
  const [historyResult, setHistoryResult] = useState(
    randomNameNeedStorage && randomNameHistoryRes
      ? JSON.parse(randomNameHistoryRes)
      : []
  );

  useEffect(() => {
    console.log(namesArray);
  }, [namesArray]);

  const handleRandom = () => {
    // the range of Math.random() is [0, 1)
    const randomIndex = Math.floor(namesArray.length * Math.random());
    const res = namesArray[randomIndex];
    setResult(res);
    const allRes = [...historyResult, res];
    setHistoryResult(allRes);
    localStorage.setItem("randomNameHistoryRes", JSON.stringify(allRes));
  };

  const handleClear = () => {
    setHistoryResult([]);
    localStorage.removeItem("randomNameHistoryRes");
  };

  const handleSwitch = (checked: boolean) => {
    setNeedStorage(checked);
    localStorage.setItem("randomNameNeedStorage", JSON.stringify(checked));
  };

  const handleInputChange = (e: { target: { value: any } }) => {
    const finalRes = e.target.value
      .trim()
      .split("\n")
      .filter((item: any) => item !== "");
    setNamesArray(finalRes);
  };

  const saveList = () => {
    setPopoverVisible(false);
  };

  const popoverVisibleChange = (visible: boolean) => {
    setPopoverVisible(visible);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <h2>随机点名</h2>
      <div>
        <TextArea
          showCount
          maxLength={5000}
          autoSize={{ minRows: 5, maxRows: 10 }}
          onChange={handleInputChange}
          placeholder="请输入内容，一行即一项"
        />
      </div>
      <div>
        <Card
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <Space>
                <span>生成列表</span>
                <Badge
                  count={namesArray.length || 0}
                  style={{ backgroundColor: "#52c41a" }}
                />
              </Space>
            </div>
          }
          extra={
            <Popover
              placement="left"
              content={
                <Space>
                  <Input placeholder="列表名称" />
                  <Button type="link" onClick={saveList}>
                    确定
                  </Button>
                </Space>
              }
              // title="列表名称"
              trigger="click"
              visible={popoverVisible}
              onVisibleChange={popoverVisibleChange}
            >
              <Button type="default">保存</Button>
            </Popover>
          }
        >
          {namesArray.length === 0 ? (
            <Empty />
          ) : (
            namesArray.map((item, index) => (
              <Tag
                key={`${item}-${index}`}
                style={{ margin: 5 }}
                color="#6773D8"
              >
                {item}
              </Tag>
            ))
          )}
        </Card>
      </div>
      <Space direction="vertical" align="center" style={{ width: "100%" }}>
        <Button type="primary" onClick={handleRandom}>
          抽取
        </Button>
        <ArrowDownOutlined />
        <div
          style={{
            minWidth: 180,
            minHeight: 48,
            padding: 2,
            boxSizing: "border-box",
            backgroundColor: "#aef062",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 24,
          }}
        >
          {result}
        </div>
      </Space>
      <Card
        bodyStyle={{ maxHeight: 300, overflow: "auto" }}
        title="历史结果"
        extra={
          <Space>
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
            <Button type="primary" danger onClick={handleClear}>
              清空历史
            </Button>
          </Space>
        }
      >
        {historyResult.length ? (
          <Space wrap>
            {historyResult.map((item: any, index: number) => (
              <div key={`${index}${item}`} style={{ minWidth: 120 }}>
                第{index + 1}次：<h3>{item}</h3>
              </div>
            ))}
          </Space>
        ) : (
          <Empty />
        )}
      </Card>
    </Space>
  );
};



export default RandomName;
