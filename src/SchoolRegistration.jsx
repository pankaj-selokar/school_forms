
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
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu'; 
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Registration(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [editableSchool, setEditableSchool] = useState(null);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const navigate = useNavigate();
  const navigateTo =()=> {
    navigate('/register');
  }
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://api.vidyamate.in/MachineTest/get_school_designation_list/`);
        setSchoolList(res.data.school_list);   
        console.log(res.data.school_list);
      } catch (error) {
        console.error('Error fetching school data:', error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    const schoolData = schoolList.find(school => school.id === id);
    setEditableSchool(schoolData);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    console.log('Delete', id);
    setDeleteConfirmationModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const confirmDelete = async () => {
    try {
      // await axios.delete(`http://localhost:`);      
      setDeleteConfirmationModal(false);

    } catch (error) {
      console.error('Error deleting astrologer:', error);
    }
  };
  const cancelDelete = () => {
    setDeleteConfirmationModal(false);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: 'Dashboard', icon: <SpeedIcon /> },
          { text: 'Masters', icon: <GroupsIcon /> },
          { text: 'Organization', icon: <GroupsIcon /> },
          { text: 'Academic Session', icon: <EventAvailableIcon /> },
          { text: 'School Registration', icon: <SchoolIcon /> },
          { text: 'Users', icon: <GroupsIcon /> }
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            School Registration
          </Typography>
          <div>
            <IconButton style={{fontSize:'10px'}} color="inherit" aria-label="School List">
              School List
            </IconButton>
            <IconButton onClick={navigateTo} style={{fontSize:'10px'}} color="inherit" aria-label="Add School">
              Add School
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">UDISE No</TableCell>
                <TableCell align="left">Contact Person</TableCell>
                <TableCell align="left">Contact Number</TableCell>
                <TableCell align="left">Contact Email</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">City</TableCell>
                <TableCell align="left">State</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schoolList.map((schooldata, index) => (
                <TableRow key={schooldata.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{schooldata.name}</TableCell>
                  <TableCell>{schooldata.udise_no}</TableCell>
                  <TableCell>{schooldata.contact_person}</TableCell>
                  <TableCell>{schooldata.contact_number}</TableCell>
                  <TableCell>{schooldata.contact_email}</TableCell>
                  <TableCell>{schooldata.address}</TableCell>
                  <TableCell>{schooldata.city}</TableCell>
                  <TableCell>{schooldata.state}</TableCell>
                  <TableCell>{schooldata.status}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(schooldata.id)}>Edit</Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(schooldata.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openModal} onClose={handleCloseModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <DialogTitle id="modal-modal-title">Edit School</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={editableSchool ? editableSchool.name : ''}
            onChange={(e) => setEditableSchool({...editableSchool, name: e.target.value})}
            fullWidth
            margin="dense"
          />
          <TextField
            label="UDISE No"
            name="udise_no"
            value={editableSchool ? editableSchool.udise_no : ''}
            onChange={(e) => setEditableSchool({...editableSchool, udise_no: e.target.value})}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Contact Person"
            name="contact_person"
            value={editableSchool ? editableSchool.contact_person : ''}
            onChange={(e) => setEditableSchool({...editableSchool, contact_person: e.target.value})}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Contact Number"
            name="contact_number"
            value={editableSchool ? editableSchool.contact_number : ''}
            onChange={(e) => setEditableSchool({...editableSchool, contact_number: e.target.value})}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Contact Email"
            name="contact_email"
            value={editableSchool ? editableSchool.contact_email : ''}
            onChange={(e) => setEditableSchool({...editableSchool, contact_email: e.target.value})}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Address"
            name="address"
            value={editableSchool ? editableSchool.address : ''}
            onChange={(e) => setEditableSchool({...editableSchool, address: e.target.value})}
            fullWidth
            margin="dense"
          />
          <TextField
            label="City"
            name="city"
            value={editableSchool ? editableSchool.city : ''}
            onChange={(e) => setEditableSchool({...editableSchool, city: e.target.value})}
            fullWidth
            margin="dense"
          />
          <TextField
            label="State"
            name="state"
            value={editableSchool ? editableSchool.state : ''}
            onChange={(e) => setEditableSchool({...editableSchool, state: e.target.value})}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Status"
            name="status"
            value={editableSchool ? editableSchool.status : ''}
            onChange={(e) => setEditableSchool({...editableSchool, status: e.target.value})}
            fullWidth
            margin="dense"
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" >
              Save Changes
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteConfirmationModal}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure to delete this record?"}</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button variant="contained" color="primary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      </Box>
    </Box>

    
  );
}


