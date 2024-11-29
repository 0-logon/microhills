import styles from '../../styles/login/Login.module.css';
import Welcome from '../shared/Welcome';
import Logo from '../../assets/logos/logo_2.png';
import { useState } from 'react';
import { emailRegex, passwordRegex } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import Loader from '../shared/Loader';

interface LoginForm {
    email: string;
    password: string;
}

interface LoginErrors {
    email: string | null;
    password: string | null;
}

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginForm>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<LoginErrors>({
        email: null,
        password: null
    });

    const [loader, setLoader] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({ email: null, password: null });

        if (!emailRegex.test(formData.email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Please enter a valid email address.'
            }));
            return;
        }

        // if (!passwordRegex.test(formData.password)) {
        //     setErrors((prevErrors) => ({
        //         ...prevErrors,
        //         password: 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number.'
        //     }));
        //     return;
        // }

        const payload = {
            email: formData.email,
            password: formData.password
        };

        try {
            setLoader(true);
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, token: data.token }));

                dispatch(login(data.token));
                navigate('/');
                console.log('Login successful:', data);
            } else {
                const errorData = await response.json();
                console.error('Login failed: ', errorData);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: errorData.message || 'Invalid login credentials.',
                }));
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'An unexpected error occurred. Please try again later.',
            }));
        }
        setLoader(false);
        console.log(formData);
    }
    return (
        <div className={styles.layout}>
            <Welcome />
            <div className={styles.main}>
                <div className={styles.main_header}>
                    <p>Don't have account?</p>
                    <a href="/register">Create new</a>
                </div>
                <div className={styles.main_body}>
                    <div className={styles.form_area}>
                        <a href='/'><img src={Logo} alt="Microhills" /></a>
                        <h1>Sing in to Microhills</h1>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name='email'
                                placeholder='Enter your email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder='Enter your password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.email && <p>{errors.email}</p>}
                            {errors.password && <p>{errors.password}</p>}
                            {
                                loader ? <Loader /> : <button type='submit'>Login</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;