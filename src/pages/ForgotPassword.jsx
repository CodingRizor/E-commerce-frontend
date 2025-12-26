import { useForm } from 'react-hook-form'
import axios from "axios"
import { useState } from 'react'

export default function ForgotPassword() {

  const [url, setUrl] = useState("")
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
      let BACKEND_URL = "http://localhost:5000/api/v1/user/forgot-password-link-send"
      const res = await axios.post(BACKEND_URL, data, {
        method: "POST",
        withCredentials: true
      })
      console.log(res)
      if (res.status == 200) {
        setUrl(res.data.url)
      }
    } catch (error) {
      if (error.response?.status === 404) {
    setError("Email not found");
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
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Forgot Pasword</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              <b> Email address</b>
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-black/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/50 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                {...register("email")}
              />
            </div>
          </div>
          <a href={url} >{url ? url : ""}</a>
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
