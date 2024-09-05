// models/Item.js
const { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } = require("firebase/firestore");
const { db } = require("../firebaseConfig");

const itemsCollection = collection(db, "items");

const Item = {
  // Tạo một document mới
  create: async (data) => {
    const docRef = await addDoc(itemsCollection, data);
    return { id: docRef.id, ...data };
  },

  // Lấy tất cả các document
  getAll: async () => {
    const itemsSnapshot = await getDocs(itemsCollection);
    return itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Lấy document theo ID
  getById: async (id) => {
    const itemRef = doc(db, "items", id);
    const itemSnapshot = await getDoc(itemRef);
    if (!itemSnapshot.exists()) {
      return null;
    }
    return { id: itemSnapshot.id, ...itemSnapshot.data() };
  },

  // Cập nhật document theo ID
  update: async (id, data) => {
    const itemRef = doc(db, "items", id);
    await updateDoc(itemRef, data);
    return { id, ...data };
  },

  // Xóa document theo ID
  delete: async (id) => {
    const itemRef = doc(db, "items", id);
    await deleteDoc(itemRef);
    return { message: "Item deleted successfully" };
  }
};

module.exports = Item;
