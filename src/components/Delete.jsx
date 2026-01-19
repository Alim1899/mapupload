import { useEffect, useState } from "react";
import classes from './Upload.module.css'
import Select from "react-select";
import { deleteLayer,mapCategories } from "./Functions";
const Delete = () => {
    const options = mapCategories.map((el) => ({
    value: el.key,
    label: el.name,
  }));
  const [value, setValue] = useState("");
  const [category,setCategory] = useState("")
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(()=>{
    console.log(category, value);
  },[value,category])
  return (
    <div className={classes.delete}>
    <Select
        options={options}
        value={category}
        onChange={(option) => setCategory(option.value)}
      />
      <input
        value={value}
        onChange={handleChange}
        placeholder="Enter layer name"
      />
      <button type="button" onClick={() => deleteLayer(value)}>
        წაშლა
      </button>
    </div>
  );
};

export default Delete;
