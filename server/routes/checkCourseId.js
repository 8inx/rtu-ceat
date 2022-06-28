
const rootFolderId = "1rP8_V6F1HTS_BFiriGh-CuzwEnTTXfeu"
const courseFolderIdList = [
    "1kthehpwppEaijzJ_PEc5xKmNRUX_S7yF", // Industrial Engineering
    "1o6CR--Ohs23pGOe8xspO5aNb4xIn3ZIe", // Electrical Engineering
    "1bsJ0eyJEcfcLVKIugr_v-zUxoObZYNZx" // Civil Engineering
]


const isCommonFolder = (fileId) => {
    return !courseFolderIdList.includes(fileId)
}

const checkCourseId = (async (req, res, next)=>{
    if(courseFolderIdList.includes(req.params.id)) {

        const data = await req.drive.files.list({
            q: `'${rootFolderId}' in parents`,
            fields: 'nextPageToken, files(id, name, mimeType, size, fullFileExtension, hasThumbnail, thumbnailLink, iconLink)',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        })

        const common = data.data.files.filter((file)=>isCommonFolder(file.id))
    
        const folders = common.filter(
            (folder)=> folder.mimeType === "application/vnd.google-apps.folder"
        )
        const files = common.filter(
            (folder)=> folder.mimeType !== "application/vnd.google-apps.folder"
        )

        req.common = {folders, files}
        return next()
    }
    
    return next();
})

module.exports = checkCourseId;