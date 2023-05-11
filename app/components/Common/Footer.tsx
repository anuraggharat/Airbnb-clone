import React from 'react'
import Container from './Container'
import Link from 'next/link'

export default function Footer() {
  return (
    <Container>
       <div className='text-center pb-20'>
         Designed and Developed by <Link className='text-blue-400' href={'https://anuraggharat.vercel.app/'}>anurag</Link>
       </div>
    </Container>
  )
}
