import Select from "react-select";
import classes from "./Upload.module.css";
import {
  deleteLayer,
  handleFileUpload,
  mapCategories,
  savelayer,
} from "./Functions";
import { useEffect, useState } from "react";
const Upload = () => {
  const [layerData, setLayerData] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [layerName, setLayerName] = useState(""); // <-- new state for input value

  const options = mapCategories.map((el) => ({
    value: el.key,
    label: el.name,
  }));
  useEffect(() => {
    layerData && console.log(layerData);
  }, [layerData]);
  useEffect(() => {
    selectedType && console.log(selectedType.label); // 🟢 log selected category whenever it changes
  }, [selectedType]);
  return (
    <div className={classes.main}>
      <Select
        options={options}
        value={selectedType}
        onChange={(option) => setSelectedType(option)}
      />

      <input
        type="text"
        placeholder="რუკის დასახელება"
        value={layerName}
        onChange={(e) => setLayerName(e.target.value)}
      />
      <input
        type="file"
        accept=".json"
        onChange={(e) => handleFileUpload(e, setLayerData)}
        placeholder="ატვირთე ფაილი"
      />
      <button
        type="button"
        onClick={() => savelayer(selectedType.label, layerName, layerData)}
      >
        ატვირთვა
      </button>
      <button type="button" onClick={() => deleteLayer("nature", "name")}>
        წაშლა
      </button>
    </div>
  );
};

export default Upload;
