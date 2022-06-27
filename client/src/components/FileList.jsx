import { ArrowBack, Folder } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./FileList.module.scss";

const FileList = () => {
    const [current, setCurrent] = useState('')
    const [folders, setFolders] = useState([])
    const [files, setFiles] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const apiCall = async () => {
            const url = `https://rtu-ceat.herokuapp.com/api/file/content/${id}`
            const results = await axios.get(url)
            setCurrent(results.data.current)
            setFolders(results.data.folders)
            setFiles(results.data.files)
        }
        apiCall();
    },[id])

    const folderList = folders.map((folder)=>(
        <article key={folder.id}  className={`col-3 col-lg-4 col-md-6 col-sm-12 ${styles.FolderContainer}`}>
            <button onClick={()=>navigate(`/file/${folder.id}`)}
                className={styles.FolderBtn}
            >
                <span className={styles.FolderIcon}><Folder/></span>
                <Tooltip title={folder.name}>
                    <span className={styles.FolderName}>{folder.name}</span>
                </Tooltip>
            </button>
        </article>
    ))

    const fileList = files.map((file)=>(
        <button key={file.id}>
            {file.name}
        </button>
    ))

    console.log(files)

    return (
        <section>
            <button onClick={()=>navigate(-1)}
                className={styles.BackBtn}
            >
                <span className={styles.BackBtnIcon}><ArrowBack/></span>
                {current && <span className={styles.BackBtnName}>{current.name}</span>}
            </button>
            {
                (folders.length > 0) &&
                <div>
                    <span className={styles.GroupName}>FOLDERS</span>
                    <section className="row gap-2">
                        {folderList}
                    </section>
                </div>
            }
            {
                (files.length > 0) &&
                <div>
                    <span className={styles.GroupName}>FILES</span>
                    <section className="row gap-2">
                        {fileList}
                    </section>
                </div>
            }
        </section>
    )
}

export default FileList;