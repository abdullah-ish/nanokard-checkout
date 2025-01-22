import React from 'react'
import InnerLayout from '../components/layout/InnerLayout'
import LoginForm from '../components/Login/LoginForm'

const Login = () => {
  return (
      <div>
          <div className="hidden sm:block">
              <InnerLayout >
                  <LoginForm />
              </InnerLayout>
          </div>
          <div  className="block sm:hidden bg-white">
              <LoginForm />
          </div>
      </div>
  )
}

export default Login