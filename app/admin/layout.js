import SideBarProfile from "@/components/SideBarProfile";
import SideBarProfileForAdmin from "@/components/SideBarProfileForAdmin";



export default function RootLayout({ children }) {



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
