import LightModeIcon from '@mui/icons-material/LightMode';
import ModeIcon from '@mui/icons-material/Mode';
import ShareIcon from '@mui/icons-material/Share';

const Header = () => {
    return (
        <div className="flex row justify-end w-full space-x-2">
            <ShareIcon/>
            <LightModeIcon/>
            <ModeIcon/>
        </div>
    );
};

export default Header;