import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    const res = await axios.post('http://localhost:3000/signup',data)
    
    if (res.data.redirectTo) {
      navigate(res.data.redirectTo)
  }

  };

  const validationSchema = {
    firstnameValidator: {
      required: {
        value: true,
        message: "firstname is required*",
      },
    },
    lastnameValidator: {
      required: {
        value: true,
        message: "lastname is required*",
      },
    },
    emailValidator: {
      required: {
        value: true,
        message: "email is required*",
      },
      pattern: {
        value: /[A-Za-z0-9]+@+[A-Za-z0-9]+\.+[A-Za-z]/,
        message: "Enter valid email*",
      },
    },
    departmentValidator: {
      required: {
        value: true,
        message: "This field is required*",
      },
    },
    passwordValidator: {
      required: {
        value: true,
        message: "password must be required*",
      },
      min: {
        value: 8,
      },
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      },
    },
    termValidation:{
      validate: (value) =>{
        return value == true || "Accept the T&C*"
      }
    }
  };
  return (
    <div className=" bg-red-300 min-h-screen w-screen flex justify-center items-center">
      <div className=" min-h-min w-1/3 ">
        <h1 className="text-center font-bold my-3 text-3xl">Sign Up</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="h-5/6 bg-gray-200 rounded-2xl p-7">
            <div className="mb-2">
              <label htmlFor="firstname" className="block mb-2">
                First name
              </label>
              <input
                type="text"
                id="firstname"
                placeholder="John"
                className="w-full rounded border border-gray-400 text-gray-500 bg-transparent px-2 py-1"
                {...register("firstname", validationSchema.firstnameValidator)}
              />
              <span style={{ color: "red" }}>{errors.firstname?.message}</span>
            </div>
            <div className="mb-2">
              <label htmlFor="lastname" className="block mb-2">
                last name
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Doe"
                className="w-full rounded border border-gray-400 text-gray-500 bg-transparent px-2 py-1"
                {...register("lastname", validationSchema.lastnameValidator)}
              />
              <span style={{ color: "red" }}>{errors.lastname?.message}</span>
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block mb-2">
                email
              </label>
              <input
                type="text"
                id="email"
                placeholder="example@gmail.com"
                className="w-full rounded border px-2 py-1 border-gray-400 text-gray-500 bg-transparent "
                {...register("email", validationSchema.emailValidator)}
              />
              <span style={{ color: "red" }}>{errors.email?.message}</span>
            </div>
            {/* <div className="mb-2">
              <label htmlFor="Department" className="block mb-2">
                Department
              </label>
              <select
                name=""
                id="Department"
                {...register(
                  "Department",
                  validationSchema.departmentValidator
                )}
                className="w-full rounded border border-gray-400 py-1 text-gray-500 bg-transparent"
              >
                <option value="">Select</option>
                <option value="Human Resources (HR)">
                  Human Resources (HR)
                </option>
                <option value="Finance & Accounting">
                  Finance & Accounting
                </option>
                <option value="Information Technology (IT) ">
                  Information Technology (IT){" "}
                </option>
                <option value="Sales & Marketing">Sales & Marketing</option>
                <option value="Operations & Administration">
                  Operations & Administration
                </option>
              </select>
              <span style={{ color: "red" }}>{errors.Department?.message}</span>
            </div> */}
            <div className="mb-1">
              <label htmlFor="password" className="block mb-2">
                password
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className="w-full rounded border border-gray-400 text-gray-500 bg-transparent px-2 py-0.5"
                {...register("password", validationSchema.passwordValidator)}
              />
              <span style={{ color: "red" }}>{errors.password?.message}</span>
            </div>
            <div className=" flex gap-2 items-center h-14">
              <input
                {...register("term",validationSchema.termValidation)}
                type="checkbox"
                className="w-5 h-5"
                name="term"
                id="term"
              />
              <label htmlFor="">Accept term & conditions</label>
            </div>
            <span style={{ color: "red" }}>{errors.term?.message}</span>
            <div className=" mb-2 flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 p-2 rounded-lg text-white"
              >
                Submit
              </button>
            </div>
            <div className="text-sm inline-flex items-center gap-5">
              <h4>Already have an account ? </h4>
              <a className=" text-blue-500" href="/login">
                Log in here
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
