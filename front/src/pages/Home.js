import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [user, setUsers] = useState([]);

    const {id} = useParams();

    useEffect(()=>{
        console.log("page is loading");
        loadUsers();
    },[]);


    const loadUsers =  async ()=>{
        const result = await axios.get('http://localhost:8080/users');
        console.log(result);
        setUsers(result.data);
    }

    const deleteUser = async (id)=> {
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUsers()
    }

  return (
    <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col"> Name </th>
                <th scope="col"> Username </th>
                <th scope="col"> Email </th>
                <th scope="col"> Address </th>
                <th scope="col"> Action </th>
                </tr>
            </thead>
            <tbody>

                {
                    user.map((user, index)=>(
                        <tr>
                            <th scope="row" key={index}>  { index+1 }</th>
                            <td> { user.id } </td>
                            <td> { user.name  } </td>
                            <td> { user.username} </td>
                            <td> { user.email} </td>
                            <td> { user.address } </td>
                            <td> 
                                <Link to={`/user/${user.id}`} className='btn btn-outline-success mx-2'> View </Link>
                                <Link to={ `/edit-user/${user.id}`} className='btn btn-outline-primary mx-2'> Edit </Link>
                                <button
                                onClick={()=> deleteUser(user.id)} 
                                className='btn btn-outline-danger mx-2'
                                > Delete </button>
                            </td>
                        </tr>
                   
                    ))
                }

               
            </tbody>
            </table>

        </div>

        

    </div>
  )
}
