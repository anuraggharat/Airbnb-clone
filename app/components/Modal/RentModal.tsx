"use client"
import React,{useState,useMemo} from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Common/Heading'
import { categories } from '../Navbar/Categories'
import CategoryBox from '../Common/CategoryBox'
import CategoryInput from '../Inputs/CategoryInput'
import { FieldValue, FieldValues, useForm } from 'react-hook-form'
import CountrySelect from '../Inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../Inputs/Counter'
import ImageUpload from '../Inputs/ImageUpload'
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

export default function RentModal() {



    const rentModal = useRentModal()


    const [step,setStep] = useState(STEPS.CATEGORY)

    const onBack = () => {
        setStep((value)=>value-1)
    }

    const onNext = () => {
        setStep((value)=>value+1)
    }

      const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return 'Back'
  }, [step]);


  const {register,handleSubmit,watch,formState:{errors,isLoading,defaultValues},setValue,reset} = useForm<FieldValues>({
    defaultValues:{category:'',location:null,guestCount:1,roomCount:1,bathroomCount:1,imageSrc:'',price:1,title:'',description:''}})


  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')


        const Map = useMemo(() => dynamic(() => import('../Common/Map'), { 
    ssr: false 
  }), [location]);


  const setCustomValue = (id:string,value:any) => {
    setValue(id,value,{
        shouldDirty:true,
        shouldTouch:true,
        shouldValidate:true
    })
  }

  let bodyContent = (
    <div className='flex flex-col gap-8'>
        <Heading
            title='Which of these best describes our place?'
            subTitle='Pick a category'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto p-2'>
            {categories.map(item=>(
                <CategoryInput 
                    key={item.label} 
                    icon={item.icon} 
                    label={item.label} 
                    onClick={(category)=>setCustomValue('category',category)}
                    selected={category === item.label} 
                />
            ))}
        </div>

    </div>
  )

   if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">


        <Heading
          title="Where is your place located?"
          subTitle="Help guests find you!"
        />
        <CountrySelect 
          value={location} 
          onChange={(value) => setCustomValue('location', value)} 
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basic information about your place"
          subTitle="What amenities does your place have?"
        />
        <Counter 
            title='Guests'
            subtitle='How many guests allowed?'
            value={guestCount}
            onChange={(value)=>setCustomValue('guestCount',value)}
        />
        <Counter 
            title='Rooms'
            subtitle='How many rooms present in property?'
            value={roomCount}
            onChange={(value)=>setCustomValue('roomCount',value)}
        />
        <Counter 
            title='Bathrooms'
            subtitle='How many bathrooms present in property?'
            value={bathroomCount}
            onChange={(value)=>setCustomValue('bathroomCount',value)}
        />
      </div>
    );
  }

    if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add Images of your place"
          subTitle="Show guests what your place looks like"
        />
        <ImageUpload 
          value={imageSrc}
          onChange={(value)=>setCustomValue('imageSrc',value)}
        />
      </div>
    );
  }

  return (
    <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionlabel={actionLabel} 
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        title='Airbnb your home!'
        body={bodyContent}

    />
  )
}
