import { useMutation, useQuery } from '@apollo/client'
import { Button, CircularProgress, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CardBox, PopUp } from '../components'
import { ADD_USER, GET_USERS } from '../graphql'
import { PlusIcon } from '../icons'

const search = (searchValue: string, data: Array<String>) => {
  const res = data.filter((e) => {
    if(e.includes(searchValue)) {
      return true
    } return false
  });
  return res[0] ? true : false
}

export const Home = () => {
  const location = useLocation()
  const searchValue = decodeURI(location.search.split("search=")[1]);
  const { data, loading } = useQuery(GET_USERS)
  const [popUp, setPopUp] = useState(false)
  const [resultPopUp, setResultPopUp] = useState(false)
  const [resultValue, setResultValue] = useState('')
  const [resultLoading, setResultLoading] = useState(false)
  const [newUsers, setNewUsers]: any = useState([])
  const [add] = useMutation(ADD_USER)
  const roles = ["CEO", "Manager", "Developer", "Project Manager", "Operator", "Product Manager"]
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: ''
  })
  
  
  if (loading) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <CircularProgress size={70} />
      </Box>
    )
  }

  const addUser = async () => {
    setPopUp(false)
    setResultPopUp(true)
    setResultLoading(true)
    if(user.firstName !== '' || user.lastName !== '' || user.phone !== '' || user.role !== '' || user.email !== '') {
      try {
        const newUser = await add({
          variables: {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "phone": user.phone,
            "role": user.role,
            "email": user.email
          }
        })
        setNewUsers([...newUsers, newUser.data?.addUser])
        setResultValue('User added successfully')
      } catch(err) {
        setResultValue(`Something went wrong: ${err}`)
      }
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: ''
      })
    } else {
      setResultValue(`Cannot be empty`)
    }
    setResultLoading(false)
  }
  return (
    <Box sx={{ padding: 4, paddingTop: 5, width: '100%' }} >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} >
        <Typography variant='h4' color={'royalblue'} >User Management</Typography>
        <Button onClick={() => setPopUp(true)} sx={{ border: '1px solid royalblue', borderRadius: 6, fontWeight: 'bold', padding: "12px 20px 12px 20px" }} >
          ADD USER
          <PlusIcon />
        </Button>
      </Box>
      <Box sx={{ padding: 3, display: 'flex', flexWrap: 'wrap', gap: 4 }} >
        {
          (data?.getUsers.concat(newUsers)).map(({ firstName, lastName, role, phone, _id }: any, indx: Number) => {
            const name = `${firstName} ${lastName}`
            if(searchValue === "undefined") {
              return <CardBox width={400} height={150} firstName={firstName} lastName={lastName} role={role} phone={phone} uid={_id} k={indx} />
            }
            if(search(searchValue, [name, phone, role])) {
              return <CardBox width={400} height={150} firstName={firstName} lastName={lastName} role={role} phone={phone} uid={_id} k={indx} />
            }
          })
        }
      </Box>
      <PopUp closeIfOutSideClick={false} popup={popUp} setPopup={setPopUp} closeValue="back" acceptValue="ADD" acceptFunction={addUser} >
        <Typography fontWeight={"bold"} marginBottom={2} fontSize={25} >Add User</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 300, height: 300, justifyContent: 'space-between' }} >
          <Input placeholder='First Name' value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
          <Input placeholder='Last Name' value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
          <Input placeholder='Email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          <Input placeholder='Phone Number' value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
          <InputLabel id="role">Role</InputLabel>
          <Select
            labelId="role"
            value={user.role}
            onChange={(e) => setUser({...user, role: e.target.value})}
          >
            {
              roles.map((role: string) => <MenuItem value={role}>{role}</MenuItem>)
            }
          </Select>
        </Box>
      </PopUp>
      <PopUp popup={resultPopUp} setPopup={setResultPopUp} closeValue={null} acceptValue={resultLoading ? null : "OKEY"} >
        {
          resultLoading ? 
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
              <CircularProgress size={50} />
            </Box>
          :
            <Typography>{resultValue}</Typography>
        }
      </PopUp>
    </Box>
  )
}