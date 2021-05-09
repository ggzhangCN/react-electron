import { Fragment } from "react";
import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import TabList from "../../components/TabList";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./index.less";

interface Props {
  openedFiles: any[];
  activeFile: any;
  unsaveedFileIds: string[];
  onTabClick: (fileId: string) => void;
  onCloseTab: (fileId: string) => void;
  onFileChange: (fileId: string, value: any) => void;
  onSaveCurrentFile: () => void;
}

const Content = (props: Props) => {
  const {
    openedFiles,
    activeFile,
    unsaveedFileIds,
    onTabClick,
    onCloseTab,
    onFileChange,
    onSaveCurrentFile,
  } = props;

  return (
    <div className="contentContainer">
      {!activeFile ? (
        <div className="startpage">选择或者创建新的MarkDown文档</div>
      ) : (
        <Fragment>
          <TabList
            files={openedFiles}
            activeId={activeFile.id}
            unsaveIds={unsaveedFileIds}
            onTabClick={(activeKey) => onTabClick(activeKey)}
            onCloseTab={(key) => onCloseTab(key)}
          />
          <SimpleMDE
            key={activeFile && activeFile.id}
            value={activeFile && activeFile.body}
            onChange={(val) => onFileChange(activeFile.id, val)}
            options={{
              minHeight: "480px",
            }}
          />
          <div className="saveFileBtn">
            <Button
              style={{ background: blue[6] }}
              icon={<SaveOutlined />}
              block
              onClick={onSaveCurrentFile}
            >
              保存
            </Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Content;
