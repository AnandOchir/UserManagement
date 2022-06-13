import { Avatar, Button, Checkbox, CircularProgress, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { MoreIcon } from '../icons';
import Menu from '@mui/material/Menu';
import { PopUp } from './popUp';
import { useMutation, useQuery } from '@apollo/client';
import { GET_GROUPS, INVITE_USER_TO_GROUP, REMOVE_USER } from '../graphql';

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

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 100,
      height: 100
    },
    children: <Typography fontSize={30} >{name.split(' ')[0][0]}{name.split(' ')[1][0]}</Typography>,
  };
}


export const CardBox = ({ width, height, firstName, lastName, role, phone, uid, k }: any) => {
  const permissions = ["AddUser", "RemoveUser"]
  const [removeUserDialog, setRemoveUserDialog] = useState(false);
  const [inviteDialog, setInviteDialog] = useState(false);
  const [menuItem, setMenuItem] = useState(null);
  const [resultPopUp, setResultPopUp] = useState(false)
  const [resultLoading, setResultLoading] = useState(false)
  const [resultValue, setResultValue] = useState('')
  const [removed, setRemoved] = useState(false)
  const { data } = useQuery(GET_GROUPS)
  const [removeUserF] = useMutation(REMOVE_USER)
  const [inviteUserToGroup] = useMutation(INVITE_USER_TO_GROUP)
  const [selectedGroup, setSelectedGroup] = useState("");
  const [permission, setPermission] = useState<string[]>([])
  const open = Boolean(menuItem);

  const handleClick = (event: any) => {
    setMenuItem(event.currentTarget);
  };
  const inviteGroup = () => {
    setMenuItem(null);
    setInviteDialog(true)
  };
  const removeUser = () => {
    setMenuItem(null);
    setRemoveUserDialog(true)
  };

  const remove = async () => {
    setRemoveUserDialog(false)
    setResultPopUp(true)
    setResultLoading(true)
    try {
      await removeUserF({
        variables: {
          uid: uid
        }
      })
      setResultValue('User removed successfully')
      setRemoved(true)
    } catch (err) {
      setResultValue('Something went wrong')
    }
    setResultLoading(false)
  }
  const invite = async () => {
    setInviteDialog(false)
    setResultPopUp(true)
    setResultLoading(true)
    try {
      await inviteUserToGroup({
        variables: {
          uid: uid,
          groupId: selectedGroup,
          permissions: {
            addUser: (permission.includes('AddUser')),
            removeUser: (permission.includes('RemoveUser'))
          }
        }
      });
      setResultValue('User joined successfully');
      let users: number = Number(sessionStorage.getItem(`group-${selectedGroup}`))
      
      sessionStorage.setItem(`group-${selectedGroup}`, (users + 1).toString())
    } catch(err) {
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
          padding: 2
        }} key={k} >
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }} >
            <Avatar {...stringAvatar(`${firstName} ${lastName}`)} />
          </Box>
          <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', marginLeft: 2 }} >
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '55%',
              justifyContent: "space-around",
            }} >
              <Typography fontSize={20} >{firstName} {lastName}</Typography>
              <Typography sx={{ opacity: 0.5 }} >{phone}</Typography>
              <Typography fontWeight={'bold'} >{role}</Typography>
            </Box>
          </Box>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }} >
            <Box id="test" sx={{ cursor: "pointer" }}>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreIcon />
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
                <MenuItem onClick={inviteGroup}>Invite group</MenuItem>
                <MenuItem onClick={removeUser}>Remove user</MenuItem>
              </Menu>
            </Box>
          </Box>
          <PopUp popup={removeUserDialog} setPopup={setRemoveUserDialog} acceptFunction={remove} >
            <Typography>Are you sure to remove this user ?</Typography>
          </PopUp>
          <PopUp acceptValue={'Invite'} popup={inviteDialog} setPopup={setInviteDialog} acceptFunction={invite} >
            <Box sx={{ height: 150, width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} >
              <Typography>Groups: </Typography>
              <FormControl fullWidth>
                <InputLabel id="group">Groups</InputLabel>
                <Select
                  sx={{ width: 200 }}
                  labelId="group"
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                >
                  {
                    data?.getGroups.map(({ name, _id }: any) =>
                      <MenuItem value={_id}>{name}</MenuItem>
                    )
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
                  input={<OutlinedInput label="Tag" />}
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
      }
    </>
  )
}