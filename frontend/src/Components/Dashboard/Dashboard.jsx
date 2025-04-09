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
import { useNavigate } from 'react-router-dom';

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

    const user = JSON.parse(localStorage.getItem('user'));

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

    const navigate = useNavigate();

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        const fromCity = searchForm.fromCity.trim();
        const toCity = searchForm.toCity.trim();

        if (!fromCity || !toCity) {
            alert('Please fill in both From and To fields');
            return;
        }

        try {
            const queryParams = new URLSearchParams();
            queryParams.append('fromCity', fromCity);
            queryParams.append('toCity', toCity);

            if (searchForm.departureDate) queryParams.append('departureDate', searchForm.departureDate);
            if (searchForm.starttime) queryParams.append('starttime', searchForm.starttime);
            
            if (searchForm.passengers) queryParams.append('passengers', searchForm.passengers);
            if (searchForm.class) queryParams.append('class', searchForm.class);

            const res = await fetch(`http://localhost:5000/flights?${queryParams.toString()}`);
            const data = await res.json();

            if (data.flights?.length > 0) {
                // Redirect to results page and pass data via state
                navigate('/results', { state: { flights: data.flights } });
            } else {
                alert('No flights found matching your criteria.');
            }
        } catch (err) {
            console.error('Error fetching flights:', err);
            alert('Error occurred while searching for flights.');
        }
    };
 
    
    const drawer = (
        <div>
            <Box className="user-profile">
                <Avatar className="avatar">
                    {user?.username?.[0]?.toUpperCase() || 'U'}
                </Avatar>
                <Box>
                    <Typography variant="h6">{user?.username || 'User'}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user?.email || 'user@example.com'}
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
                                <Typography><strong>Username:</strong> {user?.username}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography><strong>Email:</strong> {user?.email}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
                {activeSection === 'search' && (
                    <Paper className="content-section">
                        <Typography variant="h5">Search Flights</Typography>
                        <Box component="form" onSubmit={handleSearchSubmit} className="search-form">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="From" name="fromCity" value={searchForm.fromCity} onChange={handleSearchChange} fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="To" name="toCity" value={searchForm.toCity} onChange={handleSearchChange} fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Departure Date" name="departureDate" type="date" value={searchForm.departureDate} onChange={handleSearchChange} fullWidth InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Start Time" name="starttime" type="time" value={searchForm.starttime} onChange={handleSearchChange} fullWidth InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={6} sm={3}>
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
                                <Grid item xs={6} sm={3}>
                                    <FormControl fullWidth>
                                        <InputLabel>Class</InputLabel>
                                        <Select name="class" value={searchForm.class} onChange={handleSearchChange} label="Class">
                                        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                   <MenuItem value="economy">Economy</MenuItem>
                                            <MenuItem value="business">Business</MenuItem>
                                            <MenuItem value="first">First Class</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
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
