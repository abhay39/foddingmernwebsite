"use client"
import FoodieStore from "@/store";
import { Provider } from "react-redux";

const StartingPage=({children})=>{
    return(
        <Provider store={FoodieStore}>
            {children}
        </Provider>
    )
}

export default StartingPage;