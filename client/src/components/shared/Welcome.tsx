import styles from '../../styles/shared/Welcome.module.css';
import Logo from '../../assets/logos/logo.png';

const Welcome: React.FC = () => {
    return (
        <div className={styles.component}>
            <div className={styles.header}>
                <a href="/"><img src={Logo} alt="Microhills" /></a>
            </div>
            <div className={styles.content}>
                <h1>Welcome to Microhills!</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus hic excepturi nihil eos nobis culpa asperiores dicta ducimus magnam inventore.</p>
                <p>Lorem ipsum dolor sit amet.</p>
                <a href="/">Learn more</a>
            </div>
        </div>
    )
}

export default Welcome