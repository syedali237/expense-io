import { useState } from "react";
import LoginModal from "../Modals/LoginModal";

function Navbar() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    return (
        <div>
            <nav className="flex items-center py-[18px] text-[#000000] bg-[#ffffff] text-[16px] font-primary">
                <p className="ml-[32px]">expense.io</p>
                <div className="flex flex-grow justify-end items-center mr-[34px]">
                    {/* <button
                        className="ml-[32px] hover:text-primary transition-all"
                    >
                        Contact Us
                    </button> */}
                    <button
                    onClick={handleOpenModal}
                        className="bg-primary text-[#ffffff] px-4 py-2 rounded-[36px] w-[90px] h-[33.1px] ml-[39px] flex items-center justify-center"
                    >
                        Log In
                    </button>
                </div>
            </nav>

            <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default Navbar;
