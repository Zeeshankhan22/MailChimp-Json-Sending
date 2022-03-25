const express=require("express")
const bodyparser=require("body-parser")
const request=require("request")
const https=require("https")
const { options } = require("request")


const app=express()

app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")

})

app.post('/',function(req,res){
    const fname=req.body.inputFname
    const lname=req.body.inputLname
    const mail=req.body.inputEmail

    const data={
        members:[{
            email_address:mail,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }
        }]
    }

    const jsondata=JSON.stringify(data)

    const url="https://us14.api.mailchimp.com/3.0/lists/954ff930fe"

    const options={
        method:"POST",
        auth:"zee1:17d146c2b5914b3f2a58ff1a5f7f509c-us14"

        }


   const request= https.request(url,options,function(response){
       if(response.statusCode==200){
           res.sendFile(__dirname+"/success.html")
       }else{
           res.sendFile(__dirname+"/failure.html")
       }
        response.on('data',function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsondata)
    request.end()




})
app.post('/success',function(req,res){
    res.redirect('/')
})

app.post('/failure',function(req,res){
    res.redirect('/')
})


app.listen(process.env.PORT||3000,function(){
    console.log("Server Runs on 3000 Port");
})






// Key:           17d146c2b5914b3f2a58ff1a5f7f509c-us14
// Audience Id:   954ff930fe
// Url:           "https://us14.api.mailchimp.com/3.0/lists/954ff930fe"   //remove ${dc} from us14


