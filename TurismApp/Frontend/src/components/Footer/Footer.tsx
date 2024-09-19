import * as React from 'react';
import { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Account from '../../pages/Account/account.tsx';
import Routes from '../../pages/Routes/routes.tsx';
import YanMap from '../../pages/map.tsx'
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ flex: 1, display: value === index ? 'block' : 'none' }} // Ensure that only the active tab content is shown and it takes available space.
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(2);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            navigate('/register');
        }
    }, [navigate]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                <CustomTabPanel value={value} index={0}>
                    <YanMap/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Routes />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Account />
                </CustomTabPanel>
            </Box>
            <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{ justifyContent: 'space-between', display: 'flex' }}
                >
                    <Tab label="Карта" {...a11yProps(0)} sx={{ flex: 1, maxWidth: 'none' }} />
                    <Tab label="Маршруты" {...a11yProps(1)} sx={{ flex: 1, maxWidth: 'none' }} />
                    <Tab label="Аккаунт" {...a11yProps(2)} sx={{ flex: 1, maxWidth: 'none' }} />
                </Tabs>
            </Box>
        </Box>
    );
}