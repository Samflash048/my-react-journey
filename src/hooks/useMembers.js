import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// This is a CUSTOM HOOK (starts with 'use')
export function useMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "members"));
        const memberList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMembers(memberList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching members: ", error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // 2. Add Member (Optimistic)
  const addMember = async (name, role, email) => {
    // Create temp ID
    const tempId = Date.now().toString();
    const newMember = { id: tempId, name, role, email: email || "No email" };

    // Update UI instantly
    setMembers((prev) => [...prev, newMember]);

    try {
      const docRef = await addDoc(collection(db, "members"), {
        name, role, email: email || "No email"
      });

      // Update with real ID
      setMembers((prev) => 
        prev.map((m) => m.id === tempId ? { ...m, id: docRef.id } : m)
      );
    } catch (error) {
      console.error("Error adding:", error);
      alert("Failed to save! Removing item.");
      setMembers((prev) => prev.filter((m) => m.id !== tempId));
    }
  };

  // 3. Delete Member (Bonus feature included)
  const deleteMember = async (id) => {
    // Optimistic UI update
    setMembers((prev) => prev.filter((member) => member.id !== id));
    
    try {
      await deleteDoc(doc(db, "members", id));
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete from cloud.");
    }
  };

  // Return the tools so the component can use them
  return { members, loading, addMember, deleteMember };
}