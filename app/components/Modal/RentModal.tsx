"use client"

import React from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'

export default function RentModal() {

    const rentModal = useRentModal()

  return (
    <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        actionlabel='Submit'
        title='Airbnb your home!'

    />
  )
}
