import {styled,Box} from "@mui/material";

const Container = styled(Box)(()=>({ height: '30px',
    backgroundColor: 'teal',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '500',})
)

const Announcement = () => {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
};

export default Announcement;