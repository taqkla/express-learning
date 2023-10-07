const dataPath=require("../User.json");
const fs= require("fs")
const saveUser=(data)=>{
    fs.readFileSync(dataPath,JSON.stringify(data))
}

const getUser=()=>{
    const data=fs.readFileSync(dataPath);
    return JSON.parse(jsonData)
}