import React,{Fragment,FC} from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Dashboard:FC = () => {
  return (
      <Fragment>
      <Sidebar/>
      <Navbar/>
      </Fragment>
  )
}

export default Dashboard