import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { toast } from "react-toastify";

const Navbar = () => {
  const { getItem, removeItem } = useLocalStorage("token");
  const token = getItem();
  console.log(token);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (confirm("Are you sure you want to logout?")) {
      removeItem();
      toast.success("Logged out!");
      navigate("/login");
    }
  };

  const handleDeleteAccountClick = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/user/me", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          toast.success("Account deleted successfully!");
          removeItem();
          navigate("/register");
        } else {
          const response = await res.json();
          toast.error(`Error: ${response.error || "Failed to delete account."}`);
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <nav className='bg-gray-800 p-3 fixed top-0 w-full'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white text-2xl font-bold'>Portext</div>
        <div className='space-x-4'>
          {token ? (
            <>
              <button
                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-700'
                onClick={handleDeleteAccountClick}>
                Delete Account
              </button>
              <button
                className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:bg-yellow-700'
                onClick={handleLogoutClick}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700'>
                  Login
                </button>
              </Link>
              <Link to='/register'>
                <button className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-700'>
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
