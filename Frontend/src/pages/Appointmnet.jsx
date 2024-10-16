import React from 'react'
import AppointmnetForm from '../components/AppointmnetForm'
import Hero from "../components/Hero"


const Appointmnet = () => {
  return (
   <>
   <Hero  title={ " Schedule Your Appointmnet | Techy Medical Institute" } imageUrl={"/signin.png"}/>


   <AppointmnetForm/>
   
   </>
  )
}

export default Appointmnet