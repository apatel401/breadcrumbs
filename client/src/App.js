import { useState, useEffect } from "react"; 
import BreadCrumbs from "./components/Breadcrumbs";
import FileExplorer from "./components/FileExplorer";
import  './App.css'

function App() {
  const [filePath, setFilePath] = useState("root"); //path variable to make requests
  const [currentDir, setCurrentDir] = useState(null); //contents for current directory
  const [crumbs, setCrumbs] = useState(["root"]);
  const [directoryEnd, setDirectoryEnd] = useState(false);

  async function getFiles(path) {
    const response = await fetch(`http://localhost:4000/path/${path}`);
    const result = await response.json()

    //set contents for requested directory like childrens and their type
    setCurrentDir(result);
  }

  //get files whenever filePath changes.

  useEffect(() => {

    
    getFiles(filePath);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath])
  
 

  //get contents of requested directory from backend, ignored if type is a file
  const changeDir = (dir) => {
    if (dir.type === "file"){
      setDirectoryEnd(true);
      setCrumbs((old) => [...old, dir.file]);
      setFilePath(dir.file)
    } else {
      setDirectoryEnd(false);
      setCrumbs((old) => [...old, dir.file]);
      setFilePath(dir.file)
    }
  };

  //updates breadcrumb array.
  const manageCrumbs = (index, item) => {
    // doing nothing when clicking the current/end of breadcrumb
    if(index === crumbs.length - 1) return;
    const arr = crumbs;
    arr.splice(index + 1)
    setCrumbs(arr);
    setFilePath(item);
    setDirectoryEnd(false)
  };

  return (
    <div className="main-wrapper">
        <BreadCrumbs crumbs={crumbs} manageCrumbs={manageCrumbs} />
        <FileExplorer currentDir={currentDir} changeDir={changeDir} directoryEnd={directoryEnd} filePath={filePath} />
      </div>
  );
}

export default App;