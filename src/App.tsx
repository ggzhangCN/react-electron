import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import Sider from "./components/Sider";
import Content from "./components/Content";
import UUID from "uuid-js";
import "./App.less";

import { defaultFiles } from "./utils/defaultFiles";
import { flattenArr, objToArr } from "./utils/helper";
import fileHelper from "./utils/fileHelper";
const { join } = window.require("path");
const { remote } = window.require("electron");

function App() {
  const [files, setFiles] = useState<any>(flattenArr(defaultFiles));
  const [searchFiles, setSearchFiles] = useState<any[]>([]);
  const [activeFileId, setActiveFileId] = useState("");
  const [openedFileIds, setOpenedFileIds] = useState<string[]>([]);
  const [unsaveedFileIds, setUnsaveFileIds] = useState<string[]>([]);

  const filesArr = objToArr(files);

  const savedLocation = remote.app.getPath("documents");

  const openedFiles = openedFileIds.map((fileId) => files[fileId]);
  const activeFile = files[activeFileId];
  const fileList = searchFiles.length ? searchFiles : filesArr;

  const fileClick = (fileId: string) => {
    setActiveFileId(fileId);
    if (!openedFileIds.includes(fileId)) {
      setOpenedFileIds([...openedFileIds, fileId]);
    }
  };

  const closeTab = (fileId: string) => {
    const tabs = openedFileIds.filter((id) => id !== fileId);
    setOpenedFileIds(tabs);
    if (tabs.length) {
      fileId === activeFileId && setActiveFileId(tabs[0]);
    } else {
      setActiveFileId("");
    }
  };

  const fileDelete = (fileId: string) => {
    delete files[fileId];
    setFiles(files);
    closeTab(fileId);
  };

  const tabClick = (fileId: string) => {
    setActiveFileId(fileId);
  };

  const fileChange = (fileId: string, val: any) => {
    const newFile = { ...files[fileId], body: val };
    setFiles({ ...files, [fileId]: newFile });
    if (!unsaveedFileIds.includes(fileId)) {
      setUnsaveFileIds([...unsaveedFileIds, fileId]);
    }
  };

  const updateFileName = (fileId: string, title: any, isNew: boolean) => {
    const modifiedFile = { ...files[fileId], title, isNew: false };
    if (isNew) {
      fileHelper
        .writeFile(join(savedLocation, `${title}.md`), files[fileId].body)
        .then(() => {
          setFiles({ ...files, [fileId]: modifiedFile });
        });
    } else {
      fileHelper
        .renameFile(
          join(savedLocation, `${files[fileId].title}.md`),
          join(savedLocation, `${title}.md`)
        )
        .then(() => {
          setFiles({ ...files, [fileId]: modifiedFile });
        });
    }
  };

  const fileSearch = (keyWords: any) => {
    const newFiles = filesArr.filter((file) => file.title.includes(keyWords));
    setSearchFiles(newFiles);
  };

  const createNewFile = () => {
    const newId = UUID.create().toString();
    setFiles({
      ...files,
      [newId]: {
        id: newId,
        title: "",
        body: "## 请输入 MarkDown",
        createdAt: new Date().getTime(),
        isNew: true,
      },
    });
  };

  const saveCurrentFile = () => {
    fileHelper
      .writeFile(join(savedLocation, `${activeFile.title}.md`), activeFile.body)
      .then(() => {
        setUnsaveFileIds(unsaveedFileIds.filter((id) => id !== activeFileId));
      });
  };

  return (
    <Row style={{ width: "100%", height: "100%" }}>
      <Col xs={7} xl={6} style={{ background: "#fafafa", height: "100%" }}>
        <Sider
          files={fileList}
          onFileClick={fileClick}
          onFileDelete={fileDelete}
          updateFileName={updateFileName}
          onFileSearch={fileSearch}
          onCreateNewFile={createNewFile}
        />
      </Col>
      <Col xs={17} xl={18} style={{ height: "100%" }}>
        <Content
          openedFiles={openedFiles}
          activeFile={activeFile}
          unsaveedFileIds={unsaveedFileIds}
          onTabClick={tabClick}
          onCloseTab={closeTab}
          onFileChange={fileChange}
          onSaveCurrentFile={saveCurrentFile}
        />
      </Col>
    </Row>
  );
}

export default App;
