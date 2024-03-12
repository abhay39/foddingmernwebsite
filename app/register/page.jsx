"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

const SignUpPage = ({ mode }) => {
  const url = process.env.API;

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
    nameError: ""
  });

  const [formErrorsForRestaurant, setFormErrorsForRestaurant] = useState({
    nameError: "",
    passwordError: "",
    locationError: "",
    contactError: "",
    descriptionError: "",
  });

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    location: "",
    contact: "",
    description: "",
    password: "",
  })

  const handleFormChange=async(e)=>{
    setRestaurantDetails({
      ...restaurantDetails,
      [e.target.name]:e.target.value,
    })
  }
  const handelLogin = async ({}) => {
    // Basic validation
    if (!email.trim()) {
      setFormErrors({
        ...formErrors,
        emailError: "Email is required"
      });
      return;
    }

    if (!name.trim()) {
      setFormErrors({
        ...formErrors,
        nameError: "Name is required"
      });
      return;
    }

    if (!password.trim()) {
      setFormErrors({
        ...formErrors,
        passwordError: "Password is required"
      });
      return;
    }

    if (password.length < 6) {
      setFormErrors({
        ...formErrors,
        passwordError: "Password must be at least 6 characters"
      });
      return;
    }
    setFormErrors({
      emailError: "",
      passwordError: ""
    });

    // If validation passes, you can proceed with login logic
    let res = await fetch(`${url}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    });
    const status = res.status;
    res = await res.json();
    if (status === 200) {
      // const token=res.token;
      toast.success(res.message);
      mode();
    } else {
      toast.error(res.message);
    }
  };


  const handelLoginForRestaurant = async ({}) => {
    console.log(formErrorsForRestaurant)
    // Basic validation
    if (!restaurantDetails.name.trim()) {
      setFormErrorsForRestaurant({
        ...formErrorsForRestaurant,
        nameError: "name is required"
      });
      return;
    }

    if (!restaurantDetails.location.trim()) {
      setFormErrorsForRestaurant({
        ...formErrorsForRestaurant,
        locationError: "location is required"
      });
      return;
    }

    if (!restaurantDetails.contact.trim()) {
      setFormErrorsForRestaurant({
        ...formErrorsForRestaurant,
        contactError: "Contact is required"
      });
      return;
    }
    if (!restaurantDetails.description.trim()) {
      setFormErrorsForRestaurant({
        ...formErrorsForRestaurant,
        descriptionError: "description is required"
      });
      return;
    }

    if (password.length < 6) {
      setFormErrorsForRestaurant({
        ...formErrorsForRestaurant,
        passwordError: "Password must be at least 6 characters"
      });
      return;
    }
    
    setFormErrorsForRestaurant({
      nameError: "",
      locationError: "",
      contactError: "",
      descriptionError: "",
      passwordError: ""
    });

    // If validation passes, you can proceed with login logic
    let res = await fetch(`${url}/api/auth/register/restaurant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(restaurantDetails)
    });
    // const status = res.status;
    // res = await res.json();
    // if (status === 200) {
    //   // const token=res.token;
    //   toast.success(res.message);
    //   mode();
    // } else {
    //   toast.error(res.message);
    // }
  };

  const [selected,setSelected]=useState("user")

  return (
    <div className=" min-h-screen  select-none flex items-center justify-center flex-col">
      <h1 className=" text-[2.2rem] md:text-[3.9rem] font-bold select-none">
        Sign up
      </h1>

      {/* <div className=" bg-slate-800 p-2 w-[70%] rounded-xl flex flex-col md:flex-row items-center">
        <div onClick={()=>{
          setSelected("user")
        }} className={`${selected=='user'?"bg-slate-500":""}  cursor-pointer p-3 rounded-md w-full md:w-1/2`}>
          <h1 className=" text-2xl text-center text-white">User Registration</h1>
        </div>
        <div onClick={()=>{
          setSelected("restaurant")
        }} className={`${selected=='restaurant'?"bg-slate-500":""}  cursor-pointer text-center p-3 rounded-md w-full md:w-1/2`}>
          <h1 className=" text-2xl text-white">Restaurant Registration</h1>
        </div>

      </div> */}

      <div className=" mt-3 bg-slate-200 shadow-2xl  p-3 rounded-md ">
        <label className=" font-bold" htmlFor="">
          Name
        </label>
        <br />
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-3 focus:border-blue-700 border-none rounded-lg outline-none w-[300px] "
          type="text"
          placeholder="Enter your name"
        />
        <br />

        <label className=" font-bold" htmlFor="">
          Email
        </label>
        <br />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-3 focus:border-blue-700 border-none rounded-lg outline-none w-[300px] "
          type="email"
          placeholder="Enter your email"
        />
        <br />
        {formErrors.emailError &&
          <p className="text-red text-center text-sm">
            {formErrors.emailError}
          </p>}

        <label className=" font-bold" htmlFor="">
          Password
        </label>
        <br />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-3 focus:border-blue-700 border-none rounded-lg outline-none w-[300px] "
          type="password"
          placeholder="Enter your password"
        />
        <br />
        {formErrors.passwordError &&
          <p className="text-red text-center text-sm">
            {formErrors.passwordError}
          </p>}
        <br />

        <button
          onClick={handelLogin}
          className="bg-green w-[300px] p-3 rounded-md text-white font-semibold"
        >
          Register
        </button>
        <br />
        
      </div>

      {/* {
        selected === "user" ? (
          



        ) : (
          <div className=" mt-3 bg-slate-200 shadow-2xl  p-3 rounded-md ">
        <div className=" flex items-center flex-col md:flex-row w-full gap-6">
          <div>
            <label className=" font-bold" htmlFor="">
              Name Of Restaurant
            </label>
            <br />
            <input
              value={restaurantDetails.name}
              name="name"
              onChange={handleFormChange}
              className="p-3 focus:border-blue-700 border-none rounded-lg outline-none w-[300px] "
              type="text"
              placeholder="Enter your Restaurant name"
            />
            <br />
          </div>

          <div>
          <label className=" font-bold" htmlFor="">
          Location
            </label>
            <br />
            <input
              value={restaurantDetails.location}
              name="location"
              onChange={handleFormChange}
              className="p-3 focus:border-blue-700 border-none rounded-lg outline-none w-[300px] "
              type="text"
              placeholder="Enter your location"
            />
            <br />
            {formErrorsForRestaurant.locationError &&
              <p className="text-red text-center text-sm">
                {formErrorsForRestaurant.locationError}
              </p>}
          </div>
        </div>

        <div className=" flex items-center flex-col md:flex-row w-full gap-6">
          <div>
            <label className=" font-bold" htmlFor="">
            Contact Details
            </label>
            <br />
            <input
              value={restaurantDetails.contact}
              name="contact"
              onChange={handleFormChange}
              className="p-3 focus:border-blue-700 border-none rounded-lg outline-none w-[300px] "
              type="text"
              placeholder="Enter your contact details"
            />
            <br />
            {formErrorsForRestaurant.contactError &&
              <p className="text-red text-center text-sm">
                {formErrorsForRestaurant.contactError}
              </p>}
            <br />
          </div>
          <div>
          <label className=" font-bold" htmlFor="">
          Password
            </label>
            <br />
            <input
              value={restaurantDetails.password}
              name="password"
              onChange={handleFormChange}
              className="p-3 focus:border-blue-700 border-none rounded-lg outline-none w-[300px] "
              type="password"
              placeholder="Enter your password"
            />
            <br />
            {formErrorsForRestaurant.passwordError &&
              <p className="text-red text-center text-sm">
                {formErrorsForRestaurant.passwordError}
              </p>}
            <br />
          </div>
        </div>

       

        

        <label className=" font-bold" htmlFor="">
          Description
        </label>
        <br />
        <textarea
          value={restaurantDetails.description}
          name="description"
          onChange={handleFormChange}
          className="p-3 focus:border-blue-700 border-none rounded-lg outline-none w-full "
          type="text"
          rows={10}

          placeholder="Enter description of your restaurant"
        />
        <br />
        {formErrorsForRestaurant.descriptionError &&
          <p className="text-red text-center text-sm">
            {formErrors.descriptionError}
          </p>}
        <br />


        <button
          onClick={handelLoginForRestaurant}
          className="bg-green w-full p-3 rounded-md text-white font-semibold"
        >
          Register
        </button>
        <br />
        
      </div>
        )
      } */}
      
    </div>
  );
};

export default SignUpPage;
