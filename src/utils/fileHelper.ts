const fs = window.require("fs").promises;

const fileHelper = {
  readFile: (path: string) => {
    return fs.readFile(path, { encoding: "utf-8" });
  },
  writeFile: (path: string, content: any) => {
    return fs.writeFile(path, content, { encoding: "utf-8" });
  },
  renameFile: (path: string, newPath: string) => {
    return fs.rename(path, newPath);
  },
  deleteFile: (path: string) => {
    return fs.unlink(path);
  },
};

export default fileHelper;
