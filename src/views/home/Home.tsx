// Home.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const response = await res.json();
        console.log(response);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md'>
        <h2 className='text-2xl font-bold text-center'>Welcome, {user.username}!</h2>
        <button
          onClick={handleLogout}
          className='w-full px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:bg-red-700'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
