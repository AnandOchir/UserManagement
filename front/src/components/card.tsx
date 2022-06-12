import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { MoreIcon } from '../icons';
import Menu from '@mui/material/Menu';
import { PopUp } from './popUp';

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


export const CardBox = ({ width, height }: any) => {
  const [removeUserDialog, setRemoveUserDialog] = useState(false);
  const [inviteDialog, setInviteDialog] = useState(false);
  const [menuItem, setMenuItem] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("");
  const open = Boolean(menuItem);

  const handleClick = (event: any) => {
    setMenuItem(event.currentTarget);
  };
  const inviteGroup = () => {
    setMenuItem(null);
    setInviteDialog(true)
  }
  const removeUser = () => {
    setMenuItem(null);
    setRemoveUserDialog(true)
  };
  return (
    <Box sx={{
      width: width,
      height: height,
      boxShadow: '2px 2px 6px 2px #afb5bd',
      display: 'flex',
      padding: 2
    }}>
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }} >
        <Avatar {...stringAvatar('Kent Dodds')} />
      </Box>
      <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', marginLeft: 2 }} >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '55%',
          justifyContent: "space-around",
        }} >
          <Typography fontSize={20} >Kent Dodds</Typography>
          <Typography sx={{ opacity: 0.5 }} >12345678</Typography>
          <Typography fontWeight={'bold'} >CEO</Typography>
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
      <PopUp popup={removeUserDialog} setPopup={setRemoveUserDialog} >
        <Typography>Are you sure to remove this user ?</Typography>
      </PopUp>
      <PopUp acceptValue={'Invite'} popup={inviteDialog} setPopup={setInviteDialog} >
        <Typography>Groups: </Typography>
        <FormControl fullWidth>
          <InputLabel id="group">Groups</InputLabel>
          <Select
            sx={{ width: 200 }}
            labelId="group"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <MenuItem value={'Group 1'}>Group 1</MenuItem>
            <MenuItem value={'Group 2'}>Group 2</MenuItem>
            <MenuItem value={'Group 3'}>Group 3</MenuItem>
          </Select>
        </FormControl>
      </PopUp>
    </Box>
  )
}