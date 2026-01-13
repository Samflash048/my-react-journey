import { useState, useEffect } from "react";
import { db } from "./firebaseConfig"; // <--- Import your new DB connection
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

function TeamDashboard() {
  const [members, setMembers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(true); // <--- Show loading state

  // 1. FETCH DATA from Firebase when the page loads
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

  // 2. ADD DATA to Firebase
  // ... existing code ...

  const addMember = async (e) => {
    e.preventDefault();
    if (!newName || !newRole) return;

    // 1. Create a "Temporary" Member with a fake ID
    const tempId = Date.now().toString();
    const newMember = {
      id: tempId,
      name: newName,
      role: newRole,
      email: newEmail || "No email"
    };

    // 2. ⚡ OPTIMISTIC UPDATE: Show it on screen INSTANTLY
    setMembers((prevMembers) => [...prevMembers, newMember]);
    
    // 3. Clear the form instantly so you can type the next one
    setNewName("");
    setNewRole("");
    setNewEmail("");

    try {
      // 4. Send to Cloud in the background (User doesn't wait for this)
      const docRef = await addDoc(collection(db, "members"), {
        name: newMember.name,
        role: newMember.role,
        email: newMember.email,
      });

      // 5. Silent Swap: Replace the "fake ID" with the "real Google ID"
      setMembers((prevMembers) => 
        prevMembers.map((member) => 
          member.id === tempId ? { ...member, id: docRef.id } : member
        )
      );

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to save to cloud! Removing item.");
      // Rollback: If it failed, remove the item from the list
      setMembers((prevMembers) => prevMembers.filter((m) => m.id !== tempId));
    }
  };

  // 3. DELETE DATA from Firebase
  const deleteMember = async (id) => {
    try {
      await deleteDoc(doc(db, "members", id));
      setMembers(members.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Team Dashboard (Cloud ☁️)</h2>

      {/* Form */}
      <form onSubmit={addMember} className="bg-white p-6 rounded-xl shadow-md mb-10 border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Member</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="text" placeholder="Role" value={newRole} onChange={(e) => setNewRole(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="email" placeholder="Email (Optional)" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 w-full md:w-auto transition">
          + Add to Cloud
        </button>
      </form>

      {/* Loading Spinner */}
      {loading && <p className="text-center text-gray-500">Loading data from cloud...</p>}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition relative group">
            <button onClick={() => deleteMember(member.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
            </button>
            <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
            <p className="text-blue-600 font-medium">{member.role}</p>
            <p className="text-gray-500 text-sm mt-2">{member.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamDashboard;