import React,{useContext} from 'react'
import {TitleContext} from 'contexts/TitleContext';
import {
    AppBar,
    Box,
    styled,
    Theme,
    Toolbar,
    useMediaQuery,Typography
  } from "@mui/material";
  const DashboardNavbarRoot = styled(AppBar)(() => ({
    zIndex: 11,
    boxShadow: "none",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    backdropFilter: "blur(6px)",
    backgroundColor: "transparent",
  }));

const Navbar = () => {
    const { name } = useContext(TitleContext);
  return (
    <DashboardNavbarRoot>
    <Typography variant='h2'>{name}</Typography>
    </DashboardNavbarRoot>
  )
}

export default Navbar