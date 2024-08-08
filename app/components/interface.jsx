import React from 'react'
import { Nav } from './Nav'
import { AddTap } from './AddTap'

export const UI = () => {
  return (
    <div className='relative h-screen w-full bg-slate-300'>
        <Nav/>
        <AddTap/>
    </div>
  )
}
