const { throws } = require("assert")
const express=require("express")
const fs=require("fs")
const path=require("path")
const router=express.Router()

router.get("/", async(req,res)=>{
  
    fs.readdir("data",(err,files)=>{
    if(err)
        throw err
        res.render("index",{title:"Home ",files:files})
    })
 
    
})
router.get("/create",(req,res)=>{
    res.render("create")
})
router.post("/create",(req,res)=>{
    const filename=req.body.filename+".txt";
    fs.writeFile("data/"+filename,req.body.filecontent,(err)=>{
        if(err)
        throw err;
        res.redirect("/");
    })
})

router.get("/delete/:filename",(req,res)=>{
   
        fs.rm("data/"+req.params.filename,(err)=>{
            console.log(err)
            res.redirect("/")
        })
   
})


router.get("/edit/:filename",(req,res)=>{
    fs.readFile("data/"+req.params.filename,"utf-8",(err,data)=>{
        if(err){
            res.status(401).send("<h1>Invalid File Name</h1>")
        }else{
            res.render("edit",{filename:req.params.filename,content:data})
        }
    })

})

router.post("/edit/:filename",(req,res)=>{
    console.log(req.body)
    fs.writeFile("data/"+req.params.filename,req.body.filecontent,"utf-8",(err)=>{
        if(err)
        throw err;
        else 
        res.redirect("/")
    })

    // fs.rename("data/"+req.params.filename,"data/"+req.body.filename,(err)=>{
    //     if(err)
    //     throw err;
       
            
    // })
})

module.exports=router