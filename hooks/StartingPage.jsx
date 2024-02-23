"use client"
import FoodieStore from "@/store";
import { Provider } from "react-redux";
import {SessionProvider} from 'next-auth/react'

const StartingPage=({children})=>{
    return(
        <Provider store={FoodieStore}>
           <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>
    )
}

export default StartingPage;