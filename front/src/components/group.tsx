import { Button, Checkbox, CircularProgress, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { MoreIcon } from '../icons';
import Menu from '@mui/material/Menu';
import { PopUp } from './popUp';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_USER, GET_USERS, INVITE_USER_TO_GROUP, REMOVE_GROUP } from '../graphql';
import { GroupCard } from './groupCard';


const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

const check = (id: string, data: any) => {
  let res = true;
  data?.forEach((e: any) => {
    if(e._id === id) {
      res = false
    } 
  });
  return res
}

export const Group = ({ width, height, name, users, k, groupId }: any) => {
  if (!sessionStorage.getItem(`group-${groupId}`)) {
    sessionStorage.setItem(`group-${groupId}`, '0')
  }
  const usersL = sessionStorage.getItem(`group-${groupId}`)
  const [removed, setRemoved] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const [getUser, { data }] = useLazyQuery(GET_USER)
  const [menuItem, setMenuItem] = useState(null);
  const open = Boolean(menuItem);
  const [invitePopUp, setInvitePopUp] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState('')
  const { data: userData } = useQuery(GET_USERS)
  const permissions = ["AddUser", "RemoveUser"]
  const [permission, setPermission] = useState<string[]>([])
  const [resultPopUp, setResultPopUp] = useState(false)
  const [resultLoading, setResultLoading] = useState(false)
  const [resultValue, setResultValue] = useState('')
  const [inviteUserToGroup] = useMutation(INVITE_USER_TO_GROUP)
  const [removeGroup] = useMutation(REMOVE_GROUP)
  const [deleteGroupPopUp, setDeleteGroupPopUp] = useState(false)
  useEffect(() => {
    let search: any = [];
    users.map(async (userData: any) => {
      search.push({
        "_id": userData.uid
      })
    });
    getUser({
      variables: {
        id: search
      }
    })
  }, [data])

  const handleClick = (event: any) => {
    setMenuItem(event.currentTarget);
  };

  const inviteMember = async () => {
    setInvitePopUp(false)
    setResultPopUp(true)
    setResultLoading(true)
    try {
      await inviteUserToGroup({
        variables: {
          uid: selectedUsers,
          groupId: groupId,
          permissions: {
            addUser: (permission.includes('AddUser')),
            removeUser: (permission.includes('RemoveUser'))
          }
        }
      });
      setResultValue('User added successfully');

      let users: number = Number(sessionStorage.getItem(`group-${groupId}`))
      sessionStorage.setItem(`group-${groupId}`, (users + 1).toString())
    } catch (err) {
      setResultValue('Something went wrong')
    }
    setResultLoading(false)
    setPermission([])
    setSelectedUsers('')
  }

  const deleteGroup = async () => {
    setDeleteGroupPopUp(false)
    setResultPopUp(true)
    setResultLoading(true)
    try {
      await removeGroup({
        variables: {
          id: groupId
        }
      })
      setResultValue('Group deleted successfully');
      setRemoved(true)
    } catch (err) {
      setResultValue('Something went wrong')
    }
    setResultLoading(false)
  }

  return (
    <>
      {
        !removed &&
        <Box sx={{
          width: width,
          height: height,
          boxShadow: '2px 2px 6px 2px #afb5bd',
          display: 'flex',
          borderRadius: 5,
          flexDirection: 'column'
        }} key={k} >
          <Box sx={{ width: '100%', height: '40%', backgroundColor: stringToColor(name), borderTopRightRadius: 20, display: 'flex', padding: 1, alignItems: 'flex-end' }} >
            <Typography fontSize={'1.5vw'} color={'white'} fontWeight={'bold'} >{name}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', height: '100%', width: '100%', alignItems: 'flex-start' }} >
              <Box id="test" sx={{ cursor: "pointer" }}>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(handleClick)}
                >
                  <MoreIcon color="white" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={menuItem}
                  open={open}
                  onClose={() => setMenuItem(null)}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => setInvitePopUp(true)}>Invite member</MenuItem>
                  <MenuItem onClick={() => setDeleteGroupPopUp(true)}>Delete group</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Box>
          <Button onClick={() => setPopUp(true)} sx={{ width: '100%', height: '80%', padding: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Typography fontSize={20} fontWeight={'bold'} sx={{ opacity: 0.5 }} >{users.length + Number(usersL)} users</Typography>
          </Button>
        </Box>
      }
      <PopUp popup={popUp} setPopup={setPopUp} closeValue={null} acceptValue={"OKEY"} >
        <Typography fontWeight={"bold"} fontSize={30} >{name}</Typography>
        <Box sx={{ width: 400 }} >
          {
            !data &&
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <CircularProgress size={50} />
              </Box>
          }
          {
            data && data?.getUser.map((user: any, indx: number) => {
              
              if (sessionStorage.getItem(`group-${groupId}-${user._id}`) !== 'removed') {
                return <GroupCard groupId={groupId} user={user} permissions={users[indx].permissions} />
              }
            })
          }
        </Box>
      </PopUp>
      <PopUp acceptValue={'Invite'} popup={invitePopUp} setPopup={setInvitePopUp} acceptFunction={inviteMember} >
        <Box sx={{ height: 250, width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
          <Typography>Users: </Typography>
          <TextField
            defaultValue={name}
            InputProps={{
              readOnly: true,
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="group">Users</InputLabel>
            <Select
              sx={{ width: 200 }}
              labelId="users"
              value={selectedUsers}
              onChange={(e) => setSelectedUsers(e.target.value)}
            >
              {
                userData?.getUsers.map(({ _id, firstName, lastName }: any) => {
                  if(check(_id, data?.getUser)) {
                    return <MenuItem value={_id}>{firstName} {lastName}</MenuItem>
                  }
                })
              }
            </Select>
          </FormControl>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="permission">Permission</InputLabel>
            <Select
              labelId="permission"
              multiple
              value={permission}
              onChange={(e) => setPermission(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) => selected.join(', ')}
            >
              {permissions.map((perm) => (
                <MenuItem key={perm} value={perm}>
                  <Checkbox checked={permission.indexOf(perm) > -1} />
                  <ListItemText primary={perm} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </PopUp>
      <PopUp popup={deleteGroupPopUp} setPopup={setDeleteGroupPopUp} acceptFunction={deleteGroup} >
        <Typography fontWeight={"bold"} fontSize={25} >Are you sure to delete this group ❌ ?</Typography>
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
    </>
  )
}