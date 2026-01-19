import Upload from "./Upload";
import Delete from "./Delete";
import classes from "./Upload.module.css";
import { useState } from "react";
const Layout = () => {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <div className={classes.layout}>
    <div className={classes.toggle}>
       <button type="button" onClick={() => setShowDelete(false)}>
        დამატება
      </button>
      <button type="button" onClick={() => setShowDelete(true)}>
        წაშლა
      </button>
    </div>
     
      <div className={classes.content}>
        {showDelete && <Delete />}
        {!showDelete && <Upload />}
      </div>
    </div>
  );
};

export default Layout;
