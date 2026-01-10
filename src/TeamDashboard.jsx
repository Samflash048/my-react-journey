import { useState, useEffect } from 'react'; // <--- Combined imports
import UserProfile from "./UserProfile";

function TeamDashboard() {
  // 1. Initialize State from Local Storage
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("myAppUsers");
    if (savedUsers) {
      return JSON.parse(savedUsers);
    } else {
      return [
        { id: 1, name: "Solomon Samuel", role: "Frontend Developer", location: "Nigeria" },
        { id: 2, name: "Jane Doe", role: "UI Designer", location: "USA" },
        { id: 3, name: "Alex Smith", role: "Backend Developer", location: "UK" }
      ];
    }
  });
useEffect(() => {
    // Only fetch if we have NO users (so we don't overwrite your manual adds)
    if (users.length === 0) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          // The API data structure is slightly different, so we map it to match ours
          const formattedUsers = data.map(user => ({
            id: user.id,
            name: user.name,
            role: "Software Engineer", // API doesn't have role, so we guess
            location: user.address.city
          }));
          setUsers(formattedUsers);
        });
    }
  }, []); // Empty array = Run only once on mount
  // 2. Save to Local Storage whenever 'users' changes
  // MOVED INSIDE THE COMPONENT
  useEffect(() => {
    localStorage.setItem("myAppUsers", JSON.stringify(users));
  }, [users]);

  // State for search and forms
  const [searchTerm, setSearchTerm] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newLocation, setNewLocation] = useState("");

  // Filter users
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete User
  function handleDeleteUser(idToDelete) {
    setUsers(users.filter((user) => user.id !== idToDelete));
  }

  // Add User
  function handleAddUser(e) {
    e.preventDefault();
    if (!newName || !newRole || !newLocation) return;

    const newUser = {
      id: Date.now(),
      name: newName,
      role: newRole,
      location: newLocation
    };

    setUsers([newUser, ...users]); 
    setNewName("");
    setNewRole("");
    setNewLocation("");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Team</h1>

      {/* Add User Form */}
      <div style={{ marginBottom: "20px", borderBottom: "2px solid #ddd", paddingBottom: "20px" }}>
        <h3>Add New Member</h3>
        <form onSubmit={handleAddUser} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input type="text" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} required style={{ padding: "8px" }} />
          <input type="text" placeholder="Role" value={newRole} onChange={(e) => setNewRole(e.target.value)} required style={{ padding: "8px" }} />
          <input type="text" placeholder="Location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} required style={{ padding: "8px" }} />
          <button type="submit" style={{ padding: "8px 16px", background: "black", color: "white" }}>Add</button>
        </form>
      </div>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search for a name..." 
        style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

      {/* User List */}
      {filteredUsers.map((user) => (
        <UserProfile 
          key={user.id} 
          name={user.name} 
          role={user.role} 
          location={user.location} 
          onDelete={() => handleDeleteUser(user.id)}
        />
      ))}
      
      {filteredUsers.length === 0 && <p>No results found.</p>}
    </div>
  );
}

export default TeamDashboard;