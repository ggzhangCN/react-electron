import { Button } from "antd";
import { FileAddOutlined, ImportOutlined } from "@ant-design/icons";
import { blue, green } from "@ant-design/colors";
import FileSearch from "../FileSearch/index";
import FileList from "../FileList";
import "./index.less";

interface Props {
  files: any[];
  onFileClick: (fileId: string) => void;
  onFileDelete: (fileId: string) => void;
  updateFileName: (fileId: string, title: any, isNew: boolean) => void;
  onFileSearch: (keyWords: any) => void;
  onCreateNewFile: () => void;
}

const Sider = (props: Props) => {
  const {
    files,
    onFileClick,
    onFileDelete,
    updateFileName,
    onFileSearch,
    onCreateNewFile,
  } = props;

  return (
    <div className="siderContainer">
      <FileSearch
        title="我的云文档"
        onSearchConfirm={(value) => {
          onFileSearch(value);
        }}
      />
      <FileList
        files={files}
        onFileClick={(id) => {
          onFileClick(id);
        }}
        onSaveEdit={(id, title, isNew) => {
          updateFileName(id, title, isNew);
        }}
        onFileDelete={(id) => {
          onFileDelete(id);
        }}
      />
      <div className="bottomBtns">
        <div className="fileAdd">
          <Button
            style={{ background: blue[6] }}
            icon={<FileAddOutlined />}
            block
            onClick={onCreateNewFile}
            disabled={files.some((file) => file.isNew)}
          >
            新建
          </Button>
        </div>
        <div className="fileImport">
          <Button
            style={{ background: green[6] }}
            icon={<ImportOutlined />}
            block
          >
            导入
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sider;
