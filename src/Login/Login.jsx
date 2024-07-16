import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Utils/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const {signIn} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        identifier: '',
        pin: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};

        // Validate PIN
        if (!/^\d{5}$/.test(formData.pin)) {
            newErrors.pin = 'PIN must be exactly 5 digits.';
        }

        // Validate identifier (email or mobile number)
        if (!/^01\d{9}$/.test(formData.identifier) && !/\S+@\S+\.\S+/.test(formData.identifier)) {
            newErrors.identifier = 'Please enter a valid mobile number or email.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        console.log(formData.email);
        e.preventDefault();
        if (!validate()) return;

       // console.log(formData);

        const info = {
            email : formData.email,
            pin : formData.pin,
            
        }
        signIn(info.email, info.pin);

        // try {
        //     const response = await axios.post('http://localhost:5000/login', formData);
        //     if (response.data.success) {
        //         Swal.fire('Success', 'Login successful', 'success');
        //         navigate('/dashboard'); // Navigate to dashboard after successful login
        //     } else {
        //         Swal.fire('Error', 'Invalid credentials', 'error');
        //     }
        // } catch (error) {
        //     console.error('There was an error logging in!', error);
        //     Swal.fire('Error', 'Your emai or mobile or pin number is invalid', 'error');
        // }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center">Login Form</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email or Mobile Number</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">PIN</label>
                        <input
                            type="password"
                            name="pin"
                            value={formData.pin}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        {errors.pin && (
                            <p className="mt-1 text-sm text-red-600">{errors.pin}</p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Do not have an account?{' '}
                        <Link to="/reg" className="text-blue-500 hover:underline">
                            Register here
                        </Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
