import React, { useState } from "react";
import "./question.css";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

export default function Question() {
  const questions = [
    {
      id: 1,
      qns: "How long until we deliver your product?",
      content:
        "The delivery time for orders ranges from 2 to 7 business days from the order confirmation, however, it may vary depending onthe specific circumstances of each order.",
    },
    {
      id: 2,
      qns: "Do you offer money back guarentee?",
      content:
        "The delivery time for orders ranges from 2 to 7 business days from the order confirmation, however, it may vary depending onthe specific circumstances of each order.",
    },
    {
      id: 3,
      qns: "Is it washable ?",
      content:
        "The delivery time for orders ranges from 2 to 7 business days from the order confirmation, however, it may vary depending onthe specific circumstances of each order.",
    },
    {
      id: 4,
      qns: "How to get this product?",
      content:
        "The delivery time for orders ranges from 2 to 7 business days from the order confirmation, however, it may vary depending onthe specific circumstances of each order.",
    },
    {
      id: 5,
      qns: "Do you ship out of India?",
      content:
        "The delivery time for orders ranges from 2 to 7 business days from the order confirmation, however, it may vary depending onthe specific circumstances of each order.",
    },
  ];

  const [index, setIndex] = useState(1);
  const [index2, setIndex2] = useState(0);
  const handleShow = (id) => {
    if (id === index2) {
      setIndex2(null);
    } else {
      setIndex2(id);
    }
  };
  return (
    <div className="question">
      <div className="text-center pt-5 pb-5">
        <h2 id="header-qstn">Frequently Asked Questions</h2>
      </div>

      <div className="qstn-con mx-auto d-flex">
        <div className="p-3 qstnbox">
          {questions.slice(0, 2).map((qstn, i) => (
            <div
            key={i}
              className="mb-4  bg-white p-2 py-3 rounded-4 content"
              onClick={() => setIndex(qstn.id)}
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
            >
              <div className="d-flex align-items-center justify-content-start gap-2">
                <FaPlus className="fs-2" />
                <h6 className="">{qstn.qns}</h6>
              </div>
              <div className="w-100 d-flex">
                <div className="w-25"></div>
                <p
                  className={
                    index === qstn.id ? "d-block text-secondary p-2" : "d-none"
                  }
                  id="qstn-content"
                >
                  {qstn.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 qstnbox ">
          {questions.slice(2, 5).map((qstn, i) => (
            <div
              className="mb-4  bg-white p-2 py-3 rounded-4 content"
              onClick={() => handleShow(qstn.id)}
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
            >
              <div className="d-flex align-items-center justify-content-start gap-2">
                {index2 === qstn.id ? (
                  <FaMinus className="fs-2" />
                ) : (
                  <FaPlus className="fs-2" />
                )}
                <h6 className=" ">{qstn.qns}</h6>
              </div>
              <div className="w-100 d-flex">
                <div className="w-25"></div>
                <p
                  className={
                    index2 === qstn.id ? "d-block text-secondary p-2" : "d-none"
                  }
                >
                  {qstn.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// <div className="question">
//   <div className="text-center pt-5 pb-5">
//     <h2>Frequently Asked Questions</h2>
//   </div>

//   <div className="qstn-con mx-auto d-flex">
//     <div className="w-50 p-3 ">
//       {questions.slice(0, 2).map((qstn, i) => (
//         <div className="mb-4  bg-white p-2 py-3 rounded-4 content"
//         onClick={()=>setIndex(qstn.id)}
//         style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',cursor:'pointer' }}>
//           <div className="d-flex align-items-center justify-content-start gap-2">
//             <FaPlus className="fs-2" />
//             <h6 className="">{qstn.qns}</h6>
//           </div>
//           <div className="w-100 d-flex">
//             <div className="w-25"></div>
//             <p className={index === qstn.id ? "d-block text-secondary p-2" : "d-none"}>
//              {qstn.content}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>

//     <div className="w-50 p-3 ">
//       {questions.slice(2, 5).map((qstn, i) => (
//         <div className="mb-4  bg-white p-2 py-3 rounded-4 content"
//         onClick={()=>handleShow(qstn.id)}
//         style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',cursor:'pointer' }}>
//           <div className="d-flex align-items-center justify-content-start gap-2">
//            {index2 === qstn.id ? <FaMinus className="fs-2"/> : <FaPlus className="fs-2" /> }
//             <h6 className=" ">{qstn.qns}</h6>
//           </div>
//           <div className="w-100 d-flex">
//             <div className="w-25"></div>
//             <p className={index2 === qstn.id ? "d-block text-secondary p-2" : "d-none"}>
//              {qstn.content}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>

//   </div>
// </div>
