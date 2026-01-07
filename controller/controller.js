const userModel = require("../model/idp");
const blogs = require("../model/blogs");
const randomstring = require('randomstring')
const profilemenu = require('../model/profile')
const bcrypt = require('bcrypt');
const cookies = require('cookies');
const fs = require('fs');
const nodemailer = require("nodemailer");
const { log } = require("console");
var us_id;

// Default Path ********************************************************************************

const defaultpath = async (req, res) => {
    const loginUser = req.cookies;
    console.log('cookies', loginUser);
    if (loginUser.uid) {
        try {
            const blog = await blogs.find();
            // console.log("user_id", us_id);
            res.render("index", { blog, us_id });
        } catch (err) {
            console.log(err);
        }
    } else {
        res.redirect('/signup');
    }
    res.render('index')
}

// Transporter ********************************************************************************

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: "narendrasince143@gmail.com",
        pass: "jboguolapjnuerdn",
    },
});

// Blog Data ********************************************************************************

const blog = async (req, res) => {
    // res.render('blog');
    try {
        const blogData = await blogs.find();
        res.render("blog", { blogData, us_id });
    } catch (err) {
        console.log(err);
    }
}

const appDoc = (req, res) => {
    console.log(req.file);
    const newBlog = new blogs({
        poster: req.file.path,
        blog: req.body.blog,
        description: req.body.description,
        userId: "us_id"
    });
    newBlog.save();
    res.redirect('/blog');
}

const deleteDoc = async (req, res) => {
    try {
        const deleteBlog = await blogs.findByIdAndDelete(req.params.id);
        fs.unlink(deleteBlog.poster, () => {
            res.redirect('/blog');
        })
    } catch (err) {
        console.log("delete", err);
    }
}

const editDoc = async (req, res) => {
    try {
        const editData = await blogs.findById(req.params.id)
        console.log("editData", editData);
        res.render('edit', { editData })
    } catch (err) {
        console.log("edited", err);
    }
}

const updateDoc = async (req, res) => {
    const { id, blog, description } = req.body;
    const { path } = req.file;
    try {
        const oldData = await blogs.findById(id)
        fs.unlink(oldData.poster, () => {
            console.log("Updata Done");
        })
        const UpdateBlog = await blogs.findByIdAndUpdate(id, {
            blog: blog, description: description,
            poster: path
        });
        res.redirect('/view');
    } catch (err) {
        console.log("update error", err);
    }
}

const view = async (req, res) => {
    try {
        let blogsList = await blogs.find();
        console.log('blogsList', blogsList);
        res.render('view', { blogData: blogsList });

    } catch (error) {
        console.log('err', error);
    }
}

// Registration ********************************************************************************

const register = async (req, res) => {
    let saltRound = 10;
    let epass = await bcrypt.hash(req.body.password, saltRound);
    console.log(epass);
    const newUser = new userModel({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: epass,
        token: ""
    });
    newUser.save();
    res.redirect('/signup');
}

const signIn = async (req, res) => {
    try {
        const usercheck = await userModel.find();
        const user = usercheck.filter((ans) => {
            return ans.email == req.body.email;
        });
        console.log("email", user);
        if (user.length == 0) {
            console.log("user created");
        } else {
            let dpass = await bcrypt.compare(req.body.password, user[0].password);
            console.log(dpass);
            if (dpass) {
                console.log("password match");
                let myCookie = {
                    httpOnly: true
                }
                res.cookie('uid', user[0].id, myCookie)
                console.log('pass match');
                res.redirect('/');
            } else {
                console.log("password err");
                res.redirect('/signup');
            }
        }
    } catch (err) {
        console.error(err);
    }
}

const log_on = (req, res) => {
    res.render('signin');
}

const logOut = (req, res) => {
    res.clearCookie('uid');
    res.redirect('/');
}

const login = (req, res) => {
    res.render('register');
}

const signup = (req, res) => {
    res.render('signin');
}

const signInpage = (req, res) => {
    res.render('signin')
}

const backTo = (req, res) => {
    res.render('index')
}

// Change Password ********************************************************************************

const changepass = (req, res) => {
    res.render('changepass');
}

const updatepass = async (req, res) => {
    const { uid } = req.cookies;
    const { old_pwd, new_pwd, conf_pwd } = req.body
    const user = await userModel.findById(uid)
    let check = await bcrypt.compare(old_pwd, user.password)
    if (check) {
        if (new_pwd == conf_pwd) {
            const sratio = 10;
            const encpass = await bcrypt.hash(new_pwd, sratio);
            const main = await userModel.findByIdAndUpdate(uid, { password: encpass })
            res.redirect('/logOut')
        }
        else {
            console.log("your new pass is not math your conf password");
        }
    } else {
        console.log("yor pass is not math");
    }
}

// Profile ********************************************************************************

const profile = async (req, res) => {
    const profiledata = await profilemenu.find();
    const users = await userModel.find();

    const user = users.filter((u) => {
        return u._id == req.params.userID
    })

    const profileUser = profiledata.filter((user) => {
        return user.userId === us_id
    })

    console.log("user", user);

    res.render('profile', { user: user[0], profileUser, us_id })
}

const addProfile = async (req, res) => {
    try {
        const { name, age, skill, email, description } = req.body
        let addProfile = await new profilemenu({
            name,
            skill,
            age,
            email,
            description,
            imgpath: req.file.path,
            userId: us_id
        })
        addProfile.save();
        res.redirect('/profile')

    } catch (err) {
        console.log(err);
    }
}
  

// Forgot password ********************************************************************************

const forgot = (req, res) => {
    res.render('forgot');
}

const otpForm =async (req, res) => {
    let {uid} = req.cookies
    let user = await userModel.findById(uid)

    if(user.token == req.params.token){
    res.render("newUserPassword");
    }
    else{
        res.json({msg : "invalid TOken..."})
    }

};


const forgotPass = async (req, res) => {
    const { email } = req.body;
    let admins = await userModel.find();
    let users = admins.filter((userd) => {
        return userd.email == email;
    });
    console.log("users", admins);
    if (users.length == 1) {
        // let generateOtp = Math.floor(Math.random() * 10000);
        res.cookie('uid', users[0].id, { httpOnly: true })
        // res.cookie('otp', generateOtp, { httpOnly: true })

        const token = randomstring.generate();
        const tokenUpdate = await userModel.findByIdAndUpdate(users[0].id, { token })

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            port: 465,
            secure: true,
            auth: {
                user: "narendrasince143@gmail.com",
                pass: "jboguolapjnuerdn",
            },
        });
        const{uid}=req.cookies;
        const user = await userModel.findById(users[0].id);
        console.log("user", user);
        const info = await transporter.sendMail({
            from: 'narendrasince143@gmail.com',
            to: user.email,
            subject: "Reset Password",
            html: `<a href="http://localhost:5001/otpForm/${token}">Reset Link</a>`
        });
        console.log('mail send', info.messageId);

        res.json(({msg: "LInk sent"}));
    }
    else {
        res.redirect('/forgotPass')
    }
}

const newUserPassword = (req, res) => {
    res.render('newUserPassword');
}

const verifyOtp = (req, res) => {
    const { otppass } = req.body;
    let user_otp = otppass;
    console.log(user_otp);

    const { otp } = req.cookies;
    if (otp == user_otp) {
        res.redirect("/newUserPassword");
    }
    else {
        res.redirect('/otpForm')
    }
};

const updateUserpassword = async (req, res) => {
    const { new_password, confirm_password } = req.body;
    if (new_password == confirm_password) {
        let admins = await userModel.find();
        let { uid } = req.cookies
        let enPass = await bcrypt.hash(new_password, 10);
        await userModel.findByIdAndUpdate(uid, {
            password: enPass,
            token:""
        });
        res.clearCookie('otp');
        res.redirect("/logOut");
    } else {
        console.log("Password Not Match....");
        res.redirect("/forgotPass");
    }
};





module.exports = { transporter, defaultpath, appDoc, blog, logOut, deleteDoc, changepass, editDoc, backTo, updateDoc, register, login, signup, signIn, view, signInpage, profile, log_on, updatepass, forgot, forgotPass, otpForm, newUserPassword, verifyOtp, updateUserpassword, addProfile }