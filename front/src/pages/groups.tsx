import { useMutation, useQuery } from '@apollo/client'
import { Box, Button, CircularProgress, Input, Typography } from '@mui/material'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Group, PopUp } from '../components'
import { ADD_GROUP, GET_GROUPS } from '../graphql'
import { PlusIcon } from '../icons'

export const Groups = () => {
  const location = useLocation();
  const searchValue = decodeURI(location.search.split("search=")[1]);
  const { data, loading } = useQuery(GET_GROUPS)
  const [popUp, setPopUp] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [add] = useMutation(ADD_GROUP)
  const [newGroups, setNewGroups]: any = useState([])

  const [resultPopUp, setResultPopUp] = useState(false)
  const [resultLoading, setResultLoading] = useState(false)
  const [resultValue, setResultValue] = useState('')

  const addGroup = async () => {
    setPopUp(false)
    setResultPopUp(true)
    setResultLoading(true)
    if(groupName !== '') {
      try {
        const newGroup = await add({
          variables: {
            name: groupName
          }
        })
        setResultValue('Group added successfully')
        setNewGroups([...newGroups, newGroup?.data?.addGroup])
      } catch(err) {
        setResultValue('Something went wrong')
      }
    } else {
      setResultValue('Group name cannot be empty')
    }
    setResultLoading(false)
    setGroupName('')
  }
  
  if(loading) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <CircularProgress size={70} />
      </Box>
    )
  }
  return (
    <Box sx={{ padding: 4, paddingTop: 5, width: '100%' }} >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} >
        <Typography variant='h4' color={'royalblue'} >Groups</Typography>
        <Button onClick={() => setPopUp(true)} sx={{ border: '1px solid royalblue', borderRadius: 6, fontWeight: 'bold', padding: "12px 20px 12px 20px" }} >
          ADD GROUP
          <PlusIcon />
        </Button>
      </Box>
      <Box sx={{ padding: 3, display: 'flex', flexWrap: 'wrap', gap: 4 }} >
        {
          (data?.getGroups.concat(newGroups)).map(({ name, users, _id }: any, indx: Number) => {
            if(name) {
              if(searchValue === "undefined") {
                return <Group onClick={() => setPopUp(true)} width={350} height={200} name={name} users={users} groupId={_id} k={indx} />
              }
              if(name.includes(searchValue)) {
                return <Group onClick={() => setPopUp(true)} width={350} height={200} name={name} users={users} groupId={_id} k={indx} />
              }
            }
          })
        }
      </Box>
      <PopUp closeIfOutSideClick={false} popup={popUp} setPopup={setPopUp} closeValue="back" acceptValue="ADD" acceptFunction={addGroup} >
        <Typography fontWeight={"bold"} marginBottom={2} fontSize={25} >Add Group</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 300, justifyContent: 'space-between' }} >
          <Input placeholder='Group Name..' value={groupName} onChange={(e) => setGroupName(e.target.value)} />
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