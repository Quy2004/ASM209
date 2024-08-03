import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { instance } from '../../../instance/instance';
type User = {
  _id? : string;
  name : string;
  email : string;
  phone : number;
  password : string;
  avatar : string;
  role : string;
}
const User = () => {
  const [user,setuser] = useState<User[]>([])
  useEffect(() =>{
    const fetch = async () => {
      const {data} = await instance.get(`/user`)
      setuser(data);
    }
    fetch()
  },[]);
  const handleDelete = async(id: string) =>{
    if (!id) {
      return;
    }
    try {
      if(confirm('Are you sure you want to delete')){
      const {data} = await instance.delete(`/user/${id}`);
      setuser(user.filter(u => u._id !== id));
      }
    } catch (error) {
       console.log(error)
    }
  }
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Avartar</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((u) => (
            <TableRow key={u._id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <img src={u.avatar} alt={u.name} style={{ width: '50px' }} />
              </TableCell>
              <TableCell>{u.phone}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                <IconButton aria-label="delete" color="secondary" onClick={() => handleDelete(u._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

export default User