import { MdDashboard,MdDateRange,MdOutlinePayment   } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaSave,FaCartPlus, FaTruck  } from "react-icons/fa";

export const userNavs=[
    {
        id:3869,
        name:"Dashboard",
        icon:<MdDashboard />
    },
    {
        id:3529,
        name:"Profile",
        icon:<CgProfile />
    },
    {
        id:5652,
        name:"Reservations",
        icon:<MdDateRange />
    },
    {
        id:6032,
        name:"Payments History",
        icon:<MdOutlinePayment />
    },
    {
        id:978,
        name:"My Cart",
        icon:<FaCartPlus  />
    },
    {
        id:4430,
        name:"My Bookings",
        icon:<FaSave />
    },
    {
        id:1823,
        name:"Order Tracking",
        icon:<FaTruck />
    },
]