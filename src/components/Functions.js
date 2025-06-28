import app from "../firebaseConfig";
import { getDatabase, get, ref, set } from "firebase/database";

export const fetchGeoJson = async (type, layer) => {
  const db = getDatabase(app);
  try {
    const projectsRef = ref(db, `geojson/${type}/${layer}`);
    const snapshot = await get(projectsRef);
    if (snapshot.exists()) {
      //return snapshot.val();
      console.log(snapshot.val());
    } else {
      console.log(`No JSON data available for ${layer}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching JSON", error);
  }
};

export const savelayer = (category, name, file) => {
  console.log(category, name, file);
  if (!category || !name || !file) return;
  const db = getDatabase();

  set(ref(db, `geojson/${category}/${name}`), file); // Only adds or replaces this one child
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
    name: "ბუნება",
  },
  {
    key: "population",
    name: "მოსახლეობა",
  },
  {
    key: "economy",
    name: "ეკონომიკა",
  },
  {
    key: "education",
    name: "განათლება",
  },
  {
    key: "culture",
    name: "კულტურა",
  },
  {
    key: "tourism",
    name: "ტურიზმი",
  },
  {
    key: "history",
    name: "ისტორია",
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
