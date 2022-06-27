const {google} = require('googleapis');
require('dotenv').config()

const googleService = ((req, res, next)=>{

    const scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file']
    const auth = new google.auth.JWT(
        process.env.CLIENT_EMAIL,
        null,
        process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes,
    )
    
    req.drive = google.drive({version: 'v3',auth})
    next();
})

module.exports = googleService;