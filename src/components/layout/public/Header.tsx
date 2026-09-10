"use client"
import { Button } from "@/components/ui/button";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const Header = () => {

  const {data, isLoading} = useGetMe()
  const {mutate: logout} = useLogout()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout successful.")
        queryClient.removeQueries({queryKey : ['user']})
      },
      onError : ()=>{
        toast.error("Something went wrong. Try again.")
      }
    })

  }


  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
    { name: "Contact", url: "/contact" },
  ];
  return (
    <div className="w-full h-16 border-b gap-6">

     <div className="max-w-7xl mx-auto flex justify-between items-center">
       <div>
          <h1>ADVISO</h1>
       </div>
       <div className="space-x-6">
        {routes.map((route) => (
        <Link key={route.name} href={route.url}>
          {" "}
          {route.name}
        </Link>
      ))}

       </div>
       <div>
        {
          !isLoading && !data && (
            <Link href={'/login'}>
        <Button>
          Login
        </Button>
        </Link>
          )
        }

         {
          !isLoading && data && (
            
        <Button onClick={handleLogout}>
          Logout
        </Button>
       
          )
        }
        
       </div>
     </div>

    
    </div>
  );
};

export default Header;
