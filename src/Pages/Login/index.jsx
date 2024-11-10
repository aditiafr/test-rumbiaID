import React, { useState } from 'react'
import { dataProduct, dataUserLogin } from '../../DataJson';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        try {
            setLoading(true);
            const user = dataUserLogin.find(
                (item) =>
                    item.email === formData.email &&
                    item.password === formData.password
            );

            if (user) {
                localStorage.setItem('AuthUser', JSON.stringify(user));
                localStorage.setItem('DataProduct', JSON.stringify(dataProduct));
                navigate("/dashboard/product");
            } else {
                setShowMsg(true);
                setMsg("Email dan Password tidak Sesuai!");
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-8 rounded-md w-96">
                <div className="flex flex-col gap-2">
                    <h3 className="text-4xl font-bold">Login</h3>
                    <p className="text-lg">Welcome Back</p>
                </div>

                {/* ALERTS */}
                {showMsg && (
                    <div className="bg-red-500 bg-opacity-80 p-2 rounded-md text-white my-2">
                        {msg}
                    </div>
                )}

                <div className="mt-4">
                    {/* <form class="space-y-6"> */}
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div class="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-2"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                        <div class="mt-2 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "Password"}
                                autocomplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 px-2"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="text-gray-500 hover:text-gray-700 absolute right-2 top-1.5"
                            >
                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button onClick={handleLogin} type="submit" class={`flex w-full justify-center ${loading ? 'bg-blue-400' : 'bg-blue-600'} text-white py-2 font-semibold rounded-md hover:bg-blue-500`}>
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}

export default Login