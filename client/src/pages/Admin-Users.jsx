import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import {Link} from 'react-router-dom';
import moment from 'moment';

const AdminUsers = () => {

  const[users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');  // Search query
  const [filteredUsers, setFilteredUsers] = useState([]);
  const {authorizationToken} = useAuth();
  const placeHolderImage = "https://placehold.co/400";

  const getAllUsersData = async ()=>{
    try{
      //http://localhost:5000/api/admin/users
      const response = await fetch("https://localhost:5000/api/form/contact",
        {
          method:"GET",
          headers:{
            "Authorization": authorizationToken,
          },
        }
      )
      const data = await response.json();
      console.log(`users : ${data}`);
      setUsers(data);
    }catch(error){
      console.log(error);
    }
  }

  //deleting user on btn
  const deleteUser = async (id)=>{
    if (!authorizationToken) {
      console.error("Authorization token is missing.");
      return;
    }
    try {
        const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,
            {
              method:"DELETE",
              headers:{
                "Authorization": authorizationToken,
              },
            }
          );

      const data = await response.json();
      console.log(`users after delete: ${data}`)

      if(response.ok){
        getAllUsersData();
      }
  }
  catch(error){
  console.log(error);
  }
}

 // Filter users based on search query
 const handleSearch = (event) => {
  const query = event.target.value.toLowerCase();
  setSearchQuery(query);
  
  const filtered = users.filter((user) => {
    return (
      user.username.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query) ||
      user.designation.toLowerCase().includes(query) ||
      user.gender.toLowerCase().includes(query) ||
      user.course.some((c) => c.toLowerCase().includes(query))
    );
  });

  setFilteredUsers(filtered);
};

  useEffect(()=>{
    getAllUsersData();
  }, []);
  
  return (
    <>
    <section className="admin-users-section">
      <div className="container">
        <h2>Admin User Data | Total Count {users.length}</h2>
        <div className='search-box'>
        <label htmlFor="Seach">Search</label>
        <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearch}
            style={{ padding: '5px', margin: '10px 0', width: '300px' }}
          />
          </div>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile number</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {users.map((curUser, index) =>{
            return <tr key={curUser._id}>
              <td data-label="Unique-Id">{`${curUser._id.substring(5, 9)}${index + 1}`}</td>
              <td>
                <img src={curUser.image || placeHolderImage} alt="user-image"/>
                </td>
              <td>{curUser.username}</td>
              <td>{curUser.email}</td>
              <td>{curUser.phone}</td>
              <td>{curUser.designation}</td>
              <td>{curUser.gender}</td>
              <td>{curUser.course}</td>
              <td>{moment(curUser.updatedAt).format("DD-MMM-YYYY")}</td>
              <td><Link to={`/admin/users/${curUser._id}/edit`}> Edit </Link></td>
              <td> <button className='btn-delete' onClick={()=> deleteUser(curUser._id)}>Delete </button></td>
            </tr>
          })}
          </tbody>
        </table>
      </div>
    </section>
    </>
  )
}

export default AdminUsers;
