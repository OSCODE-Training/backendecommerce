var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload=require('./multer');

router.get('/fetch_product', function (req, res, next) {
    
    try {
        pool.query("select c.*,p.* from products p , category c where c.categoryid = p.categoryid", function (error, result) {
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


router.post('/submit_product',upload.single("picture"), function (req, res, next) {
    //req.file.filename
    console.log("hhhhhhhhhhhhhhhhhhh:",req.body)
    try {
        pool.query("insert into products(categoryid,productname, picture) values(?,?,?)", [req.body.categoryid,req.body.productname,req.file.filename], function (error, result) {
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

router.post('/fetch_product_by_categoryid',upload.any(), function (req, res, next) {
    //req.file.filename
    console.log("hhhhhhhhhhhhhhhhhhh:",req.body)
    try {
        pool.query("select * from products where categoryid =?",[req.body.categoryid], function (error, result) {
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

router.post('/submit_productdetails',upload.any(), function (req, res, next) {
    //req.file.filename
    console.log("hhhhhhhhhhhhhhhhhhh:",req.body)
    try {
        pool.query("insert into productdetailsid(categoryid, productid, color, modelno, price, offerprice, stock, rating) values(?,?,?,?,?,?,?,?)", [req.body.categoryid,req.body.productid,req.body.color,req.body.modelno,req.body.price,req.body.offerprice,req.body.stock,req.body.rating], function (error, result) {
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

router.get('/fetch_categoryandproductdetails', function (req, res, next) {
    
    try {
        pool.query("select * from category c, products p , productdetailsid pd  where c.categoryid=pd.categoryid and pd.categoryid = p.categoryid", function (error, result) {
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

router.post('/check_admin',upload.any(), function (req, res, next) {
    //req.file.filename
    console.log("hhhhhhhhhhhhhhhhhhh:",req.body)
    try {
        pool.query("select * from admins where emailid =? and password = ?",[req.body.emailid,req.body.password], function (error, result) {
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

router.post('/delete_product', function (req, res, next) {
    
    try {
        pool.query("delete from products where productid=?",[req.body.productid], function (error, result) {
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

router.post('/fetch_product_by_id',upload.any(), function (req, res, next) {
    //req.file.filename
    console.log("hhhhhhhhhhhhhhhhhhh:",req.body)
    try {
        pool.query("SELECT c.categoryname ,p.productname,pd.* from category c , products p , productdetailsid pd where p.productid =pd.productid  and p.productid= ?",[req.body.productid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Database Error , Pls contact database Admin' })
            }
            else {
                console.log('ppppppppppppppdddddddddddddddaaaaaaaaaaaaaaaaa:',result)
                res.status(200).json({ status: true, message: 'User Data submitted successfully',data:result})
            }
        })
    } catch (e) {
        res.status(200).json({ status: false, message: 'Server Error...' })
    }
})



router.post('/fetch_product_by_categoryid', function (req, res, next) {
    //req.file.filename
    console.log("hhhhhhhhhhhhhhhhhhh:",req.body)
    try {
        pool.query("select p.*,pd.price as price,pd.offerprice,pd.rating,pd.color from products p ,productdetailsid pd where pd.categoryid = p.categoryid and p.categoryid = ?",[req.body.categoryid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Database Error , Pls contact database Admin' })
            }
            else {
                console.log('ppppppppppppppdddddddddddddddaaaaaaaaaaaaaaaaa:',result)
                res.status(200).json({ status: true, message: 'User Data submitted successfully',data:result})
            }
        })
    } catch (e) {
        res.status(200).json({ status: false, message: 'Server Error...' })
    }
})
module.exports = router;