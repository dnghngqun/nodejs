const express = require("express");
const { db } = require("./firebaseConfig");
const {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");

const app = express();
const port = 3000;

app.use(express.json()); //middleware để parse JSON

// API để liệt kê tất cả các item
app.get("/items", async (req, res) => {
  try {
    const itemsCollection = collection(db, "items");
    const itemsSnapshot = await getDocs(itemsCollection);
    const itemsList = itemsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(itemsList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy API theo ID
app.get("/item/:id", async (req, res) => {
  try {
    const itemRef = doc(db, "items", req.params.id);
    const itemSnapshot = await getDoc(itemRef);
    if (!itemSnapshot.exists())
      return res.status(404).json({ message: "Item not found" });

    res.json({ id: itemSnapshot.id, ...itemSnapshot.data() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// API: Create
app.post("/items", async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const docRef = await addDoc(collection(db, "items"), {
      name,
      description,
      price,
    });
    res.status(201).json({ id: docRef.id, name, description, price });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API: Update
app.put("/item/:id", async (req, res) => {
  try {
    const itemRef = doc(db, "items", req.params.id);
    const itemSnapshot = await getDoc(itemRef);
    if (!itemSnapshot.exists())
      return res.status(404).json({ message: "Item not found" });

    await updateDoc(itemRef, req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// API: Delete
app.delete("/item/:id", async (req, res) => {
  try {
    const itemRef = doc(db, "items", req.params.id);
    const itemSnapshot = await getDoc(itemRef);
    if (!itemSnapshot.exists())
      return res.status(404).json({ message: "Item not found" });

    await deleteDoc(itemRef);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thiết lập server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
