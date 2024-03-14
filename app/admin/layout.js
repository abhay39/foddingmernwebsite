"use client"
import SideBarProfileForAdmin from "@/components/SideBarProfileForAdmin";
import { AuthContext } from "@/hooks/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Change from "next/navigation"
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RootLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, user, setIsAuthenticatedWhenLoggedIn, setUserValues } = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const url = process.env.API;

  useEffect(() => {
    const token = Cookies.get('token');
    setToken(token); // Save token to state
  }, []);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        let res = await fetch(`${url}/api/users/getUser/${token}`);
        res = await res.json();
        setUserValues(res);
        setIsAuthenticatedWhenLoggedIn();
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (token) {
      getUserDetails();
    }
  }, [token, setIsAuthenticatedWhenLoggedIn, setUserValues, url]);

  useEffect(() => {
    if (isAuthenticated && user.role !== "admin") {
      toast.error("You are not authorized to access the admin panel");
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  if (!token) {
    toast.error("You are not authorized to access the admin panel");
    router.push("/");
    return null; // Render nothing if token is not present
  }

  return (
    <div className={` p-3 md:px-10 flex flex-col lg:flex-row gap-10 w-full bg-slate-100 min-h-screen `}>
      <div className=" w-full  md:w-1/3 ">
        <SideBarProfileForAdmin />
      </div>
      <div className=" w-full ">
        {children}
      </div>
    </div>
  );
}
