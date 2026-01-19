import Select from "react-select";
import classes from "./Upload.module.css";
import {
  handleFileUpload,
  handleSvgUpload,
  mapCategories,
  savelayer,
  saveSigns,
} from "./Functions";
import { useEffect, useState } from "react";
const Upload = () => {
  const [layerData, setLayerData] = useState([]);
  const [layerSigns, setLayerSigns] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [layerName, setLayerName] = useState(""); // <-- new state for input value

  const options = mapCategories.map((el) => ({
    value: el.key,
    label: el.name,
  }));
  useEffect(() => {
    selectedType && console.log(selectedType);
    layerData && console.log(layerData);
    layerSigns && console.log(layerSigns);
  }, [layerData, layerSigns, selectedType]);
  useEffect(() => {
    selectedType && console.log(selectedType.label); // 🟢 log selected category whenever it changes
  }, [selectedType]);
  return (
    <div className={classes.upload}>
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
      <label htmlFor="jsonUpload">JSON ფაილი</label>
      <input
        name="jsonUpload"
        type="file"
        accept=".json"
        onChange={(e) => handleFileUpload(e, setLayerData)}
        placeholder="ატვირთე ფაილი"
      />
      <label htmlFor="svgUpload">მონიშვნების ატვირთვა .svg</label>
      <input
        name="svgUpload"
        type="file"
        accept=".svg"
        multiple
        onChange={(e) => handleSvgUpload(e, setLayerSigns)}
      />
      <button
        type="button"
        onClick={() => savelayer(selectedType.label, layerName, layerData)}
      >
        რუკის ატვირთვა
      </button>
      <button
        style={{ marginTop: "20px" }}
        type="button"
        disabled={
          !selectedType?.label ||
          !layerName ||
          !Array.isArray(layerSigns) ||
          layerSigns.length === 0
        }
        onClick={() => saveSigns(selectedType.label, layerName, layerSigns)}
      >
        ნიშნების ატვირთვა
      </button>
    </div>
  );
};

export default Upload;
