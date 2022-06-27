import CoursesList from "../components/CoursesList";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

const Home = () => {
    return (
        <>
            <Navbar/>
            <div className="page-wrapper">
                <Slider/>
                <CoursesList/>
            </div>
        </>
    )
}

export default Home;