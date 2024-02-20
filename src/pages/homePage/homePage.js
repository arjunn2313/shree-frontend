import React from 'react'
import NavBar from '../../components/navBar/navBar'
import Hero from '../../components/hero/hero'
import Featured from '../../components/featured/featured'
import Offer from '../../components/offers/offer'
import Designer from '../../components/designer/designer'
import Footer from '../../components/footer/footer'
import ContactForm from '../../components/contactform/contactForm'
import Question from '../../components/customerQustion/question'
import Heros from '../../components/hero/heros'
 

export default function HomePage() {
  return (
     <>
    
     {/* <Hero/> */}
      <Heros/>
     <Featured/>
     {/* <Offer/> */}
     <Designer/>
     <Question/>
     <ContactForm/>
     
     </>
  )
}
