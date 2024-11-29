import Register from '../components/register/Register';
import styles from '../styles/register/Register.module.css';

const RegisterView: React.FC = () => {
  return (
    <section className={styles.view}>
      <Register />
    </section>
  )
}

export default RegisterView;