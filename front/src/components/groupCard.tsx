import { useMutation } from "@apollo/client"
import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { REMOVE_USER_FROM_GROUP } from "../graphql"
import { PopUp } from "./popUp"


export const GroupCard = ({ user, permissions, groupId }: any) => {
  const [permPopUp, setPermPopUp] = useState(false)
  const [kickPopUp, setKickPopUp] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [kickUser] = useMutation(REMOVE_USER_FROM_GROUP)
  const kick = async () => {
    await kickUser({
      variables: {
        uid: user._id,
        groupId: groupId
      }
    });
    let users: number = Number(sessionStorage.getItem(`group-${groupId}`))

    sessionStorage.setItem(`group-${groupId}`, (users - 1).toString())
    sessionStorage.setItem(`group-${groupId}-${user._id}`, 'removed')
    setRemoved(true)
  }

  return (
    <>
      {
        !removed &&
          <Box sx={{ border: '1px solid black', padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, borderRadius: 2 }} >
            <Typography>{user.firstName} {user.lastName}</Typography>
            <Box >
              <Button variant="outlined" onClick={() => setPermPopUp(true)} >Permission</Button>
              <Button sx={{ marginLeft: 1 }} onClick={() => setKickPopUp(true)} color={'error'} variant="outlined" >Kick</Button>
            </Box>
            <PopUp popup={permPopUp} setPopup={setPermPopUp} closeValue={null} acceptValue={"OKEY"} >
              <Typography fontWeight={"bold"} fontSize={25} >Permissions</Typography>

              <Box>
                <Typography>Add User {permissions.addUser ? "✅" : "❌"}</Typography>
                <Typography>Remove User {permissions.removeUser ? "✅" : "❌"}</Typography>
              </Box>
            </PopUp>
            <PopUp popup={kickPopUp} setPopup={setKickPopUp} acceptFunction={kick} >
              <Typography fontWeight={"bold"} fontSize={25} >Are you sure to kick this user ❌ ?</Typography>
            </PopUp>
          </Box>
      }
    </>
  )
}