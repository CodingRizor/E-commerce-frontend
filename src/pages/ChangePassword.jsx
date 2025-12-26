import { useForm } from 'react-hook-form'
import axios from "axios"
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";


export default function ChangePassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/v1/user/verify-token",
          {},
          { params: { token } }
        );
      } catch (err) {
        setError("Reset link expired or invalid");
      }
    };

    if (token) verify();
  }, [token]);

  const [error, setError] = useState()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    try {
      let BACKEND_URL = "http://localhost:5000/api/v1/user/change-password"
      const res = await axios.post(BACKEND_URL, data, {
        method: "POST",
        withCredentials: true,
        params: {token}
      })
      console.log(res)
      if (res.status == 200) {
       navigate("/login")
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setError("Password Error");
      } else {
        setError("Something went wrong");
      }
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="E-commerce"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Change Pasword</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              <b>Type New Password</b>
            </label>
            <div className="mt-2">
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required

                className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                {...register("newPassword")}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              <b>Confirm New Password</b>
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required

                className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                {...register("confirmPassword")}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

      </div>
    </div>
  )
}
