'use client'
import React from 'react'
import axios from 'axios'   
import { AiFillGithub } from 'react-icons/ai'
import {FcGoogle} from 'react-icons/fc'
import {useState,useCallback} from 'react'
import { FieldValues,SubmitHandler,useForm } from 'react-hook-form'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Common/Heading'

export default function RegisterModal() {
  
    const registerModal = useRegisterModal();
    const [loading,setLoading] = useState(false)

    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }})
  

   const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setLoading(true)
    axios.post('/api/register',data)
    .then(()=>{registerModal.onClose()})
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
   }     


   const bodyContent = (
    <div className='flex flex-col gap-4'>
        <Heading title='Welcome to Airbnb' subTitle='Create an account' center />
    </div>
   )

    return (
        <Modal 
        disabled={loading} 
        isOpen={registerModal.isOpen} 
        title='Register' 
        actionlabel='Continue' 
        onClose={registerModal.onClose} 
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        />
  )
}
