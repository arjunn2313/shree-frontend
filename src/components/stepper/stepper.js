import React, { useState } from "react";
import "./stepper.css";

export default function Stepper({ steps, currentStep, setCurrentStep }) {
  return (
    <>
      <div className="d-flex justify-content-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              currentStep > i + 1 && "complete"
            }`}
          >
            <div className="step rounded-circle fw-medium d-flex justify-content-center align-items-center">
              0{i + 1}
            </div>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </>
  );
}
