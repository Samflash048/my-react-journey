import { useState } from 'react';

function UserProfile(props) {
  const [likes, setLikes] = useState(0); 

  return (
    <div style={{ border: "2px solid #333", padding: "20px", margin: "20px", borderRadius: "10px", position: "relative" }}>
      
      {/* NEW: Delete Button (Top Right Corner) */}
      <button 
        onClick={props.onDelete} 
        style={{ position: "absolute", top: "10px", right: "10px", background: "red", color: "white", border: "none", cursor: "pointer" }}
      >
        X
      </button>

      <h2>{props.name}</h2>
      <p>Role: {props.role}</p>
      <p>Location: {props.location}</p>
      
      <h3>Likes: {likes}</h3>
      <button onClick={() => setLikes(likes + 1)}>Like 👍</button>
    </div>
  );
}

export default UserProfile;