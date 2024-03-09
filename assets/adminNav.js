import { MdDashboard,MdDateRange,MdOutlinePayment   } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaFirstOrderAlt, FaSave} from "react-icons/fa";
import Dashboard from "@/components/Dashboard";
import Reservations from "@/components/Reservations";

import MyBooking from "@/components/MyBooking";
import { GrProductHunt } from "react-icons/gr";
import { TbUsersGroup } from "react-icons/tb";
import TotalUsers from "@/components/TotalUsers";
import AddProduct from "@/components/AddProduct";
import TotalProducts from "@/components/TotalProducts";
import TotalOrders from "@/components/TotalOrders";
import TotalCarts from "@/components/TotalCarts";
import TotalPayments from "@/components/TotalPayments";

export const adminNavs=[
    {
        id:59,
        name:"Dashboard",
        nav:"dashboard",
        icon:<MdDashboard />,
        page:<Dashboard />
    },
    
    {
        id:28,
        name:"All Users",
        nav:"allUsers",
        icon:<TbUsersGroup />,
        page:<TotalUsers />
    },
    {
        id:36,
        name:"All Products",
        nav:"totalProducts",
        icon:<GrProductHunt />,
        page:<TotalProducts />
    },
    {
        id:96,
        name:"All Orders",
        nav:"allOrder",
        icon:<MdDateRange />,
        page:<TotalOrders />
    },
    {
        id:68,
        name:"All Payments",
        nav:"allPayments",
        icon:<MdDateRange />,
        page:<TotalPayments />
    },
   
    {
        id:15,
        name:"All Carts",
        nav:"allCarts",
        icon:<FaSave />,
        page:<TotalCarts />
    },

]