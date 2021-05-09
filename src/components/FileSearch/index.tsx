import { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import useKeyPress from "../../hooks/useKeyPress";
import "./index.less";

interface Props {
  title: string;
  onSearchConfirm: (value: any) => void;
}

const FileSearch = (props: Props) => {
  const { title, onSearchConfirm } = props;

  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState("");

  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);

  const closeSearch = () => {
    setInputActive(false);
    setValue("");
    onSearchConfirm("");
  };

  useEffect(() => {
    if (enterPressed && inputActive) {
      onSearchConfirm(value);
    }
    if (escPressed && inputActive) {
      closeSearch();
    }
  });

  return (
    <div className="fileSearchContainer">
      {!inputActive ? (
        <div className="defaultBtn" onClick={() => setInputActive(true)}>
          <span>{title}</span>
          <SearchOutlined style={{ marginLeft: "20px" }} />
        </div>
      ) : (
        <div className="searchWrapper">
          <Input
            autoFocus
            allowClear
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={closeSearch}>
            <CloseOutlined />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileSearch;
