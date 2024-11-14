import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Create() {
  const [inputData, setInputData] = useState({
    title: '',
    body: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, body } = inputData;
    if (!title || !body) {
      toast.info("Please fill the form");
    } else {
      axios.post("http://localhost:5000/posts",inputData)
        .then((res) => {
          toast.success("Data Posted Successfully");
          setTimeout(() => {
            navigate('/');
          }, 2000);
        })
        .catch((error) => {
          toast.error("Error posting data");
          console.error("Axios error:", error);
        });
    }
  };



  return (
    <div>
         <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-warning-subtle text-dark p-5 rounded shadow'>
        <h1 style={{fontFamily:"sans-serif"}} className='text-center'>Create New Data</h1>
            <form onSubmit={handleSubmit}>
                <div className='d-flex p-3'>
                    <label className='p-2'  htmlFor='title'>Title</label>
                    <input type="text"  name='name'  className='form-control shadow'
                    onChange={e=> setInputData({...inputData,title: e.target.value})}/>
                    
                </div>

                <div className='d-flex p-3'>
                    <label className='p-2' htmlFor='body'>Body</label>
                    <input type="textarea" name='body'  className='form-control shadow'
                     onChange={e=> setInputData({...inputData,body: e.target.value})}/>
                </div><br/>
     <div className='text-center'><button className='btn btn-info shadow'> Submit</button></div>
            </form>

           <div className='top-center'> <ToastContainer autoClose={1000} position='top-center' theme='colored'></ToastContainer></div>
        </div>

       
    </div>

    </div>
  )
}

export default Create