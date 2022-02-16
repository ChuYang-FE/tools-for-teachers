import { useState, useRef } from "react";

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
  Radio,
  message,
  Popconfirm,
} from "antd";

import {
  QuestionCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { ResultBox } from "./style";

const { TextArea } = Input;

interface SaveNameObj {
  title: string;
  value: string[];
}

const RandomName = () => {
  const randomNameHistoryRes = localStorage.getItem("randomNameHistoryRes");
  const randomNameNeedStorage = localStorage.getItem("randomNameNeedStorage");
  const randomNameAllSavedList = localStorage.getItem("randomNameAllSavedList");

  const [popoverVisible, setPopoverVisible] = useState(false);
  const [namesArray, setNamesArray] = useState<string[]>([]);
  const [listName, setListName] = useState("");

  // 已保存的名单
  const [allSavedList, setAllSavedList] = useState<SaveNameObj[]>(
    randomNameAllSavedList ? JSON.parse(randomNameAllSavedList) : []
  );

  // 已选中的名单
  const [currentSelectedObj, setCurrentSelectedObj] = useState({
    title: "",
    value: [],
  });

  const [result, setResult] = useState("暂无");

  const [needStorage, setNeedStorage] = useState<boolean>(
    randomNameNeedStorage ? JSON.parse(randomNameNeedStorage) : false
  );
  const [historyResult, setHistoryResult] = useState<string[]>(
    needStorage && randomNameHistoryRes ? JSON.parse(randomNameHistoryRes) : []
  );

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

  const handleInputChange = (e: { target: { value: string } }) => {
    const finalRes = e.target.value
      .trim()
      .split("\n")
      .filter((item: any) => item !== "");
    setNamesArray(finalRes);

    // to unselect radio when inputing
    setCurrentSelectedObj({ title: "", value: [] });
  };

  const inputEl = useRef<Input>(null);
  const handleFocusInput = () => {
    // TODO：待优化，点击获取焦点时popover还没完全弹出，导致无法获取焦点。暂时用定时器解决。
    setTimeout(() => {
      inputEl.current?.focus();
    }, 200);
  };

  const saveList = () => {
    setPopoverVisible(false);
    if (namesArray.length === 0) {
      message.error("列表为空！");
      return;
    }
    const currentObj = {
      title: listName,
      value: namesArray,
    };
    localStorage.setItem(
      "randomNameAllSavedList",
      JSON.stringify([...allSavedList, currentObj])
    );
    setAllSavedList([...allSavedList, currentObj]);
    setListName("");
    message.success(`保存 “${listName}” 成功`);
  };

  const removeSavedList = (title: string) => {
    const restSavedList = allSavedList.filter((item) => item.title !== title);
    if (title === currentSelectedObj.title) {
      setNamesArray([]);
    }
    setAllSavedList(restSavedList);
    localStorage.setItem(
      "randomNameAllSavedList",
      JSON.stringify(restSavedList)
    );
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
      {allSavedList.length > 0 && (
        <Card title="已保存名单">
          <Radio.Group
            onChange={(e) => {
              setCurrentSelectedObj(e.target.value);
              // e.target.value: { "title": "class 1", "value": [] }
              setNamesArray(e.target.value.value);
            }}
            value={currentSelectedObj}
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {allSavedList.map((item, index) => (
              <div key={`${item.title}-${index}`} style={{ marginRight: 14 }}>
                <Radio value={item}>{item.title}</Radio>
                <Popconfirm
                  title={`确定删除“${item.title}”吗？`}
                  onConfirm={() => removeSavedList(item.title)}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button type="link">删除</Button>
                </Popconfirm>
              </div>
            ))}
          </Radio.Group>
        </Card>
      )}
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
                  <Input
                    placeholder="列表名称"
                    ref={inputEl}
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                  />
                  <Button type="link" onClick={saveList}>
                    确定
                  </Button>
                </Space>
              }
              trigger="click"
              visible={popoverVisible}
              onVisibleChange={popoverVisibleChange}
            >
              <Button type="default" onClick={handleFocusInput}>
                保存
              </Button>
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
        <ResultBox>{result}</ResultBox>
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
              <div key={`${index}-${item}`} style={{ minWidth: 120 }}>
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
