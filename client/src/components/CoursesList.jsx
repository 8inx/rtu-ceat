import styles from "./CoursesList.module.scss" 
import icon from "../images/dp_icon.png";
import {courses as data} from "../data"
import { Link, useNavigate } from "react-router-dom"
import { ChevronRight } from "@mui/icons-material";

const CoursesList = () => {
    const navigate = useNavigate()
    const courses = data.map((item) =>(
        <div key={item.id} className="col-4 col-md-6 col-sm-12">
            <button
                onClick={()=>navigate(`file/${item.id}`,{replace:true})}
                className={styles.CardBtn}
                disabled={item.disabled}
            >
                <img src={icon} className={styles.BtnIcon} alt="" />
                <span className={styles.BtnText}>{item.name}</span>
                <span className={styles.BtnIconRight}><ChevronRight/></span>
            </button>
        </div>
    ))
    
    return (
        <section className={styles.Container}>
            <article className="row gap-2">
                {courses}
            </article>
        </section>
    )
}

export default CoursesList;