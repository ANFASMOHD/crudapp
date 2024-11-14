import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Read() {

    const {id}=useParams()
    const navigate = useNavigate()
    const [Data,setData]=useState([])


    useEffect(()=>{
        axios.get(`http://localhost:5000/posts/${id}`)
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    }, [])
  return (
    <div className='container'>
        
           
    <div className='container p-5  w-100 vh-100 d-flex  justify-content-center align-items-center '>
    <div className='w-50 border bg-warning-subtle text-dark p-5 rounded shadow'>
        <h1 style={{fontFamily:"sans-serif"}} className='text-center'>Detailes</h1>
   <div className='justify-content-center align-items-center text-center '>
         <p><strong>{Data.id}</strong></p>
         <p><strong>{Data.title}</strong></p>
         
         <p><strong>{Data.body}</strong></p>


     <Link className='btn btn-dark' to='/'>Back</Link>
     </div>
     </div>

</div>
    </div>
  )
}

export default Read