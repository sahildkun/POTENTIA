import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import {Inter} from 'next/font/google'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/Toaster'
export const metadata = {
  title: 'POTENTIA',
  description: 'An app for self improvement and improving mental health of men ',
}
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  authModal
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html 
     lang='en'
     className={cn('bg-background text-white ', inter.className)}>
      <body className='min-h-screen pt-12 text-white antialiased'>
        {/* @ts-expect-error Server Component */}
       <Navbar/>
       {authModal}
      <div className='container max-w-7xl mx-auto h-full pt-12'>
            {children}
          </div>
          <Toaster/>
      </body>
    </html>
  )
}
