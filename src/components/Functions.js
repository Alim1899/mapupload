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
export const deleteLayer = (category, name) => {
  if (!category || !name) return;

  const db = getDatabase();
  remove(ref(db, `geojson/${category}/${name}`))
    .then(() => {
      alert("Data Deleted successfully!");
    })
    .catch((error) => {
      alert("Failed to Delete data: " + error.message);
    });
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
