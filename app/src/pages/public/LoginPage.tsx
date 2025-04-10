import React from 'react'

const LoginPage = () => {
  return (
    <>
      <div className='flex items-center justify-center h-screen w-full'>
        <div className='grid grid-cols-12 ring-1 w-full'>
          <div className='col-span-6 mx-auto'>
            <h1 className='text-4xl font-bold'>Login Page</h1>
            <p className='text-xl'>This is the login page.</p>
          </div>
          <div className='col-span-6 mx-auto'>
            <div>
              <h1 className='text-4xl font-bold'>Welcome Back</h1>
              <p className='text-xl'>Please login to your account.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage