import { Box, Button, CssBaseline, Input } from "@mui/material"
import { useEffect, useState } from "react"
import { GroupIcon, HomeIcon, MenuIcon, SearchIcon } from "./icons"
import { useLocation, useNavigate } from "react-router-dom";

export const Layout = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation()
  const [searchValue, setSearchValue] = useState('')
  const goHome = () => {
    navigate("/");
  }

  const goGroup = () => {
    navigate("/groups");
  }

  useEffect(() => {
    if(location.pathname === '/' || location.pathname === '/users') {
      if(searchValue !== '') {
        navigate(`/users?search=${searchValue}`);
      } else {
        navigate(`/`);
      }
    }
    if(location.pathname === '/groups') {
      if(searchValue !== '') {
        navigate(`/groups?search=${searchValue}`);
      } else {
        navigate(`/groups`);
      }
    }
  }, [searchValue])

  return (
    <Box sx={{ margin: 0, width: '100%', height: '100%' }} >
      <CssBaseline />
      <Box sx={{
        width: '100%',
        height: 70,
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0px 2px 3px #afb5bd'
      }} >
        <Box sx={{ width: 70, height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <MenuIcon width={20} height={20} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 2, width: '100%' }} >
          <SearchIcon width={20} height={20} />
          <Input sx={{ width: '90%', marginLeft: 1 }} disableUnderline placeholder={location.pathname === '/' ? 'Search Name, phone or role..' : 'Search Group..'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }} >
        <Box sx={{ 
          width: 70, 
          height: window.innerHeight - 70, 
          boxShadow: '2px 2px 3px #afb5bd', 
        }} >
          <Box sx={{
            height: "50%",
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around'
          }} >
            <Button onClick={goHome} >
              <HomeIcon width={30} height={30} />
            </Button>
            <Button onClick={goGroup} >
              <GroupIcon width={30} height={30} />
            </Button>
          </Box>
        </Box>
        {children}
      </Box>
    </Box>
  )
}