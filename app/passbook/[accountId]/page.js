import Passbook from '@/components/passbook/Passbook'
import React from 'react'

const accountpage = ({params}) => {
  return (
    <Passbook accountId={params.accountId}/>
  )
}

export default accountpage