import Avatar from '@mui/material/Avatar';
import Head from '../../components/Header/Header.tsx';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LanguageIcon from '@mui/icons-material/Language';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Account = () => {
    const navigate = useNavigate();  // Хук для навигации
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem("userData");
        if (savedData) {
            setProfile(JSON.parse(savedData));
        }
    }, []);

    const goToFriend = () => {
        navigate('/friends');
    };
    const goToAddFriend = () => {
        navigate('/add-friends');
    };
    const goToReg = () => {
        navigate('/register');
    };

    return (
        <>
            <Head />
            <div className="flex flex-col items-center mt-4">
                <Avatar
                    alt={profile ? `${profile.name} ${profile.surname}` : "Профиль"}
                    src={profile ? profile.avatarUrl : "./default-avatar.jpg"} // Используем аватар из профиля или стандартный
                    sx={{ width: 150, height: 150 }}
                />
                {profile ? (
                    <>
                        <h3 className="text-xl font-semibold mt-4">
                            {profile.name} {profile.surname}
                        </h3>
                        <p className="text-gray-500">
                            {profile.gender == "male" ? "Мужчина" : "Женщина"}, {- new Date(profile.dateOfBirth).getFullYear() + new Date().getFullYear() + " лет"}
                        </p>
                    </>
                ) : (
                    <p>Нет данных о пользователе</p>
                )}
            </div>
            <div className="flex flex-col items-center mt-6 ml-12">
                <div className="w-full max-w-xs ml-12 space-y-3">
                    <div className="flex space-x-2 cursor-pointer" onClick={goToAddFriend}>
                        <AddCircleOutlineIcon color="primary" />
                        <span className="text-base">Добавить друга</span>
                    </div>
                    <div className="flex space-x-2 cursor-pointer" onClick={goToFriend}>
                        <PermIdentityIcon color="primary" />
                        <span className="text-base">Друзья</span>
                    </div>
                    <div className="flex space-x-2 cursor-pointer">
                        <LanguageIcon color="primary" />
                        <span className="text-base">Язык</span>
                    </div>
                    <div className="flex space-x-2 cursor-pointer">
                        <LocalTaxiIcon color="primary" />
                        <span className="text-base">Прошлые поездки</span>
                    </div>
                    <div className="flex space-x-2 cursor-pointer" onClick={goToReg}>
                        <CancelIcon color="primary" />
                        <span className="text-base">Выход</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Account;
