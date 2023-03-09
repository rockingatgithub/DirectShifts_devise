import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import ReferralForm from './ReferralForm';

const drawerWidth = 240;
const navItems = ['Signup', 'Singin'];
const navLinks = ['/signup', '/']

const linkStyle = {
  color: 'white',
  fontWeight: 600,
  textDecoration: 'none',
}

export default function DrawerAppBar(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [modalOpen, setModalToggle] = React.useState(false)
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleModalToggle = () => {
    setModalToggle((prevState) => !prevState);
  };

  const handleSignOut = () => {
    // delete the cookies, set user email to empty string, and navigate to signin page.

    document.cookie = "_devise_auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    props.setuserEmail('')
    navigate('/')
    
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        DirectShifts
      </Typography>
      <Divider />
      <List>

        {props.userEmail
          ? <>
            <Button variant='contained' type='primary' onClick={handleModalToggle}>Add Referral</Button>
            <Button variant='contained' type='primary' onClick={handleSignOut}>Sign out</Button>
          </>
          : <>
            {navItems.map((item, index) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <Link style={linkStyle} to={navLinks[index]}>
                    {item}
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </>
        }


      </List>
    </Box>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            DirectShifts
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

            {props.userEmail
              ? <>
                <Button variant='contained' type='primary' onClick={handleModalToggle}>Add Referral</Button>
                <Button variant='contained' type='primary' onClick={handleSignOut}>Sign out</Button>
              </>
              : <>
                {navItems.map((item, index) => (
                  <Button variant='contained' type='primary' key={item} sx={{ color: '#fff' }}>
                    <Link style={linkStyle} to={navLinks[index]}>
                      {item}
                    </Link>
                  </Button>
                ))}
              </>
            }



          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
      <ReferralForm userEmail={props.userEmail} modalOpen={modalOpen} handleModalToggle={handleModalToggle} setReferrals={props.setReferrals} />
    </Box>
  );
}
