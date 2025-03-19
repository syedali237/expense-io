import { useState } from 'react';
import logo from '../../assets/expenses.png';
import LoginModal from '../Modals/LoginModal';

function Product() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="bg-secondary w-full h-[410px] mx-auto flex px-[75px] justify-between">

            <div className="flex flex-col mt-[120px]" data-aos="fade-up" data-aos-delay="100">
                <h1 className="text-[48px] font-bold text-black mb-[14px]">
                    Your Expense Tracker
                </h1>
                <p className="text-[18px] text-gray-600 leading-[1.4]">
                    Simplify your expense tracking with powerful and easy-to-use
                    <br />
                    tools designed for your busy life.
                </p>
                <button
                    onClick={handleOpenModal}
                    className="bg-primary text-white rounded-[36px] flex items-center justify-center px-6 py-2 mt-[14px] text-[16px] w-[169px] h-[33.5px]">
                    Get Started
                </button>
            </div>

            <div className="flex items-center mr-[110px]" data-aos="fade-up" data-aos-delay="100">
                <img
                    src={logo}
                    alt="Calendar Illustration"
                    className="w-[372.9px] h-[330px] object-contain"
                />
            </div>

            <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default Product;
