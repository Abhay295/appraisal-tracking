import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {

  const {register,handleSubmit,formState:{errors}} = useForm();

  const submitHandler = (data) =>{
    console.log(data);
    
  }

  const validationSchema = {
    emailValidator: {
      required: {
        value: true,
        message: "Email is required*",
      },
      pattern: {
        value: /[A-Za-z0-9]+@+[A-Za-z0-9]+\.+[A-Za-z]/,
        message: "Enter valid email*",
      },
    },
    passwordValidator: {
      required: {
        value: true,
        message: "Password must be required*",
      },
      min: {
        value: 8,
      },
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      },
    },


  }
  return (
    <div className=" bg-red-300 min-h-screen w-screen flex justify-center items-center">
      <div className="min-h-min w-1/3 ">
        <h1 className="text-center font-bold my-5 text-3xl">Login</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
        <div className="h-4/6 bg-gray-200 rounded-2xl p-7">
        
          <div className="mb-2">
          <label htmlFor="Email" className="block mb-2">
            Email
          </label>
          <input
            type="text"
            id="Email"
            placeholder="example@gmail.com"
            className="w-full rounded border px-2 py-1 border-gray-400 text-gray-500 bg-transparent "
            {...register("Email",validationSchema.emailValidator)}
          />
          <span style={{color:"red"}}>{errors.Email?.message}</span>
          </div>
          
          <div className="mb-2">
          <label htmlFor="Password" className="block mb-2">
          Password
          </label>
          <input
            type="password"
            id="Password"
            placeholder="********"
            className="w-full rounded border border-gray-400 text-gray-500 bg-transparent px-2 py-0.5"
            {...register("Password",validationSchema.passwordValidator)}
          />
          <span style={{color:"red"}}>{errors.Password?.message}</span>
          </div>
          <div>

          </div>
          <div className="mb-2 flex gap-5 items-center h-10">
            <input type="checkbox" className="w-5 h-5" name="remember" id="remember" {...register("remember")}/>
            <label htmlFor=""> Remember me </label>
          </div>
          <div className=" mb-2 flex justify-center">
            <button type="submit" className="bg-blue-600 p-2 rounded-lg text-white">Login</button>
          </div>
          <div className='mb-2'>
            <a href="/forgot" className='text-blue-500 mb-2'>Forgot Password ?</a>
          </div>
          <div className='flex gap-4'>
          <span>New to the system? </span>  <a className='text-blue-500' href="/signup">Sign up here</a>
          </div>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Login