const router = require('express').Router()
const request = require('request');
const googleService = require('./googleService')


/* get thumbnail */
router.get("/thumbnail/*", googleService, async(req, res)=>{
    const baseUrl = req.params[0]
    const q = req.query;
    const query = Object.keys(q).map((e) => `${[e]}=${q[e]}`).join('&');

    let url = `${baseUrl}?${query}`;

    if(url.includes('docs.google')){
        url= `${url}?${query}&access_token=${req.access_token.token}`
    }

    try {
        request({
            url: url,
            encoding: null
        },(err, resp, buffer)=>{
            if (!err && resp.statusCode === 200){
                res.set("Content-Type", "image/jpeg");
                res.send(resp.body);
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;