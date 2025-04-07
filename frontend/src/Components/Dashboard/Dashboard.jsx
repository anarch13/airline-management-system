// Dashboard.jsx
import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Paper,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Flight as FlightIcon,
    History as HistoryIcon,
    Person as PersonIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import './Dashboard.css';

const drawerWidth = 240;

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('profile');
    const [searchForm, setSearchForm] = useState({
        fromCity: '',
        toCity: '',
        departureDate: '',
        returnDate: '',
        passengers: '1',
        class: 'economy',
    });

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log('Search parameters:', searchForm);
    };

    const drawer = (
        <div>
            <Box className="user-profile">
                <Avatar className="avatar">JD</Avatar>
                <Box>
                    <Typography variant="h6">John Doe</Typography>
                    <Typography variant="body2" color="text.secondary">
                        john.doe@example.com
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <List>
                <ListItem button onClick={() => setActiveSection('profile')} selected={activeSection === 'profile'}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => setActiveSection('search')} selected={activeSection === 'search'}>
                    <ListItemIcon><SearchIcon /></ListItemIcon>
                    <ListItemText primary="Search Flights" />
                </ListItem>
                <ListItem button onClick={() => setActiveSection('flights')} selected={activeSection === 'flights'}>
                    <ListItemIcon><FlightIcon /></ListItemIcon>
                    <ListItemText primary="Booked Flights" />
                </ListItem>
                <ListItem button onClick={() => setActiveSection('bookings')} selected={activeSection === 'bookings'}>
                    <ListItemIcon><HistoryIcon /></ListItemIcon>
                    <ListItemText primary="Previous Bookings" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box className="dashboard">
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" className="main-content">
                {activeSection === 'profile' && (
                    <Paper className="content-section">
                        <Typography variant="h5">Profile Information</Typography>
                        <Grid container className="profile-details">
                            <Grid item>
                                <Typography><strong>Username:</strong> John Doe</Typography>
                            </Grid>
                            <Grid item>
                                <Typography><strong>Email:</strong> john.doe@example.com</Typography>
                            </Grid>
                            <Grid item>
                                <Typography><strong>Member Since:</strong> January 2024</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
                {activeSection === 'search' && (
                    <Paper className="content-section">
                        <Typography variant="h5">Search Flights</Typography>
                        <Box component="form" onSubmit={handleSearchSubmit} className="search-form">
                            <Grid container>
                                <Grid item>
                                    <TextField label="From" name="fromCity" value={searchForm.fromCity} onChange={handleSearchChange} fullWidth />
                                </Grid>
                                <Grid item>
                                    <TextField label="To" name="toCity" value={searchForm.toCity} onChange={handleSearchChange} fullWidth />
                                </Grid>
                                <Grid item>
                                    <TextField label="Departure Date" name="departureDate" type="date" value={searchForm.departureDate} onChange={handleSearchChange} fullWidth InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item>
                                    <TextField label="Return Date" name="returnDate" type="date" value={searchForm.returnDate} onChange={handleSearchChange} fullWidth InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item>
                                    <FormControl fullWidth>
                                        <InputLabel>Passengers</InputLabel>
                                        <Select name="passengers" value={searchForm.passengers} onChange={handleSearchChange} label="Passengers">
                                            <MenuItem value="1">1 </MenuItem>
                                            <MenuItem value="2">2</MenuItem>
                                            <MenuItem value="3">3</MenuItem>
                                            <MenuItem value="4">4</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl fullWidth>
                                        <InputLabel>Class</InputLabel>
                                        <Select name="class" value={searchForm.class} onChange={handleSearchChange} label="Class">
                                            <MenuItem value="economy">Economy</MenuItem>
                                            <MenuItem value="business">Business</MenuItem>
                                            <MenuItem value="first">First Class</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item style={{ gridColumn: 'span 3' }}>
                                    <Button type="submit" variant="contained" startIcon={<SearchIcon />} fullWidth>Search Flights</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;