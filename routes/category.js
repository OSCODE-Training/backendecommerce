var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload=require('./multer');

router.get('/fetch_category', function (req, res, next) {
    
    try {
        pool.query("select * from category", function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Database Error , Pls contact database Admin' })
            }
            else {
                res.status(200).json({ status: true, message: 'User Data submitted successfully' ,data:result})
            }
        })
    } catch (e) {
        res.status(200).json({ status: false, message: 'Server Error...' })
    }
})


router.post('/submit_category',upload.single("image"), function (req, res, next) {
    //req.file.filename
    console.log("hhhhhhhhhhhhhhhhhhh:",req.file)
    try {
        pool.query("insert into category(categoryname, image) values(?,?)", [req.body.categoryname,req.file.filename], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Database Error , Pls contact database Admin' })
            }
            else {
                res.status(200).json({ status: true, message: 'User Data submitted successfully'})
            }
        })
    } catch (e) {
        res.status(200).json({ status: false, message: 'Server Error...' })
    }
})

module.exports = router;