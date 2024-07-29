import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegisterFormInputs, TRegisterFormData, registerSchema } from "../../schema/registerSchema";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: TRegisterFormData) => {
    try {
      const res = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (response?.success) {
        toast.success("Registration successful!");
        navigate("/login");
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
        <h2 className='text-2xl font-bold text-center'>Register</h2>
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
            Register
          </button>
          <p className='float-right'>
            Already registered?{" "}
            <Link to='/login' className='text-blue-600'>
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
