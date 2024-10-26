var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload=require('./multer');

/* GET users listing. */
router.post('/submit_userdata', function (req, res, next) {
  //req.file.filename
  console.log("hhhhhhhhhhhhhhhhhhh:",req.file)
  try {
      pool.query("insert into user(username, emailid, password, address) values(?,?,?,?)", [req.body.username,req.body.emaildid,req.body.password,req.body.address], function (error, result) {
          if (error) {
              console.log(error)
              res.status(200).json({ status: false, message: 'Database Error , Pls contact database Admin' })
          }
          else {
              res.status(200).json({ status: true, message: 'User Data submitted successfully',data:result})
          }
      })
  } catch (e) {
      res.status(200).json({ status: false, message: 'Server Error...' })
  }
})

router.post('/check_user_login', function (req, res, next) {
  //req.file.filename
  console.log("hhhhhhhhhhhhhhhhhhh:",req.file)
  try {
      pool.query("select * from user where emailid =? and password = ?", [req.body.emaildid,req.body.password], function (error, result) {
          if (error) {
              console.log(error)
              res.status(200).json({ status: false, message: 'Database Error , Pls contact database Admin' })
          }
          else {
              res.status(200).json({ status: true, message: 'User Data submitted successfully',data:result})
          }
      })
  } catch (e) {
      res.status(200).json({ status: false, message: 'Server Error...' })
  }
})

router.post('/order_submit', function (req, res, next) {
    //req.file.filename
    // console.log("hhhhhhhhhhhhhhhhhhh:",req.file)
    try {
        pool.query("insert into orderuser(username, orderdetails) values(?,?)", [req.body.username,req.body.orderdetails], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Database Error , Pls contact database Admin' })
            }
            else {
                res.status(200).json({ status: true, message: 'User Data submitted successfully',data:result})
            }
        })
    } catch (e) {
        res.status(200).json({ status: false, message: 'Server Error...' })
    }
  })

module.exports = router;
