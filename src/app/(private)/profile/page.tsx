'use client'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';

export default function Profile() {



  return (
    <>
      <h1 className='text-3xl'>Configurações</h1>
      <Breadcrumbs separator="›" aria-label="breadcrumb" className='text-xs'>
        {breadcrumbs}
      </Breadcrumbs>
    </>
  )
}
