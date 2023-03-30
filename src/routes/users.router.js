import { Router } from "express";
import UsersManager from "../dao/mongoManagers/UsersManager.js";
import passport from "passport";
import { generateToken } from "../utils.js";


const usersManager = new UsersManager()

const router = Router()

router.post("/register", async (req, res)=>{
    const newUser = await usersManager.createUser(req.body)
    const token = generateToken(newUser)
    res.cookie("token", token)
    if(newUser){
        res.redirect("/views")
    } else {
        res.redirect("/views/registerError")
    }
})

/* 
router.post("/register", passport.authenticate("register", {failureRedirect: "/views/registerError", successRedirect: "/views", passReqToCallback: true})) */

router.post("/login", passport.authenticate("login",{failureRedirect: "/views/loginError", successRedirect: "/products", passReqToCallback: true}))

/* router.post("/login", passport.authenticate("login",{failureRedirect: "/views/loginError", successRedirect: "/products", passReqToCallback: true}), (req,res)=>{
    const token = generateToken(req.user)
    res.cookie("token", token)
}) */


/* router.post("/login", async (req, res)=>{
    const {email, password} = req.body
    const user = await usersManager.loginUser(req.body)
    if(user){
        req.session.email = email
        req.session.password = password
        const nameUser = await usersManager.findUserByEmail({email})
        const {first_name, last_name} = nameUser
        res.cookie("nameCookie", first_name + " " + last_name)
        res.redirect("/products")
    } else{
        res.redirect("/views/loginError")
    }
}) */

router.get("/registerGitHub", passport.authenticate("github",{ scope: [ 'user:email' ] }))
router.get("/GitHub", passport.authenticate("github"), (req, res)=>{
    req.session.email = req.user.email
    res.redirect("/products/")
})

router.get("/logout", async (req,res)=>{
    req.session.destroy(error=>{
        if(error){console.log(error)}
        res.redirect("/views")
    })
})

export default router