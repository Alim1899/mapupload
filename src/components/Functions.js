import app from "../firebaseConfig";
import { getDatabase, get, ref, set, remove } from "firebase/database";

export const fetchGeoJson = async (type, layer) => {
  const db = getDatabase(app);
  try {
    const projectsRef = ref(db, `geojson/${type}/${layer}`);
    const snapshot = await get(projectsRef);
    if (snapshot.exists()) {
      //return snapshot.val();
    } else {
      console.log(`No JSON data available for ${layer}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching JSON", error);
  }
};

export const savelayer = (category, name, file) => {
  if (!category || !name || !file) return;

  const db = getDatabase();
  set(ref(db, `geojson/${category}/${name}`), file)
    .then(() => {
      alert("Data uploaded successfully!");
    })
    .catch((error) => {
      alert("Failed to upload data: " + error.message);
    });
};
export const deleteLayer = async (name) => {
  if (!name) {
    alert("Please enter a layer name");
    return;
  }

  const db = getDatabase();
  const layerRef = ref(db, name);
  console.log(layerRef);
  try {
    const snapshot = await get(layerRef);

    if (!snapshot.exists()) {
      alert("Layer does not exist");
      return;
    }

    await remove(layerRef);
    alert("Data deleted successfully!");
  } catch (error) {
    alert("Failed to delete data: " + error.message);
  }
};

export const handleFileUpload = (event, setLayerData) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    setLayerData(JSON.parse(e.target.result));
  };

  reader.readAsText(file);
};

export const handleSvgUpload = (event, setLayerSigns) => {
  const files = Array.from(event.target.files);
  if (!files.length) return;

  const results = [];

  files.forEach((file, index) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      results.push({
        key:index,
        name: file.name,
        content: e.target.result, // SVG text
      });

      // Update state only after all files are read
      if (results.length === files.length) {
        setLayerSigns(results);
      }
    };

    reader.readAsText(file);
  });
};

export const mapCategories = [
  {
    key: "nature",
    name: "nature",
  },
  {
    key: "population",
    name: "population",
  },
  {
    key: "economy",
    name: "economy",
  },
  {
    key: "education",
    name: "education",
  },
  {
    key: "culture",
    name: "culture",
  },
  {
    key: "tourism",
    name: "tourism",
  },
  {
    key: "history",
    name: "history",
  },
];

//  try {
//       const content = JSON.parse(e.target.result); // Parse JSON content
//       const db = getDatabase();

//       set(ref(db, `geojson`), content)
//         .then(() => {
//           alert("GeoJSON uploaded successfully!");
//         })
//         .catch((err) => {
//           console.error("Upload failed:", err);
//           alert("Upload failed.");
//         });
//     } catch (err) {
//       alert("Invalid JSON file.", err);
//     }
