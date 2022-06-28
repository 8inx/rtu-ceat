import { ArrowBack, Folder } from "@mui/icons-material";
import { CircularProgress, Tooltip } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import docImage from "../images/document.png"
import useFetch from "../hooks/useFetch";
import styles from "./FileList.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const FileList = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const {data, isFetching, error} = useFetch(`file/content/${id}`)
    const folderList = data?.folders.map((folder)=>(
        <article key={folder.id}  className={`col-3 col-lg-3 col-md-6 col-sm-12 ${styles.FolderContainer}`}>
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

    const fileList = data?.files.map((file)=>(
        <article className={`col-3 col-lg-3 col-md-6 col-sm-12 ${styles.FileContainer}`} key={file.id}>
            <Tooltip title={file.name}>
                <div className={styles.File}>
                    <div className={styles.FileMedia}>
                        <LazyLoadImage className={styles.FileThumbnail} 
                            data-thumbnail={file.hasThumbnail}
                            src={ 
                                file.hasThumbnail? 
                                `https://rtu-ceat.herokuapp.com/api/media/thumbnail/${file.thumbnailLink}`: docImage
                            }
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                        />
                    </div>
                    <div className={styles.FileBody}>
                        
                        <img className={styles.FileIcon} 
                            src={file.iconLink} 
                            alt={`icon of ${file.name}`}
                            referrerPolicy="no-referrer"
                        />
                            <span className={styles.FileName}>{file.name}</span>
                    </div>
                </div>
            </Tooltip>
        </article>
    ))

    if(isFetching) return (
        <div style={{display:"flex", width:"100%", height: "80vh"}}>
            <span style={{margin:"auto"}}><CircularProgress color="primary"/></span>
        </div>
    )

    return (
        <section className={styles.Container}>
            <button onClick={()=>navigate(-1)}
                className={styles.BackBtn}
            >
                <span className={styles.BackBtnIcon}><ArrowBack/></span>
                {   
                    data?.current && 
                    <span className={styles.BackBtnName}>
                        {data.current.name}
                    </span>
                }
            </button>
            {
                (data?.folders.length > 0) &&
                <div className="mt-2">
                    <span className={styles.GroupName}>FOLDERS</span>
                    <section className="row gap-2">
                        {folderList}
                    </section>
                </div>
            }
            {
                (data?.files.length > 0) &&
                <div className="mt-4">
                    <span className={styles.GroupName}>FILES</span>
                    <section className="row gap-2">
                        {fileList}
                    </section>
                </div>
            }
            {
                (data?.folders.length === 0) && (data?.files.length === 0) &&
                <section>
                    <p style={{lineHeight:"2.3", textAlign:"center"}}>No Items Found</p>
                </section>
            }
        </section>
    )
}

export default FileList;