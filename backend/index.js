const express=require('express')
const MongoClient=require('mongodb').MongoClient
var cors=require('cors')
bodyParser=require('body-parser')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const host = "127.0.0.1"

let db;
const app=express();
app.use(cors());
app.use(bodyParser.json());

async function connectDB(){
    let client=new MongoClient(`mongodb://${host}:27017/PorMexico`)
    await client.connect();
    db=client.db();
    console.log("conectado a la base de datos")
}

async function log(sujeto, accion, objeto){
    toLog={}
    toLog["timestamp"]=new Date();
    toLog["sujeto"]=sujeto;
    toLog["accion"]=accion;
    toLog["objeto"]=objeto;
    await db.collection("log").insertOne(toLog);
}

app.post("/registrarse", async(request, response)=>{
    let parametersFind = await db.collection("Usuarios").find({}).toArray();
    let id_cor = parametersFind.length+1 ;
    let user = request.body.username;
    let pass = request.body.password;
    let fname = request.body.fullName;
    let nivel = request.body.nivel;
    let region = request.body.region;

    console.log(request.body)
    let data= await db.collection("Usuarios").findOne({"usuario": user});
    if(data==null){
        try{
            bcrypt.genSalt(10, (error, salt)=>{
                bcrypt.hash(pass, salt, async(error, hash)=>{
                    let usuarioAgregar={"id_cor":id_cor,"usuario": user, "password": hash, "fullName": fname,"nivel": nivel, "region":region};
                    data= await db.collection("Usuarios").insertOne(usuarioAgregar);
                    response.sendStatus(201);
                })
            })
        }catch{
            response.sendStatus(401);
        }
    }else{
        response.sendStatus(401)
    }
})

app.post("/login", async(request, response)=>{
    let user=request.body.username;
    let pass=request.body.password;
    let data= await db.collection("Usuarios").findOne({"usuario": user});
    if(data==null){
        response.sendStatus(401);
    }else{
        bcrypt.compare(pass, data.password, (error, result)=>{
            if(result){
                let token=jwt.sign({ id_cor: data.id_cor}, "secretKey", {expiresIn: 600});
                log(user, "login", "");
                response.json({"token": token,"id_cor": data.id_cor})
            }else{
                response.sendStatus(401)
            }
        })
    }
})

//getList, getMany, getManyReference
app.get("/tickets", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("Usuarios").findOne({"id_cor": verifiedToken.id_cor})
        let parametersFind={}
        if(authData.nivel=="local"){
            parametersFind["id_cor"]=verifiedToken.id_cor;
        }
        
        if ("_sort" in request.query){
            let sortBy=request.query._sort;
            let sortOrder=request.query._order=="ASC"?1:-1;
            let start=Number(request.query._start);
            let end=Number(request.query._end);
            let sorter={}
            sorter[sortBy]=sortOrder
            let data=await db.collection('Tickets').find(parametersFind).sort(sorter).project({_id:0}).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count')
            response.set('X-Total-Count', data.length)
            data=data.slice(start, end)
            response.json(data);
        }else if ("id" in request.query){
            let data=[]
            for (let index=0; index<request.query.id.length; index++){
                let dataObtain=await db.collection('Tickets').find({id: Number(request.query.id[index])}).project({_id:0}).toArray();
                data=await data.concat(dataObtain)
            }
            response.json(data);
        }else {
            let data=[]
            data=await db.collection('Tickets').find(request.query).project({_id:0}).toArray();
            response.set('Access-Control-Expose-Headers', 'X-Total-Count')
            response.set('X-Total-Count', data.length)
            response.json(data)
        }
    }catch{
        response.sendStatus(401);
    }
})

//getOne
app.get("/tickets/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("Usuarios").findOne({"id_cor": verifiedToken.id_cor})
        let parametersFind={"id_tik": Number(request.params.id)}
        if(authData.permissions=="Coordinador"){
            parametersFind["usuario"]=verifiedToken.usuario;
        }
        let data=await db.collection('Tickets').find(parametersFind).project({_id:0}).toArray();
        log(verifiedToken.usuario, "ver objeto", request.params.id)
        response.json(data[0]);
    }catch{
        response.sendStatus(401);
    }
})


//create
app.post("/tickets", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("Usuarios").findOne({"id_cor": verifiedToken.id_cor})
        let addValue=request.body
        let data=await db.collection('Tickets').find({}).toArray();
        let id_tik=data.length+1;
        addValue["id"]=id_tik;
        addValue["id_cor"]=verifiedToken.id_cor;
        addValue["usuario"]=authData.usuario;
        addValue["status"]="Abierto";
        addValue["fecha"]=new Date();
        addValue["region"]=authData.region;
        data=await db.collection('Tickets').insertOne(addValue);
        console.log(addValue)
        response.json(data);
    }catch{
        response.sendStatus(401);
    }
}) 

//update
app.put("/tickets/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let addValue=request.body
        addValue["id"]=Number(request.params.id);
        let data=await db.collection("Tickets").updateOne({"id": addValue["id"]}, {"$set": addValue});
        data=await db.collection('Tickets').find({"id": Number(request.params.id)}).project({_id:0, id:1, nombre:1, materia:1}).toArray();
        response.json(data[0]);
    }catch{
        response.sendStatus(401);
    }
})

//delete
app.delete("/tickets/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let data=await db.collection('Tickets').deleteOne({"id": Number(request.params.id)});
        response.json(data);
    }catch{
        response.sendStatus(401);
    }
})

app.listen(1337, ()=>{
    connectDB();
    console.log("Servidor escuchando en puerto 1337")
})