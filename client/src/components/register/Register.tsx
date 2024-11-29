import Welcome from "../shared/Welcome";
import styles from '../../styles/register/Register.module.css';
import Logo from '../../assets/logos/logo_2.png';
import { useState } from "react";
import { emailRegex, passwordRegex } from "../../utils/validation";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
    email: string;
    password: string;
}

interface RegisterErrors {
    email: string | null;
    password: string | null;
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterForm>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<RegisterErrors>({
        email: null,
        password: null
    })

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
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const data = await response.json();

                navigate('/login');
                console.log('User registration successful:', data);
            } else {
                const errorData = await response.json();
                console.error('User registration failed: ', errorData);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: errorData.message || 'Invalid registration credentials.',
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
        <div>
            <div className={styles.layout}>
                <Welcome />
                <div className={styles.main}>
                    <div className={styles.main_header}>
                        <p>Already have account?</p>
                        <a href="/login">Sign in</a>
                    </div>
                    <div className={styles.main_body}>
                        <div className={styles.form_area}>
                            <a href='/'><img src={Logo} alt="Microhills" /></a>
                            <h1>Sing up to Microhills</h1>

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
                                <button type='submit'>Create account</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;