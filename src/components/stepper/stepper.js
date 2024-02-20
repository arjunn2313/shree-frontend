import React, { useState } from 'react'
import './stepper.css'

export default function Stepper({steps,currentStep,setCurrentStep}) {
    // const steps = ["Mobile","Address","Payment"]
    // const [currentStep,setCurrentStep] = useState(1)
  return (
    <>
    <div className='d-flex justify-content-between'>
        {
            steps.map((step,i)=>(
                <div key={i} className={`step-item ${currentStep === i+1 && "active"} ${currentStep > i+1 && "complete"}`}>
                    <div className='step rounded-circle fw-medium'>0{i + 1}</div>
                    <p>{step}</p>
                    </div>
            ))
        }

       
    </div>
  {/* <div className='text-center'>
  <button className='btn btn-success' onClick={()=>setCurrentStep(currentStep + 1)}>Next</button>
  </div> */}
     
    </>
  )
}
