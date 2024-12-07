import React from "react";
import Sidebar from "../components/Sidebar";

export default async function UsersLayout({children} : {children : React.ReactNode}){
    return(
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    );
}