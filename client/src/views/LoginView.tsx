import Login from '../components/login/Login';
import styles from '../styles/login/Login.module.css';

const LoginView: React.FC = () => {
    return (
        <section className={styles.view}>
            <Login />
        </section>
    )
}

export default LoginView;