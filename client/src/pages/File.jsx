import FileList from "../components/FileList";
import Navbar from "../components/Navbar";

const File = () => {
    return (
        <>
            <Navbar/>
            <div className="page-wrapper">
                <FileList/>
            </div>
        </>
    )
}

export default File;