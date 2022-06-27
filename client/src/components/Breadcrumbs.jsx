import { Link } from "react-router-dom";
import rtuBackground from "../images/rtu-bg.png";
import styles from "./Breadcrumbs.module.scss";

const Breadcrumbs = ({name}) => {
    return (
        <section className={styles.Container}>
            <article className={styles.Content}>
                <h1 className={styles.Title}>{name.toUpperCase()}</h1>
                <p className={styles.Body}>
                    <Link to="/" className={styles.Link}>HOME</Link> | {name.toUpperCase()}
                </p>
            </article>
            <article className={`${styles.Media} filtered tinted`}>
                <img src={rtuBackground} className={styles.Image} alt="rtu background" />
            </article>
        </section>
    )
}

export default Breadcrumbs;