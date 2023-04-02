import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const PageNotFound = () => {
    const router = useRouter();

    useEffect(()=>{
        setTimeout(()=>{
            router.push('/')
        },3000)
    },[])
    return (
    <div className=''>
        <div className='text-[280px] text-gray-400 flex justify-center'>404</div>
        <div className='text-[100px] text-gray-700 flex justify-center'>Page Not Found</div>
        <p className='flex justify-center'>Redirecting to -  <Link href='/'> Home Page-</Link></p>

    </div>
  )
}

export default PageNotFound