'use client';
import { SafeUser } from "@/app/types";
import Logo from "./Logo"
import Search from "./Search"
import { UserMenu } from "./UserMenu"
import {User} from '@prisma/client'

interface NavbarProps {
  currentUser?: SafeUser | null
}

export const Navbar = (props:NavbarProps) => {
console.log(props.currentUser)

  return (
    <div 
        className='fixed w-full bg-white z-10 shadow-sm flex flex-row p-5 justify-between'
    >
        <div className="p-2">
            <Logo />     
        </div>   
            <Search />
               
            <UserMenu currentUser={props.currentUser} />
    </div>
  )
}
