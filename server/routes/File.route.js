const router = require('express').Router()
const checkCourseId = require('./checkCourseId');
const googleService = require('./googleService')


/* get file info*/
router.get("/info/:id", googleService, async (req, res)=>{
    try {
        const fileId = req.params.id;
        const results = await req.drive.files.get({
            fileId: fileId,
            fields: 'id, name, parents, mimeType, size, fullFileExtension, hasThumbnail, thumbnailLink, webContentLink, webViewLink, imageMediaMetadata, videoMediaMetadata'
        })
        res.status(200).json(results.data)
    } catch (err) {
        res.status(500).json(err)
    }
})

/* get file content */
router.get("/content/:id", googleService, checkCourseId, async (req, res)=>{
    try {
        const fileId = req.params.id;
        const results = await req.drive.files.list({
            q: `'${fileId}' in parents`,
            fields: 'nextPageToken, files(id, name, mimeType, size, fullFileExtension, hasThumbnail, thumbnailLink)',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        })

        let folders = results.data.files.filter(
            (folder)=> folder.mimeType === "application/vnd.google-apps.folder"
        )
        let files = results.data.files.filter(
            (folder)=> folder.mimeType !== "application/vnd.google-apps.folder"
        )
        

        if(req.common) {
            folders = [...folders, ...req.common.folders]
            files = [...files, ...req.common.files]
        }

        res.status(200).json({folders, files})

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;