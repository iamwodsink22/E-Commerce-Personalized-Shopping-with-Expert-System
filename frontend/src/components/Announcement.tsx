import {styled,Box} from "@mui/material";




const Container = styled(Box)(()=>({ height: '37px', marginTop:'1vh',
    color: 'white',
    display: 'flex',
    backgroundImage:'url("https://img.freepik.com/premium-vector/happy-new-year-long-banner_73458-2276.jpg?w=2000")',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontFamily:'Poppins',
    fontWeight: '600',})
)

const Announcement = () => {
  return <Container >New Year Deal! Free Shipping on all the Orders Over $50</Container>;
};

export default Announcement;