import File from "./File";
function FileExplorer({ currentDir, changeDir, directoryEnd, filePath }) {
  return (
    <div className="fs">
      {/* iterate over all children files and folders */}
      {currentDir &&
        currentDir.map((item) => <File changeDir={changeDir} key={item.index} item={item} directoryEnd={directoryEnd} filePath={filePath}/>)}
    </div>
  );
}

export default FileExplorer;