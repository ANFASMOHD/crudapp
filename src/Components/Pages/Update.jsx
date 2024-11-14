import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Update() {
    const { id } = useParams();
    const [inputData, setInputData] = useState({
        id: id,
        title: "",
        body: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
      
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => setInputData(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        console.log("Updating post at:", `http://localhost:5000/posts/${id}`);
        console.log("Input Data:", inputData);
    
        axios.put(`http://localhost:5000/posts/${id}`, inputData)
            .then(res => {
                toast.success("Data Updated Successfully");
    
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch(err => {
                console.error("Failed to update data:", err);
                toast.error("Failed to update data");
            });
    };
    

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-warning-subtle text-dark p-5 rounded shadow'>
            <h1 style={{fontFamily:"sans-serif"}} className='text-center'>Update Data</h1>
                <form onSubmit={handleSubmit}>

                    <div className='d-flex p-3'>
                        <label className='p-2' htmlFor='id'>ID</label>
                        <input type="number" disabled name='id' className='form-control shadow' value={inputData.id} />
                    </div>

                    <div className='d-flex p-3'>
                        <label className='p-2' htmlFor='title'>Title</label>
                        <input type="text" name='title' className='form-control shadow'
                            onChange={e => setInputData({ ...inputData, title: e.target.value })} value={inputData.title} />
                    </div>

                    <div className='d-flex p-3'>
                        <label className='p-2' htmlFor='body'>Body</label>
                        <input type="text" name='body' className='form-control shadow'
                            onChange={e => setInputData({ ...inputData, body: e.target.value })} value={inputData.body} />
                    </div>

                    <br />
                    <div className='text-center'>
                        <button className='btn btn-info shadow'>Update</button>
                    </div>
                </form>

                <div className='top-center'>
                    <ToastContainer autoClose={1000} position='top-center' theme='colored'></ToastContainer>
                </div>
            </div>
        </div>
    );
}

export default Update;
