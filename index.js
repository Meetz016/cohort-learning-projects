const express=require("express")

const app=express()
const port=3000



app.use(express.json())


const users=[
    {
        name:"john",
        kidneys:[
            {
                isHealthy:false,
            },
            {
                isHealthy:true
            },
            {
                isHealthy:false,
            },
            {
                isHealthy:true
            }
        ]
    }
]

//TODO: create 4 routes get,post,put,delete

//how many kidneys does user have
app.get("/getKidneys",(req,res)=>{
    const name=req.body.name

    const user=users.find(user=>user.name===name)

    if(!user){
        return res.status(404).send({
            "msg":"The user is not found"
        })
    }
    let healthyKidneys=0
    for(let i=0;i<user.kidneys.length;i++){
        if(user.kidneys[i].isHealthy){
            healthyKidneys++
        }
    }
    res.json({
        total:user.kidneys.length,
        healthyKidneys,
        unhealthyCount:user.kidneys.length-healthyKidneys
    });
    

})


//can add a new kidney
app.post("/addKidney",(req,res)=>{

    const {name,status}=req.body
    const user=users.find(user=>user.name===name)

    if(!user){
        return res.status(404).json({
            msg:"user does not exist failed to add kidney"
        })
    }

    user.kidneys.push({isHealthy:status})


    res.status(200).json({
        msg:"operation sucessful"
    })

})

//can replace their unhealthy kidney with healthy one
app.put("/replaceKidneys",(req,res)=>{

    const name=req.body.name

    const user=users.find(user=>user.name===name)
    if(!user){
        return res.status(404).json({
            msg:"user does not exist !"
        })
    }

    //user is there
    // we have to change all unhealthy to healthy

    for(let i=0;i<user.kidneys.length;i++){

        if(!user.kidneys[i].isHealthy){
            console.log('Before:', user.kidneys[i].isHealthy); 
            user.kidneys[i].isHealthy=true
            console.log('after:', user.kidneys[i].isHealthy); 
        }
    }

    res.status(200).json({
        msg:"all kidneys were recovered successfully"
    })
})

//delete their kidney
app.delete("/remove",(req,res)=>{
    const user=users.find(user=>user.name===req.body.name)

    if(!user){
        return res.status(404).json({
            msg:"user does not exist."
        })
    }

    //remove all unhealthy kidneys
    user.kidneys=user.kidneys.filter(kidneys => kidneys.isHealthy)
    res.status(200).json({
        msg:"all unhealthy removed"
    })
})
app.listen(port,()=>{
    console.log("server started at ",port)
})

