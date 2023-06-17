import React from 'react'
import SignUp from '@/components/SignUp'
import CloseModal from '@/components/CloseModal'
type Props = {}

const page = (props: Props) => {
  return (
    <div className='fixed inset-0 backdrop-blur-[7px]  z-10'>
    <div className='container flex items-center h-full max-w-lg mx-auto'>
      <div className='relative bg-white w-full h-fit py-20 px-2 rounded-lg'>
        <div className='absolute top-4 right-4'>
          <CloseModal/>
        </div>

        <SignUp />
      </div>
    </div>
  </div>
  )
}

export default page