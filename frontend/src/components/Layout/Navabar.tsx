import { useState, useEffect } from "react";
import LoginModal from "../Modals/LoginModal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user-info");
        if (user) {
            setUserInfo(JSON.parse(user));
        }
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user-info");
        setUserInfo(null);
        navigate("/");
    };

    return (
        <div>
            <nav className="flex items-center py-[18px] text-[#000000] bg-[#ffffff] text-[16px] font-primary">
                <Link to="/" className="ml-[32px]">expense.io</Link>
                <div className="flex flex-grow justify-end items-center mr-[34px]">
                    {userInfo ? (
                        <div className="relative flex items-center">
                            <div className="mr-[40px]">
                                <Link
                                    to="/dashboard"
                                    className="ml-[39px] hover:text-primary transition-all"
                                >
                                    Dashboard
                                </Link>
                            </div>
                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => setIsDropdownOpen((prev) => !prev)}
                            >
                                <span className="mr-[10px] capitalize">{userInfo.name}</span>
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-11 mt-2 bg-white border rounded shadow-lg">
                                    <button
                                        onClick={handleLogout}
                                        className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={handleOpenModal}
                            className="bg-primary text-[#ffffff] px-4 py-2 rounded-[36px] w-[90px] h-[33.1px] ml-[39px] flex items-center justify-center"
                        >
                            Log In
                        </button>
                    )}
                </div>
            </nav>

            <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default Navbar;
