import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [data, setData] = useState([]);


  const fetchData = async () => {
    try {

      const placeholderData = await axios.get('http://localhost:5000/posts');

      const localData = await axios.get('http://localhost:5000/posts');
   
      setData([...placeholderData.data, ...localData.data]);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm('Do you want to delete this item?');
    if (confirm) {
 
      axios
        .delete(`http://localhost:5000/posts/${id}`)
        .then((res) => {
          toast.success('Deleted Successfully');
       
          setData((prevData) => prevData.filter((item) => item.id !== id));
        })
        .catch((err) => {
          console.error('Failed to delete data:', err);
          toast.error('Failed to delete data');
        });
    }
  };

  
  const handleAdd = (postData) => {
    axios
      .post('http://localhost:5000/posts', postData)
      .then((res) => {
        toast.success('Created Successfully');
      
        setData((prevData) => [...prevData, res.data]);
      })
      .catch((err) => {
        console.error('Failed to create data:', err);
        toast.error('Failed to create data');
      });
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="text-center" style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>
          <h1>CRUD APP</h1>
        </div>
        <div>
          <Link to="/create" className="btn btn-success my-2">
            Create +
          </Link>
        </div>
        <table className="table rounded bg-white shadow">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Body</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No items to display
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                  <td className="d-flex">
                    <Link to={`/update/${item.id}`} className="me-2 btn btn-primary">
                      Update
                    </Link>
                    <button className="me-2 btn btn-danger" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                    <Link to={`/read/${item.id}`} className="me-2 btn btn-primary">
                      Read
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer autoClose={1000} position="top-center" theme="colored" />
    </div>
  );
}

export default Home;
