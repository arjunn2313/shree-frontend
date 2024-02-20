import React from 'react'
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";


export default function AdminNav() {
  return (
    <div className='container-fluid border py-2'>

        <div className='row'>
            {/* LoGO */}
            <div className='col-2 d-flex justify-content-center align-items-center'>
            <h5 style={{fontFamily:'Mochiy Pop One'}} className='text-success'>Shree Textiles</h5>
            </div>

            {/* search bar */}
            <div className='col-8 d-flex justify-content-around align-items-center border-end'>
             <div className='border border-success h-75 d-flex justify-content-around align-items-center  w-25 rounded-3'  id='admin-search'>
                <CiSearch className='fs-5'/>
                <input type='text' placeholder='search...' className='border-0' id='admin-search' style={{outline:'none'}}/>
             </div>

             <span>
                <IoIosNotifications className='fs-4'/>
             </span>
            </div>

            <div className='col-2 d-flex justify-content-evenly align-items-center'>
            <FaUser className='fs-4'/>

            <div className='d-flex flex-column text-center'>
                <span className='fw-medium'>joe</span>
                <span  className='fw-normal'>Admin</span>
            </div>

            <FaChevronDown className='cursor-pointer'/>
            </div>
        </div>

    </div>
  )
}
