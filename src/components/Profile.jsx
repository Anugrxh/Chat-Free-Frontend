// src/components/Profile.jsx
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  // Fake user data — later replace with authenticated user info
  const user = {
    username: "john_doe",
    email: "john@example.com",
  };

  const handleLogout = () => {
    // TODO: Clear auth (localStorage/session/your backend logout)
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4">Profile</h2>
        <p className="mb-2 text-gray-300"><strong>Username:</strong> {user.username}</p>
        <p className="mb-6 text-gray-300"><strong>Email:</strong> {user.email}</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
