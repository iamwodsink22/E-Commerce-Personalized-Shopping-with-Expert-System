import { InputBase, InputBaseProps, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { FC, useEffect } from "react";
import axios from "axios";



// styled component
const StyledInputBase = styled(InputBase)(({ theme }:any) => ({
  height: 45,
  fontSize: 13,
  width: "100%",
  
  fontWeight: 500,
  padding: "0 1rem",
  borderRadius: "5px 0px 0px 5px",
  border: "1px solid #F8F8F8",
  borderColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[300]
      : theme.palette.divider,

  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down(500)]: { maxWidth: "100%" },
}));

const SearchInput: FC<InputBaseProps> = (props) => {
  useEffect(() => {
    const fetchData = async() =>{
      const data = await axios.get("https://fakestoreapi.com/products")
      console.log(data)
    }
    fetchData()
  },[])
  return (
    <StyledInputBase
      {...props}
      startAdornment={
        <SearchIcon
          sx={{
            fontSize: 16,
            marginRight: 1,
            color: "text.disabled",
          }}
        />
      }
    />
  );
};

export default SearchInput;
