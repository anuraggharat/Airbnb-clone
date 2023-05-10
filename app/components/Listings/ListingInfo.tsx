'use client'
import useCountries from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import React from 'react'
import { IconType } from 'react-icons'
import Avatar from '../Common/Avatar'
import ListingCategory from './ListingCategory'
import dynamic from 'next/dynamic'

const Map = dynamic(()=>import('../Common/Map'),{ssr:false})

interface ListingInfoProps {
    user:SafeUser
    description:string,
    guestCount:number,
    roomCount:number,
    bathroomCount:number,
    category:{
        icon:IconType,
        label:string,
        description: string
    } | null | undefined
    locationValue: string
}


export default function ListingInfo({bathroomCount,category,description,guestCount,locationValue,roomCount,user}:ListingInfoProps) {
  
  const {getByValue}=useCountries()
  const coordinates = getByValue(locationValue)?.latlng
    return (
    <div className='col-span-4 flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
            <div className='text-xl font-semibold flex flex-row items-center gap-2'>
                <div>Hosted by {user?.name}</div>
                <Avatar src={user?.image} />
            </div>
            <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
                <p>{guestCount} guests</p>
                <p>{roomCount} rooms</p>
                <p>{bathroomCount} bathrooms</p>
            </div>
        </div>
        {category && (
            <ListingCategory
                icon={category.icon}
                label={category.label}
                description={category.description}
            />
        )}
        <hr/>
        <div className='text-lg font-light text-neutral-500'>
            {description}
        </div>
        <hr/>
        <Map center={coordinates} />
    </div>
  )
}
