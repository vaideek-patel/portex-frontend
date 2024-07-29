import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginFormInputs, loginSchema, TLoginFormData } from "../../schema/loginSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  const { setItem } = useLocalStorage("token");
  const navigate = useNavigate();

  const onSubmit = async (data: TLoginFormData) => {
    try {
      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const response = await res.json();
      console.log(response);
      if (response?.success) {
        toast.success("Registration successful!");
        setItem(response.token);
        navigate("/");
      } else if (response?.error) {
        toast.error(`Error: ${response.error}`);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } catch (error) {
      toast.error("Failed to register. Please try again later.");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md'>
        <h2 className='text-2xl font-bold text-center'>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
              Username
            </label>
            <input
              id='username'
              type='text'
              {...register("username")}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300'
            />
            {errors.username && <p className='mt-1 text-sm text-red-600'>{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              {...register("password")}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300'
            />
            {errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>}
          </div>

          <button
            type='submit'
            className='w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-700'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
