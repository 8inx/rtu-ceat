import Breadcrumbs from "../components/Breadcrumbs";
import CoursesList from "../components/CoursesList";
import Navbar from "../components/Navbar";

const Courses = () => {
    return (
        <>
            <Navbar/>
            <Breadcrumbs name="COURSES"/>
            <div className="page-wrapper">
                <CoursesList/>
            </div>
        </>
    )
}

export default Courses;