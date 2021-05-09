import { useEffect, useState } from "react";
import { Input, Button, Tooltip } from "antd";
import {
  FileMarkdownOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import useKeyPress from "../../hooks/useKeyPress";
import "./index.less";

interface Props {
  files: any[];
  onFileClick: (id: string) => void;
  onSaveEdit: (id: string, title: string, isNew: boolean) => void;
  onFileDelete: (id: string) => void;
}

const FileList = (props: Props) => {
  const { files, onFileClick, onSaveEdit, onFileDelete } = props;

  const [editStatus, setEditStatus] = useState("");
  const [value, setValue] = useState("");

  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);

  const closeEdit = () => {
    if (files.find((file) => file.id === editStatus).isNew) {
      onFileDelete(editStatus);
    }
    setEditStatus("");
    setValue("");
  };

  useEffect(() => {
    const editItem = files.find((file) => file.id === editStatus);
    if (enterPressed && editStatus && value.trim() !== "") {
      onSaveEdit(editItem.id, value, editItem.isNew);
      setEditStatus("");
      setValue("");
    }
    if (escPressed && editStatus) {
      closeEdit();
    }
  });

  useEffect(() => {
    const newFile = files.find((file) => file.isNew);
    if (newFile) {
      setEditStatus(newFile.id);
      setValue(newFile.title);
    }
  }, [files]);

  return (
    <div className="fileListContainer">
      {files.map((file) => {
        return file.id !== editStatus && !file.isNew ? (
          <div className="fileItem" key={file.id}>
            <FileMarkdownOutlined />
            <span
              className="fileTitle"
              onClick={() => {
                onFileClick(file.id);
              }}
            >
              <Tooltip title={file.title}>{file.title}</Tooltip>
            </span>
            <EditOutlined
              onClick={() => {
                setEditStatus(file.id);
                setValue(file.title);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onFileDelete(file.id);
              }}
            />
          </div>
        ) : (
          <div className="editItem" key={file.id}>
            <Input
              autoFocus
              allowClear
              placeholder="请输入文件名称"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button onClick={closeEdit}>
              <CloseOutlined />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default FileList;
