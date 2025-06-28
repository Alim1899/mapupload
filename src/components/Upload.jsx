import Select from "react-select";
import classes from "./Upload.module.css";
import { handleFileUpload, mapCategories, savelayer } from "./Functions";
import { useEffect, useState } from "react";
const Upload = () => {
  const [layerData, setLayerData] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
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

      <input type="text" placeholder="რუკის დასახელება" />
      <input
        type="file"
        accept=".json"
        onChange={(e) => handleFileUpload(e, setLayerData)}
        placeholder="ატვირთე ფაილი"
      />
      <button
        type="button"
        onClick={() => savelayer(selectedType.label, "saxeli", layerData)}
      >
        ატვირთვა
      </button>
    </div>
  );
};

export default Upload;
