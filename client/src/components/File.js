function File({ changeDir, item, directoryEnd, filePath }) {
  return (
    !directoryEnd ? (<div
      className="fs-container"
      onClick={() => changeDir(item)}
    >
      <button>{item.file}</button>
    </div>) : (item.file === filePath ? <h1>This is {filePath.replace(/\.[^/.]+$/, "")}</h1> : null)
  );
}


export default File;