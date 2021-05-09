import { useState } from "react";
import { Tabs, Badge } from "antd";
import "./index.less";

const { TabPane } = Tabs;

interface Props {
  files: any[];
  activeId: string;
  unsaveIds: any[];
  onTabClick: (activeKey: string) => void;
  onCloseTab: (key: string) => void;
}

const TabList = (props: Props) => {
  const { files, activeId, unsaveIds, onTabClick, onCloseTab } = props;

  return (
    <Tabs
      hideAdd
      onChange={onTabClick}
      activeKey={activeId}
      type="editable-card"
      onEdit={(key, action) => {
        if (action === "remove") {
          onCloseTab(key as string);
        }
      }}
    >
      {files.map((file) => (
        <TabPane
          tab={
            <>
              {file.title}
              {unsaveIds.includes(file.id) && <span className="unsavedot" />}
            </>
          }
          key={file.id}
        />
      ))}
    </Tabs>
  );
};

export default TabList;
