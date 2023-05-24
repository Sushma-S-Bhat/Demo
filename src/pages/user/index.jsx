import CustomizedTables from '@/component/Table'
import User from '@/component/User'
import { UserContextProvider } from '@/context/UserContextProvider'
import React from 'react'

function UserPage() {
  return (
    <UserContextProvider>
        <User/>
    </UserContextProvider>
  )
}

export default UserPage