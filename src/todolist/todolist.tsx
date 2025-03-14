import * as React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Box, Button, ButtonGroup, Input, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { addUser, check, deleteUser, editUser } from "../store/todolist/todolistSlice";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Todolist() {
  const data = useSelector((state: RootState) => state.todolist.data);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit]= React.useState(false)
  const [openAdd, setOpenAdd]= React.useState(false)

  const [selectedUser, setSelectedUser]= React.useState({
	id: 0,
	name: "",
	status: false
  })

  //actions
  const handleCheck = (id: number | string) => {
    dispatch(check({id}));
  };
  const handleDelete = (id: number | string)=>{
	dispatch(deleteUser({id}));
  }
  const handleEdit = (user:{id:number,name:string,status:boolean})=>{
	dispatch(editUser(user))
  }
  const handleAdd = (user:{id:number,name:string,status:boolean})=>{
	dispatch(addUser(user))
  }


  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };


  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit= () => {
	setOpenEdit(false)
  }
  const handleCloseAdd= () => {
	setOpenAdd(false)
  }


  return (<>
  <Typography variant='h5' margin={"2vh auto"} width={680} align='center' bgcolor={"darkblue"} borderRadius={"10px"} color='white'>Todolist done with mui, typscript and redux/toolkit</Typography>
  <Button onClick={handleClickOpenAdd} variant='contained' sx={{width:"120px",margin:"auto", display:"inherit"}}>Add new</Button>
    <TableContainer component={Paper} sx={{ width: 750, margin: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((todo) => (
            <TableRow
              key={todo.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {todo.name}
              </TableCell>
              <TableCell>
                <Button
				  size="small"
                  onClick={() => handleCheck(todo.id)}
                  variant="contained"
                  color={todo.status ? "success" : "error"}
                >
                  {todo.status ? "ACTIVE" : "INACTIVE"}
                </Button>
              </TableCell>
              <TableCell align="center">
                <ButtonGroup size="small">
                  <Button sx={{fontSize:"10px"}} onClick={()=>handleDelete(todo.id)} color="error">
                    <DeleteIcon />
                    Delete
                  </Button>
                  <Button onClick={()=>{handleClickOpen()
                        setSelectedUser(todo)
				  }} variant="contained" color="inherit">
                    info
                  </Button>
                  <Button onClick={()=>{handleClickOpenEdit()
					setSelectedUser(todo)
				  }}>
                    <EditIcon /> Edit
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle variant='h3' id="alert-dialog-title">
          {selectedUser.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selectedUser.status?"active":"inactive"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={()=>{handleClose()
			setSelectedUser({id:0,name:"",status:false})
		  }} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
	  <Dialog open={openEdit} onClose={handleCloseEdit}>
		<Box sx={{display:"flex"}} flexDirection={'column'} alignItems={'start'} gap={2} padding={5}>
		<Typography variant='h4'>Edit User</Typography>
		<Input value={selectedUser.name} onChange={(e)=>setSelectedUser({...selectedUser, name: e.target.value})} placeholder='Name'/>
		<Box width={200} display={'flex'} justifyContent={'space-between'}>
		<Button variant='contained' color='success' onClick={()=>{
			handleCloseEdit()
			handleEdit(selectedUser)
			setSelectedUser({id:0,name:"",status:false})}} >Save</Button>
		<Button variant='contained' color='error' onClick={handleCloseEdit}>Close</Button>
		</Box>
		</Box>
	  </Dialog>
	  <Dialog open={openAdd} onClose={handleCloseAdd}>
		<Box sx={{display:"flex"}} flexDirection={'column'} alignItems={'start'} gap={2} padding={5}>
		<Typography variant='h4'>Edit User</Typography>
		<Input value={selectedUser.name} onChange={(e)=>setSelectedUser({...selectedUser, name: e.target.value})} placeholder='Name'/>
		<Box width={200} display={'flex'} justifyContent={'space-between'}>
		<Button variant='contained' color='success' onClick={()=>{
			handleCloseAdd()
			handleAdd(selectedUser)
			setSelectedUser({id:0,name:"",status:false})}} >Save</Button>
		<Button variant='contained' color='error' onClick={handleCloseAdd}>Close</Button>
		</Box>
		</Box>
	  </Dialog>
	
	</>
  );
}
