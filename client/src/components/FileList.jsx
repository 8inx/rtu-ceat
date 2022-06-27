import { ArrowBack, Folder } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./FileList.module.scss";

const FileList = () => {

    const [folders, setFolders] = useState([])
    const [files, setFiles] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const apiCall = async () => {
            const url = `https://rtu-ceat.herokuapp.com/api/file/content/${id}`
            const results = await axios.get(url)
            setFolders(results.data.folders)
            setFiles(results.data.files)
        }
        apiCall();
    },[id])

    const folderList = folders.map((folder)=>(
        <article key={folder.id}  className="col-3 col-md-4 col-sm-1">
            <button onClick={()=>navigate(`/file/${folder.id}`)}
                className={styles.FolderBtn}
            >
                <span className={styles.FolderIcon}><Folder/></span>
                <span className={styles.FolderName}>{folder.name}</span>
            </button>
        </article>
    ))

    const fileList = files.map((file)=>(
        <button key={file.id}>
            {file.name}
        </button>
    ))

    return (
        <section>
            <button onClick={()=>navigate(-1)}>
                <ArrowBack/> Back
            </button>
            {
                folders &&
                <div>
                    <span>Folders</span>
                    <section className="row gap-2">
                        {folderList}
                    </section>
                </div>
            }
            {
                files &&
                <div>
                    <span>Files</span>
                    <section className="row gap-2">
                        {fileList}
                    </section>
                </div>
            }
        </section>
    )
}

export default FileList;