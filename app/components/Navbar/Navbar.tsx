'use client';
import Logo from "./Logo"
import Search from "./Search"
import { UserMenu } from "./UserMenu"

export const Navbar = () => {
  return (
    <div 
        className='fixed w-full bg-white z-10 shadow-sm flex flex-row p-5 justify-between'
    >
        <div className="p-2">
            <Logo />     
        </div>   
            <Search />
               
            <UserMenu />
    </div>
  )
}
