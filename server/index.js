const express = require('express');
const db = require('./db')
const cors = require('cors')
const fs = require('fs');
const cron = require('node-cron');
const { default: axios } = require('axios');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

app.post('/register', (req, res) => {
    const phone = req.body.phone;
    const farmer = req.body.farmer === true ? 1 : 0;
    db.query("INSERT INTO user VALUES (?,?)", [phone, farmer], (err, result) => {
        if (err) {
            console.log(err);
            console.log(res);
        }
    })
})

/* Definition Table ======================================*/

app.post('/addDefinition', (req, res) => {
    const aggid = req.body.id;
    const def = req.body.def;
    db.query("INSERT INTO definitions (aggid,definition) VALUES (?,?)", [aggid, def], (err, result) => {
        console.log(err);
    })
})

app.post('/getDefinition', (req, res) => {
    const aggid = req.body.id;
    db.query("SELECT * FROM definitions WHERE aggid = ?", [aggid], (err, result) => {
        if (err)
            console.log(err)
        else {
            res.json(result);
        }
    })
})

/* Duration table ================  ===================   =============  ==============*/

app.post('/addDuration', (req, res) => {
    const aggid = req.body.id;
    const def = req.body.def;
    db.query("INSERT INTO durations (aggid,duration) VALUES (?,?)", [aggid, def], (err, result) => {
        console.log(err);
    })
})

app.post('/getDuration', (req, res) => {
    console.log(req.body);
    const aggid = req.body.id;
    db.query("SELECT * FROM durations WHERE aggid = ?", [aggid], (err, result) => {
        if (err)
            console.log(err)
        else {
            res.json(result);
        }
    })
})

/* Description table ================  ===================   =============  ==============*/

app.post('/addDescription', (req, res) => {
    const aggid = req.body.id;
    const def = req.body.def;
    db.query("INSERT INTO descriptions (aggid,description) VALUES (?,?)", [aggid, def], (err, result) => {
        console.log(err);
    })
})

app.post('/getDescription', (req, res) => {
    const aggid = req.body.id;
    db.query("SELECT * FROM descriptions WHERE aggid = ?", [aggid], (err, result) => {
        if (err)
            console.log(err)
        else {
            res.json(result);
        }
    })
})

/* Quality table ================  ===================   =============  ==============*/

app.post('/addQuality', (req, res) => {
    const aggid = req.body.id;
    const def = req.body.def;
    db.query("INSERT INTO qualities (aggid,quality) VALUES (?,?)", [aggid, def], (err, result) => {
        console.log(err);
    })
})

app.post('/getQuality', (req, res) => {
    const aggid = req.body.id;
    db.query("SELECT * FROM qualities WHERE aggid = (?)", aggid, (err, result) => {
        if (err)
            console.log(err)
        else {
            res.json(result);
        }
    })
})

/* Prices table ================  ===================   =============  ==============*/

app.post('/addPrice', (req, res) => {
    const aggid = req.body.id;
    const def = req.body.def;
    db.query("INSERT INTO prices (aggid,price) VALUES (?,?)", [aggid, def], (err, result) => {
        console.log(err);
    })
})

app.post('/getPrice', (req, res) => {
    const aggid = req.body.id;
    db.query("SELECT * FROM prices WHERE aggid = (?)", aggid, (err, result) => {
        if (err)
            console.log(err)
        else {
            res.json(result);
        }
    })
})

/* Miscillaneous table ================  ===================   =============  ==============*/

app.post('/addMisc', (req, res) => {
    const aggid = req.body.id;
    const def = req.body.def;
    const phone = req.body.phone;
    db.query("INSERT INTO miscillaneouses (aggid,miscillaneous,phone) VALUES (?,?,?)", [aggid, def, phone], (err, result) => {
        console.log(err);
    })
})

app.post('/getMisc', (req, res) => {
    const farmid = req.body.id;
    db.query("SELECT * FROM miscillaneouses WHERE aggid = ?", [farmid], (err, result) => {
        res.json(result);
    })
})



/* Agreement steps from company side =========  ===========  ==============*/

app.post('/agreement', (req, res) => {
    const title = req.body.title;
    const phone = req.body.phone;
    db.query("SELECT * FROM company WHERE title = ? AND phone = ?", [title, phone], (err, result) => {
        res.json(result);
    })
})

app.post('/addAgreement', (req, res) => {
    console.log(req.body);
    const phone = req.body.phone;
    const model = req.body.model;
    const address = req.body.address;
    const name = req.body.name;
    const title = req.body.title;
    db.query("INSERT INTO company ( phone,model,address,name,title)VALUES(?,?,?,?,?)", [phone, model, address, name, title], (err, response) => {
        console.log(err)
        if (err)
            res.json({ status: false });
        else {
            res.json({ status: true });
        }
    })
})

app.post('/allAgreement', (req, res) => {
    console.log(req.body);
    const model = req.body.model;
    const phone = req.body.phone;
    db.query("SELECT * FROM company WHERE model = ? AND phone = ?", [model, phone], (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    })
})
/* ==================== Agreement Information By both users ====================== */

app.post('/agreementId', (req, res) => {
    const aggid = req.body.id;
    db.query("SELECT * FROM company WHERE aggid = ? ", [aggid], (err, result) => {
        res.json(result);
    })
})

app.post('/updateCompanyStatus', (req, res) => {
    db.query("UPDATE company SET status = ?,farmid = ? WHERE aggid=?", [req.body.d, Number(req.body.id), req.body.aggid], (err, results) => {
        if (err)
            console.log(err)
    })
})



app.post('/updateFarmerStatus', (req, res) => {
    db.query("UPDATE farmer SET status = ? WHERE farmId = ?", [req.body.d, req.body.id], (err, result) => {
        if (err)
            console.log(err);
    })
})

app.post('/getFarmer', (req, res) => {
    const phone = req.body.phone;
    const aggid = req.body.id;
    db.query("SELECT * FROM farmer WHERE aggid = ? AND phone = ? ", [aggid, phone], (err, result) => {
        res.json(result);
    })
})

app.post('/getFarmerById', (req, res) => {
    db.query("SELECT * FROM farmer WHERE farmId=?", [req.body.id], (err, result) => {
        res.json(result);
    })
})

app.post('/getAgreementByNumber', (req, res) => {
    db.query("SELECT * FROM company WHERE phone = ?", [req.body.phone], (err, result) => {
        res.json(result);
    })
})

app.post('/getFarmerByAgreementId', (req, res) => {
    db.query("SELECT * FROM farmer WHERE aggid = ?", [req.body.id], (err, result) => {
        res.json(result);
    })
})

/*   =========== Applied agreements by farmer ======================= */

app.post('/getApplied', (req, res) => {
    const phone = req.body.phone;
    db.query("SELECT company.aggid as aggid,company.name as cname,company.title as ctitle,company.address as caddress,company.date as cdate,farmer.date as fdate,farmer.status as status,farmer.publish as fpublish FROM farmer INNER JOIN company ON farmer.aggid=company.aggid WHERE farmer.phone = ?", [phone], (err, result) => {
        res.json(result);
    })
})

/* Name and address Information ========= =========== =============== ============== */

app.post('/getInfo', (req, res) => {
    const aggid = req.body.id;
    db.query("SELECT name as cname,address as cadd  FROM company WHERE aggid = ? ", [aggid], (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    })
})

app.post('/getFarmInfo', (req, res) => {
    const phone = req.body.phone;
    const aggid = req.body.id;
    db.query("SELECT * FROM farmer WHERE aggid = ? AND phone = ? ", [aggid, phone], (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    })
})

/* Farmer Agreement logic ===== ======== ============ ============== ==================== ================ */

app.post('/checkApplied', (req, res) => {
    const phone = req.body.phone;
    const aggid = req.body.id;
    db.query("SELECT * FROM farmer WHERE aggid = ? AND phone = ?", [aggid, phone], (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    })
})

app.post('/publicForm', (req, res) => {
    const date = (new Date()).toISOString();
    db.query("UPDATE farmer SET publish = 1,date=? WHERE aggid = ? AND phone = ?", [date, req.body.id, req.body.phone], (err, result) => {
        if (result.affectedRows === 0)
            res.json({ error: true, text: "First Page is required !!" });
        else {
            res.json({ error: false, text: "Form Submitted " });
        }
    })
})

app.post('/OffersByCategory', (req, res) => {
    const model = req.body.model;
    db.query("SELECT * FROM company WHERE model = ? ", [model], (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    })
})

app.post('/addFarmer', (req, res) => {
    db.query("INSERT INTO farmer (aggid,phone,fname,faddress,fvillage,ftaluka,fdistrict,fstate,survey,area) VALUES (?,?,?,?,?,?,?,?,?,?)", [req.body.id, req.body.phone, req.body.fname, req.body.faddress, req.body.fvillage, req.body.ftaluka, req.body.fdistrict, req.body.fstate, req.body.survey, req.body.area], (err, res) => {
        if (err)
            console.log(err);
    })
})

/*Product Table management ================================== */

app.post('/productAdd', (req, res) => {
    const phone = req.body.phone;
    const quantity = req.body.quantity;
    const description = req.body.description;
    const name = req.body.name;
    const category = req.body.category;
    const expire = req.body.expire;
    const productImg = null;
    const price = req.body.price;
    if (req.body.productImg !== null) {
        req.body.productImg = fs.readFileSync(req.body.productImg)
    }
    db.query("INSERT INTO product (phone,quantity,description,name,category,expire,productImg,price) VALUES (?,?,?,?,?,?,?,?)", [phone, quantity, description, name, category, expire, productImg, price], (err, result) => {
        if (err)
            console.log(err);
        else {
            res.json({ status: 'success', response: 'Product Added' })
        }
    })
})

app.post('/allproducts', (req, res) => {
    console.log(req.body);
    const category = req.body.category;
    const date = (new Date()).toISOString();
    db.query("SELECT * FROM product WHERE category = ? AND quantity<>0 AND expire>?", [category, date], (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    })
})

app.post('/updateProduct', (req, res) => {
    console.log(req.body);
    const quantity = req.body.quantity;
    const productId = req.body.productid;
    db.query("UPDATE product SET quantity = ? WHERE productid = ?", [quantity, productId], (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    })
})

app.post('/productDelete', (req, res) => {
    const productId = req.body.id;
    db.query("DELETE FROM product WHERE productid = ? ", productId, (err, result) => {
        if (err)
            console.log(err);
        else {
            res.json(result)
        }
    })
})

app.post('/productList', (req, res) => {
    const phone = req.body.phone;
    db.query("SELECT * FROM product where phone = ? AND quantity<>0", phone, (err, result) => {
        if (err)
            console.log(err);
        else {
            res.json(result)
        }
    })
})

/* Cart Table ==============================================*/

app.post('/removeCartItems', (req, res) => {
    const productId = req.body.cartid;
    db.query("DELETE FROM cart WHERE cartid = ? ", productId, (err, result) => {
        if (err)
            console.log(err);
        else {
            res.json(result)
        }
    })
})

app.post('/allCartItems', (req, res) => {
    console.log(req.body);
    const phone = req.body.phone;
    db.query("SELECT product.category,product.quantity,product.productid,cart.cartid,product.productImg,product.price,product.expire,product.description,product.name FROM cart inner join product on cart.productid=product.productid WHERE cart.phone = ?", phone, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    })
})

app.post('/addToCart', (req, res) => {
    console.log(req.body);
    const phone = req.body.phone;
    const productId = req.body.productId;
    db.query("INSERT INTO cart ( phone,productid) VALUES (?,?)", [phone, productId], (err, result) => {
        if (err) {
            res.json({ status: false });
        }
        else
            res.json({ status: true });
    })
})

/* Purchase or Ordered Items ================================*/

app.post('/allPurchase', (req, res) => {
    console.log(req.body);
    const phone = req.body.phone;
    db.query("SELECT purchase.address,purchase.state,purchase.city,purchase.pincode,purchase.purchaseDate,product.productImg,purchase.purchaseDate,purchase.quantity,product.price,product.expire,product.description,product.name FROM purchase inner join product on product.productid=purchase.productid WHERE purchase.phone = ?", phone, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json(result);
    })
})

app.post('/addPurchase', (req, res) => {
    console.log(req.body);
    const phone = req.body.phone;
    const quantity = req.body.quantity;
    const productId = req.body.productId;
    const date = (new Date()).toISOString();
    const city = req.body.city;
    const state = req.body.state;
    const pincode = req.body.pincode;
    const address = req.body.address;
    db.query("INSERT INTO purchase ( phone,quantity,productid,purchaseDate,city,state,pincode,address)VALUES(?,?,?,?,?,?,?,?)", [phone, quantity, productId, date, city, state, pincode, address], (err, result) => {
        if (err)
            console.log(err);
        else
            res.json({ status: true });
    })
})

//================================================================================//
              /* Graph Functions */
app.post('/cropInfo',(req,res)=>{
    db.query("SELECT * FROM crops WHERE name = (?)",[req.body.name],(err,result)=>{
        if(err)
            console.log(err)
        else
            res.json(result)
    })
})

app.post('/priceList',(req,res)=>{
    query = "SELECT * FROM "+req.body.name+" ORDER BY year,month";
    //console.log(query)
    db.query(query,(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result)
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on ＄{PORT}`)
})