import { useState, useRef, JSX } from 'react';
import { registerUser, loginUser } from '../../../api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function LoginModal({ isOpen, onClose }: ContactModalProps): JSX.Element | null {
    const [isRegistering, setIsRegistering] = useState(false);
    const form = useRef<HTMLFormElement | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate  = useNavigate();

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login with', { email, password });
        try {
            const userDat = { email, password };
            const response = await loginUser(userDat);
            console.log(response);
            localStorage.setItem("user-info", JSON.stringify({ name: `${response.user.firstName} ${response.user.lastName}`, token: response.token }));
            toast.success('Login successful!');
            navigate('/dashboard');
            onClose();
        } catch (error) {
            console.error('Error logging in user:', error);
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Register with', { firstName, lastName, email, password });
        try {
            const userData = { firstName, lastName, email, password };
            const response = await registerUser(userData);
            console.log(response);
            toast.success('Registration successful! Login with your credentials');
            onClose();
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div>
            <ToastContainer />
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full relative border border-gray-300">
                    <h2 className="text-xl font-bold mb-4">{isRegistering ? 'Register' : 'Log In'}</h2>
                    <p className="mb-4">{isRegistering ? 'Create an account' : 'Please log in to continue'}</p>

                    <form ref={form} onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
                        {isRegistering ? (
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                        placeholder="Your first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                        placeholder="Your last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                        placeholder="Your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="user_email"
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                        placeholder="Your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="user_password"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                        placeholder="Your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="user_email"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                        placeholder="Your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="user_password"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:text-primary"
                                value="Send"
                            >
                                {isRegistering ? 'Register' : 'Log In'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-4 text-center text-sm">
                        {isRegistering ? (
                            <>
                                Already have an account?{' '}
                                <span
                                    className="text-primary cursor-pointer"
                                    onClick={() => setIsRegistering(false)}
                                >
                                    Log In
                                </span>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <span
                                    className="text-primary cursor-pointer"
                                    onClick={() => setIsRegistering(true)}
                                >
                                    Register
                                </span>
                            </>
                        )}
                    </p>

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    >
                        &times;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
