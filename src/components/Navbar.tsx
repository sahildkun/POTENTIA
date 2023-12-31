import React from 'react'
import Link from 'next/link'
import { buttonVariants } from './ui/Button'
import UserAccountNav from './UserAccountNav'
import { getAuthSession } from '@/lib/auth'
type Props = {}

const Navbar = async (props: Props) => {
  const session = await  getAuthSession();
  console.log(session?.user );
  return (
    <div className='fixed top-0 inset-x-0 h-fit  backdrop-blur-[12px]  t border-b border-zinc-300 z-[10] py-2'>
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        {/* logo */}
        <Link href='/' className='flex gap-2 items-center'>
          {/* <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' /> */}
          <p className='hidden text-white text-sm font-medium md:block'>Potentia</p>
        </Link>

        {/* search bar */}
        {/* <SearchBar /> */}

        {/* actions */}
        
         {session?.user  ?
          <UserAccountNav user={session.user}/>
         
          : 
         <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>}
   
      </div>
    </div>
  )
}

export default Navbar