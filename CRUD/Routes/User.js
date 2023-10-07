const express = require("express")
const userRoutes = express.Router();
const fs = require('fs');
const dataPath=require("../User.json")
const saveUser=(data)=>{// saveAccountData
    const stringifyData = JSON.stringify(data)
    // fs.writeFileSync(dataPath, stringifyData)
   fs.promises.writeFile("../User.json", stringifyData,{flag:'a+'});   //'a+' is append mode
}



const getUser=()=>{ //getAccountData
 
    const data = fs.readFileSync('../User.json',
    { encoding: 'utf8', flag: 'r' });
    
    return data
}
// getUser()

userRoutes.post("/adduser",(req,res)=>{
    var existAccounts = getUser()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
 
    existAccounts[newAccountId] = req.body
   
    console.log(existAccounts);
    saveUser(existAccounts);
    res.send({success: true, msg: 'account added successfully'})
})

// get request

userRoutes.get("/userlist",(req,res)=>{
    const data= getUser();
    res.send((data))
    
})

//updating the data

userRoutes.put("/userlist/:id",(req,res)=>{
    var userExist=getUser();

    fs.readFile('../User.json','utf-8',(err,data)=>{
        const userId=req.params['id'];
        userExist[userId]=req.body;
        saveUser(userExist);
        res.send(`User with id ${userId} has been updated`)
    },true)
})

userRoutes.delete("/delete/:id",(req,res)=>{
    fs.readFileSync('../User.json','utf-8',(req,res)=>{
        var existUser=getUser();
        const userId=req.params['id'];
        delete existUser[userId];
        saveUser(existUser);
        res.send(`account with id ${userId} has been deleted`)
    })
})

module.exports = userRoutes