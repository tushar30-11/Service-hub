const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATIC FOLDER (for images)
app.use("/public", express.static(path.join(__dirname, "Public")));


// ================= DATABASE =================
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_lservice"
});

con.connect((err) => {
  if (err) console.log("DB Error:", err);
  else console.log("MySQL Connected");
});


// ================= FILE UPLOAD =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/idproof/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ==========================================================
// ADMIN - GET ALL SERVICES
// ==========================================================
app.get("/api/admin/getservices", (req, res) => {

  const sql = `
    SELECT 
      s.service_id,
      s.service_name,
      s.service_date,
      p.provider_name
    FROM tbl_service s
    JOIN provider_details p 
      ON s.provider_id = p.provider_id
    ORDER BY s.service_id DESC
  `;

  con.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }

    res.json(result);

  });

});

// ==========================================================
// GET PROVIDERS
// ==========================================================
app.get("/api/getprovider", (req, res) => {

  const sql = "SELECT * FROM provider_details ORDER BY provider_id DESC";

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);
  });
});


// ==========================================================
// REGISTER PROVIDER
// ==========================================================
app.post("/api/provider/register", upload.single("id_proof"), (req, res) => {

  const {
    name,
    phone,
    email,
    password,
    business_name,
    city,
    address,
    description
  } = req.body;

  if (!name || !phone || !email || !password || !business_name || !city || !address || !description)
    return res.status(400).json({ message: "All fields required" });

  const idproof = req.file ? req.file.filename : null;

  if (!idproof)
    return res.status(400).json({ message: "ID Proof required" });

  const sql = `
    INSERT INTO provider_details
    (provider_name, contactno, email, password, business_name, city, address, description, id_proof, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
  `;

  con.query(sql,
    [name, phone, email, password, business_name, city, address, description, idproof],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Insert error" });
      }

      res.json({
                  success: true,
                  message: "Registration Successful",
                  provider_id: result.insertId
                });
          });
});


// ==========================================================
// APPROVE PROVIDER
// ==========================================================
app.post("/api/provider/approve/:id", (req, res) => {

  const provider_id = req.params.id;

  if (!provider_id)
    return res.status(400).json({ message: "Missing provider_id" });

  const sql = "UPDATE provider_details SET status = 1 WHERE provider_id = ?";

  con.query(sql, [provider_id], (err, result) => {

    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Provider not found" });

    res.json({ message: "Provider approved successfully" });

  });
});


// ==========================================================
// REJECT PROVIDER
// ==========================================================
app.post("/api/provider/reject/:id", (req, res) => {

  const provider_id = req.params.id;

  if (!provider_id)
    return res.status(400).json({ message: "Missing provider_id" });

  const sql = "UPDATE provider_details SET status = 2 WHERE provider_id = ?";

  con.query(sql, [provider_id], (err, result) => {

    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Provider not found" });

    res.json({ message: "Provider rejected successfully" });

  });
});


// ==========================================================
// ADMIN LOGIN (NEW ADDED)
// ==========================================================
app.post("/api/admin/login", (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "All fields required"
    });
  }

  const sql = "SELECT * FROM tbl_admin WHERE email=? AND password=?";

  con.query(sql, [email, password], (err, result) => {

    if (err) {
      console.log("LOGIN ERROR:", err);
      return res.json({
        success: false,
        message: "Database error"
      });
    }

    if (result.length > 0) {
      return res.json({
        success: true,
        message: "Login successful",
        admin: result[0]
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid email or password"
      });
    }

  });
});

// ==========================================================
// PROVIDER LOGIN
// ==========================================================
app.post("/api/provider/servicelogin", (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "All fields required"
    });
  }

  const sql = "SELECT * FROM provider_details WHERE email=? AND password=?";

  con.query(sql, [email, password], (err, result) => {

    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Database error"
      });
    }

    // EMAIL OR PASSWORD WRONG
    if (result.length === 0) {
      return res.json({
        success: false,
        message: "Invalid Email or Password"
      });
    }

    const provider = result[0];

    // STATUS CHECK
    if (provider.status == 0) {
      return res.json({
        success: false,
        message: "Your account is waiting for admin approval"
      });
    }

    if (provider.status == 2) {
      return res.json({
        success: false,
        message: "Your account has been rejected by admin"
      });
    }

    // APPROVED LOGIN
    if (provider.status == 1) {
      return res.json({
        success: true,
        message: "Login successful",
        provider: provider
      });
    }

  });

});
app.get('/api/getcategory/:provider_id', (req,res) => {

  const provider_id = req.params.provider_id;

  const query = "SELECT * FROM tbl_category WHERE provider_id = ?";

  con.query(query, [provider_id], (err,result) => {

    if(err){
      console.log(err);
      return res.status(500).json({success:false});
    }

    res.json(result);
  });

});

// ==========================================================
// ADD CATEGORY
// ==========================================================
app.post("/api/addcategoryprocess", (req, res) => {

  const { provider_id, category_name, description } = req.body;

  if (!provider_id || !category_name || !description) {
    return res.json({
      success: false,
      message: "All fields required"
    });
  }

  const sql = `
    INSERT INTO tbl_category (provider_id, category_name, description)
    VALUES (?, ?, ?)
  `;

  con.query(sql, [provider_id, category_name, description], (err, result) => {

    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Database error"
      });
    }

    res.json({
      success: true,
      message: "Category Added Successfully"
    });

  });

});
/// ==========================================================
// SERVICE IMAGE STORAGE
// ==========================================================
const serviceStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "Public/services"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const serviceUpload = multer({ storage: serviceStorage });

// ==========================================================
// SLIDER IMAGE STORAGE
// ==========================================================

const sliderStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "Public/slider"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const sliderUpload = multer({ storage: sliderStorage });




// ==========================================================
// ADD SERVICE
// ==========================================================
app.post("/api/addservice", serviceUpload.single("service_image"), (req, res) => {

  const { provider_id, category_id, service_name, description, price, duration } = req.body;

  const service_image = req.file ? req.file.filename : null;

  if (!provider_id || !category_id || !service_name || !price || !duration) {
    return res.json({ success: false, message: "Please fill all required fields" });
  }

  const sql = `
    INSERT INTO tbl_service
    (provider_id, category_id, service_name, description, price, service_image, duration, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0)
  `;

  con.query(sql,
    [provider_id, category_id, service_name, description, price, service_image, duration],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.json({ success: false, message: "Database error" });
      }

      res.json({ success: true, message: "Service Added Successfully" });

    });
});

// ==========================================================
// GET SERVICES (Provider Wise)
// ==========================================================
app.get("/api/getservices/:provider_id", (req, res) => {

  const provider_id = req.params.provider_id;

  const sql = `
    SELECT s.*, c.category_name 
    FROM tbl_service s
    JOIN tbl_category c ON s.category_id = c.category_id
    WHERE s.provider_id = ?
    ORDER BY s.service_id DESC
  `;

  con.query(sql, [provider_id], (err, result) => {

    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    res.json(result);

  });

});


// delete api //
app.delete('/api/category_delete/:category_id' ,(req,res) => {
    const {category_id}=req.params;
    const query="DELETE FROM tbl_category WHERE category_id=?";
    con.query(query,[category_id],(error,results) => {
        if(error){
        return res.status(500).json({message:'server error'});
        }
        if(results.affectedRows === 0){
            return res.status(404).json({message:'category not found'});
        }
        res.status(200).json({message:'category deleted succesfully'});
    });
});


// ==========================================================
// DELETE SERVICE
// ==========================================================
app.delete('/api/deleteservice/:service_id', (req, res) => {

  const { service_id } = req.params;

  const query = "DELETE FROM tbl_service WHERE service_id = ?";

  con.query(query, [service_id], (error, results) => {

    if (error) {
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });

  });

});

app.post('/api/editcategory', (req, res) => {

    const { category_id } = req.body;

    const query = "SELECT * FROM tbl_category WHERE category_id = ?";

    con.query(query, [category_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.json(result[0]);

    });

});

app.post('/api/editcategoryprocess', (req, res) => {

    const { category_id, category_name, description } = req.body;

    const query = `
        UPDATE tbl_category 
        SET category_name = ?, description = ?
        WHERE category_id = ?
    `;

    con.query(query, [category_name, description, category_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error updating category"
            });
        }

        res.json({
            success: true,
            message: "Category updated successfully"
        });

    });

});

// ==========================================================
// GET SINGLE SERVICE
// ==========================================================
app.post("/api/editservice", (req, res) => {

  const { service_id } = req.body;

  const sql = "SELECT * FROM tbl_service WHERE service_id = ?";

  con.query(sql, [service_id], (err, result) => {

    if (err) {
      return res.json({ success: false, message: "Database error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, message: "Service not found" });
    }

    res.json(result[0]);

  });

});

// ==========================================================
// UPDATE SERVICE
// ==========================================================
app.post("/api/editserviceprocess", serviceUpload.single("service_image"), (req, res) => {

  const {
    service_id,
    category_id,
    service_name,
    description,
    price,
    duration
  } = req.body;

  let sql;
  let params;

  // Agar image change hui hai
  if (req.file) {

    sql = `
      UPDATE tbl_service 
      SET category_id=?, service_name=?, description=?, price=?, duration=?, service_image=? 
      WHERE service_id=?`;

    params = [
      category_id,
      service_name,
      description,
      price,
      duration,
      req.file.filename,
      service_id
    ];

  } else {

    // Agar image same hai
    sql = `
      UPDATE tbl_service 
      SET category_id=?, service_name=?, description=?, price=?, duration=? 
      WHERE service_id=?`;

    params = [
      category_id,
      service_name,
      description,
      price,
      duration,
      service_id
    ];
  }

  con.query(sql, params, (err) => {

    if (err) {
      return res.json({ success: false, message: "Update failed" });
    }

    res.json({
      success: true,
      message: "Service Updated Successfully"
    });

  });

});

app.post("/api/getproviderprofile", (req, res) => {

  const { provider_id } = req.body;

  const sql = "SELECT * FROM provider_details WHERE provider_id=?";

  con.query(sql, [provider_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }

    res.json(result[0]);
  });

});

app.post("/api/updateproviderprofile", (req, res) => {

  const {
    provider_id,
    provider_name,
    email,
    contactno,
    business_name,
    city,
    address,
    description
  } = req.body;

  const sql = `
    UPDATE provider_details 
    SET provider_name=?, email=?, contactno=?, business_name=?, city=?, address=?, description=? 
    WHERE provider_id=?
  `;

  con.query(sql, [
    provider_name,
    email,
    contactno,
    business_name,
    city,
    address,
    description,
    provider_id
  ], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ success:false });
    }

    res.json({ success:true });

  });

});

// ==========================================================
// USER REGISTER
// ==========================================================
app.post("/api/user/register", (req, res) => {

  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.json({
      success: false,
      message: "All fields required"
    });
  }

  // Check email already exists
  const checkSql = "SELECT * FROM tbl_user WHERE email = ?";

  con.query(checkSql, [email], (err, result) => {

    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Database error" });
    }

    if (result.length > 0) {
      return res.json({
        success: false,
        message: "Email already registered"
      });
    }

    const insertSql = `
      INSERT INTO tbl_user (name, email, password, phone)
      VALUES (?, ?, ?, ?)
    `;

    con.query(insertSql, [name, email, password, phone], (err2) => {

      if (err2) {
        console.log(err2);
        return res.json({ success: false, message: "Registration failed" });
      }

      res.json({
        success: true,
        message: "User Registered Successfully"
      });

    });

  });

});

// ==========================================================
// USER LOGIN
// ==========================================================
app.post("/api/user/login", (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "All fields required"
    });
  }

  const sql = "SELECT * FROM tbl_user WHERE email=? AND password=?";

  con.query(sql, [email, password], (err, result) => {

    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Database error"
      });
    }

    if (result.length > 0) {
      return res.json({
        success: true,
        message: "Login successful",
        user: result[0]
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid Email or Password"
      });
    }

  });

});


// ==========================================================
// ADD SLIDER
// ==========================================================

app.post("/api/addslider", sliderUpload.single("slider_image"), (req, res) => {

  const { slider_title, slider_text } = req.body;

  const slider_image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO tbl_slider
    (slider_title, slider_text, slider_image)
    VALUES (?, ?, ?)
  `;

  con.query(sql, [slider_title, slider_text, slider_image], (err, result) => {

    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    res.json({
      success: true,
      message: "Slider Added Successfully"
    });

  });

});


// ==========================================================
// GET SLIDER
// ==========================================================

app.post("/api/getslider", (req, res) => {

  const sql = "SELECT * FROM tbl_slider ORDER BY slider_id DESC";

  con.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.json([]);
    }

    res.json(result);

  });

});


// ==========================================================
// DELETE SLIDER
// ==========================================================

app.post("/api/deleteslider", (req, res) => {

  const { slider_id } = req.body;

  const sql = "DELETE FROM tbl_slider WHERE slider_id=?";

  con.query(sql, [slider_id], (err, result) => {

    if (err) {
      console.log(err);
      return res.json({ success: false });
    }

    res.json({
      success: true,
      message: "Slider Deleted"
    });

  });

});


// GET ALL CATEGORY (FOR USER WEBSITE)


app.get("/api/getallcategory", (req, res) => {

  const sql = `
    SELECT category_id, category_name
    FROM tbl_category
    ORDER BY category_id DESC
  `;

  con.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.json([]);
    }

    res.json(result);

  });

});

app.post("/api/catservices", (req, res) => {

  const category_id = req.body.category_id;

  let sql;
  let params = [];

  if (category_id) {
    sql = "SELECT * FROM tbl_service WHERE category_id = ?";
    params.push(category_id);
  } else {
    sql = "SELECT * FROM tbl_service";
  }

  con.query(sql, params, (err, result) => {

    if (err) {
      console.log(err);
      return res.json([]);
    }

    res.json(result);

  });

});

app.post("/api/allservices", (req, res) => {

  const sql = "SELECT * FROM tbl_service";

  con.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.json([]);
    }

    res.json(result);

  });

});

// ==========================================================
// BOOK SERVICE
// ==========================================================

app.post("/api/bookservice", (req, res) => {

  const {
    user_id,
    provider_id,
    service_id,
    address,
    booking_day,
    time_slot
  } = req.body;

  const sql = `
  INSERT INTO tbl_booking
  (user_id, provider_id, service_id, address, booking_day, time_slot, status)
  VALUES (?, ?, ?, ?, ?, ?, 0)
  `;

  con.query(
    sql,
    [user_id, provider_id, service_id, address, booking_day, time_slot],
    (err, result) => {

      if (err) {
        console.log(err);
        return res.json({ status: 0 });
      }

      res.json({ status: 1 });

    }
  );

});

app.post("/api/providerbookings", (req,res)=>{

const provider_id = req.body.provider_id;

const sql = `
SELECT 
b.*, 
u.name,
u.phone,
s.service_name
FROM tbl_booking b
JOIN tbl_user u ON b.user_id = u.user_id
JOIN tbl_service s ON b.service_id = s.service_id
WHERE b.provider_id = ?
ORDER BY b.booking_id DESC
`;

con.query(sql,[provider_id],(err,result)=>{

if(err){
console.log(err);
return res.json([]);
}

res.json(result);

});

});


// update booking

app.post("/api/updatebookingstatus",(req,res)=>{

const { booking_id , status } = req.body;

const sql = `
UPDATE tbl_booking
SET status = ?
WHERE booking_id = ?
`;

con.query(sql,[status,booking_id],(err,result)=>{

if(err){
console.log(err);
return res.json({success:false});
}

res.json({success:true});

});

});


//my bookings

app.post("/api/mybookings", (req, res) => {

  const { user_id } = req.body;

  const sql = `
  SELECT 
    b.booking_id,
    b.booking_day,
    b.time_slot,
    b.status,
    s.service_name,
    s.price
  FROM tbl_booking b
  JOIN tbl_service s 
  ON b.service_id = s.service_id
  WHERE b.user_id = ?
  ORDER BY b.booking_id DESC
  `;

  con.query(sql, [user_id], (err, result) => {

    if (err) {
      console.log(err);
      return res.json([]);
    }

    res.json(result);

  });

});

// check email

app.post("/api/checkemail",(req,res)=>{

const { email } = req.body;

const sql = "SELECT * FROM tbl_user WHERE email=?";

con.query(sql,[email],(err,result)=>{

if(err){
console.log(err);
return res.json({status:0});
}

if(result.length>0){
res.json({status:1});
}else{
res.json({status:0});
}

});

});

// reset password
app.post("/api/resetpassword",(req,res)=>{

const { email,password } = req.body;

const sql = "UPDATE tbl_user SET password=? WHERE email=?";

con.query(sql,[password,email],(err,result)=>{

if(err){
console.log(err);
return res.json({status:0});
}

res.json({status:1});

});

});

//Get User Profile
app.post("/api/getuserprofile",(req,res)=>{

const { user_id } = req.body;

const sql = `
SELECT name,email,phone,address
FROM tbl_user
WHERE user_id=?
`;

con.query(sql,[user_id],(err,result)=>{

if(err){
console.log(err);
return res.json({});
}

res.json(result[0]);

});

});

//Update Profile
app.post("/api/updateuserprofile",(req,res)=>{

const { user_id,name,email,phone,address } = req.body;

const sql = `
UPDATE tbl_user
SET name=?,email=?,phone=?,address=?
WHERE user_id=?
`;

con.query(sql,[name,email,phone,address,user_id],(err,result)=>{

if(err){
console.log(err);
return res.json({status:0});
}

res.json({status:1});

});

});

// ================= START SERVER =================
app.listen(1337, () => {
  console.log("Server running on http://127.0.0.1:1337");
});
