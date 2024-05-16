import React from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ManageAccountsIcon from '@mui/icons-material/ManageAccountsIcon';
const Header = () => {
  return (
    <Header style={{
        padding: 0,
        background: "#4b7d83",
      }}> 
      <div style={{
     display:"flex",
        color:"white",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"end",

      }}>
     
      <ManageAccountsIcon /><p >Hesenova aysel</p> <NotificationsNoneIcon />
      </div>
 </Header>)
}

export default Header