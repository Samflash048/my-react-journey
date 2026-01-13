import { useState } from "react";
import { useMembers } from "./hooks/useMembers"; // <--- Import your new custom hook!

function TeamDashboard() {
  // 🧠 Use the Hook (One line to get all data powers!)
  const { members, loading, addMember, deleteMember } = useMembers();

  // Local state for the form inputs (This is still UI logic, so it stays here)
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName || !newRole) return;

    // Call the hook function
    addMember(newName, newRole, newEmail);
    
    // Clear form
    setNewName("");
    setNewRole("");
    setNewEmail("");
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Team Dashboard (Pro Architecture 🏗️)</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-10 border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Member</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="text" placeholder="Role" value={newRole} onChange={(e) => setNewRole(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="email" placeholder="Email (Optional)" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 w-full md:w-auto transition">
          + Add Member
        </button>
      </form>

      {/* Loading Spinner */}
      {loading && <p className="text-center text-gray-500 animate-pulse">Syncing with cloud...</p>}

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition relative group">
            <button onClick={() => deleteMember(member.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition" title="Delete">
               ✕
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