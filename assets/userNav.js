import { MdDashboard,MdDateRange,MdOutlinePayment   } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaSave,FaCartPlus, FaTruck  } from "react-icons/fa";
import Dashboard from "@/components/Dashboard";
import Reservations from "@/components/Reservations";
import PaymentHistory from "@/components/PaymentHistory";
import ProfileCart from "@/components/ProfileCart";
import MyBooking from "@/components/MyBooking";

export const userNavs=[
    {
        id:3869,
        name:"Dashboard",
        nav:"dashboard",
        icon:<MdDashboard />,
        page:<Dashboard />
    },
    {
        id:3529,
        name:"Profile",
        nav:"profile",
        icon:<CgProfile />,
        page:<></>
    },
    {
        id:5652,
        name:"Reservations",
        nav:"reservations",
        icon:<MdDateRange />,
        page:<Reservations />
    },
    {
        id:6032,
        name:"Payments History",
        nav:"paymentsHistory",
        icon:<MdOutlinePayment />,
        page:<PaymentHistory />
    },
    {
        id:978,
        name:"My Cart",
        nav:"mycart",
        icon:<FaCartPlus  />,
        page:<ProfileCart />
    },
    {
        id:4430,
        name:"My Bookings",
        nav:"mybookings",
        icon:<FaSave />,
        page:<MyBooking />
    },
    {
        id:1823,
        name:"Order Tracking",
        nav:"ordertracking",
        icon:<FaTruck />,
        page:<></>
    },
]