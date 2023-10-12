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

async function make_id(type)
{
    let rand = Math.random() * 100000000000000000;
    //console.log(Number(rand));

    if (await db.collection(type).findOne({"id": rand}))
        return make_id(rand);
    else
        return rand;
}

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

app.post("/usuarios", async(request, response)=>{
    //let parametersFind = await db.collection("Usuarios").find({}).toArray();
    
    let id = await make_id("Usuarios") ;
    let user = request.body.username;
    let pass = request.body.password;
    let fname = request.body.fullName;
    let nivel = request.body.nivel;
    let region = request.body.region;

    //console.log(request.body)
    let data= await db.collection("Usuarios").findOne({"usuario": user});
    if(data==null){
        try{
            bcrypt.genSalt(10, (error, salt)=>{
                bcrypt.hash(pass, salt, async(error, hash)=>{
                    let usuarioAgregar={"id":id,"usuario": user, "password": hash, "fullName": fname,"nivel": nivel, "region":region};
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
                let token=jwt.sign({ id: data.id, usuario: data.usuario , nivel:data.nivel ,region:data.region}, "secretKey", {expiresIn: 3600});
                log(user, "login", "");
                response.json({"token": token, id:data.id, nivel:data.nivel , region:data.region})
            }else{
                response.sendStatus(401)
            }
        })
    }
})

app.get("/usuarios", async (request, response) => {
    try {
        let token = request.get("Authentication");
        if (!token) {
            response.sendStatus(401);
            return;
        }
        let verifiedToken = await jwt.verify(token, "secretKey");
        //console.log(verifiedToken.id);
        let authData = await db.collection("Usuarios").findOne({ "id": verifiedToken.id });
        if (!authData || !authData.nivel) {
            response.sendStatus(401);
            return;
        }
        let parametersFind = {};
        if (authData.nivel === "local") {
            parametersFind["id"] = authData.id;
        } else if (authData.nivel === "nacional") {
            parametersFind["region"] = authData.region;
        }
        if ("_sort" in request.query) {
            let sortBy = request.query._sort;
            let sortOrder = request.query._order == "ASC" ? 1 : -1;
            let start = Number(request.query._start);
            let end = Number(request.query._end);
            let sorter = {};
            sorter[sortBy] = sortOrder;
            let data = await db.collection("Usuarios").find(parametersFind).sort(sorter).project({ _id: 0 }).toArray();
            response.set("Access-Control-Expose-Headers", "X-Total-Count");
            response.set("X-Total-Count", data.length);
            data = data.slice(start, end);
            response.json(data);
        } else if ("id" in request.query) {
            let data = [];
            for (let index = 0; index < request.query.id.length; index++) {
                let dataObtain = await db.collection("Usuarios").find({ id: Number(request.query.id[index]) }).project({ _id: 0 }).toArray();
                data = await data.concat(dataObtain);
            }
            response.json(data);
        } else {
            let data = [];
            data = await db.collection("Usuarios").find(request.query).project({ _id: 0 }).toArray();
            response.set("Access-Control-Expose-Headers", "X-Total-Count");
            response.set("X-Total-Count", data.length);
            response.json(data);
        }
    } catch {
        response.sendStatus(401);
    }
});

app.get("/usuarios/:id", async (request, response)=>{
    try{
        let token = request.get("Authentication");
        if (!token) {
            response.sendStatus(401);
            return;
        }
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("Usuarios").findOne({"id": verifiedToken.id})
        let parametersFind={"id": Number(request.params.id)}
        //if(authData.nivel==="local"){
        //    throw "Usuario no autorizado";
        //}
        let data=await db.collection('Usuarios').find(parametersFind).project({_id:0}).toArray();
        log(verifiedToken.id, "ver objeto", request.params.id)
        //console.log("se ve el objeto")
        response.json(data[0]);
    }catch{
        response.sendStatus(401);
    }
})

//getList, getMany, getManyReference
app.get("/tickets", async (request, response) => {
    try {
        let token = request.get("Authentication");
        if (!token) {
            response.sendStatus(401);
            return;
        }
        let verifiedToken = await jwt.verify(token, "secretKey");
        //console.log(verifiedToken.id);
        let authData = await db.collection("Usuarios").findOne({ "id": verifiedToken.id });
        if (!authData || !authData.nivel) {
            response.sendStatus(401);
            return;
        }
        let parametersFind = {};
        if (authData.nivel === "local") {
            parametersFind["id_cor"] = authData.id;
            //console.log(parametersFind);
        } else if (authData.nivel === "nacional") {
            parametersFind["region"] = authData.region;
        }

        //console.log(request.query);
        //Tratar con filtros
        if ("status" in request.query){
            parametersFind['status'] = request.query.status;
        }
        if ("fecha" in request.query){
            let LastWeek = new Date();
            LastWeek.setDate(LastWeek.getDate() - 7);
            parametersFind['fechaCreacion'] = {"$lt" : LastWeek};
        }

        if ("_sort" in request.query) {
            let sortBy = request.query._sort;
            let sortOrder = request.query._order == "ASC" ? 1 : -1;
            let start = Number(request.query._start);
            let end = Number(request.query._end);
            let sorter = {};
            sorter[sortBy] = sortOrder;
            let data = await db.collection("Tickets").find(parametersFind).sort(sorter).project({ _id: 0 }).toArray();
            response.set("Access-Control-Expose-Headers", "X-Total-Count");
            response.set("X-Total-Count", data.length);
            data = data.slice(start, end);
            response.json(data);
        } else if ("id" in request.query) {
            let data = [];
            for (let index = 0; index < request.query.id.length; index++) {
                let dataObtain = await db.collection("Tickets").find({ id: Number(request.query.id[index]) }).project({ _id: 0 }).toArray();
                //console.log(dataObtain);
                data = await data.concat(dataObtain);
            }
            response.json(data);
        } else {
            let data = [];
            data = await db.collection("Tickets").find(request.query).project({ _id: 0 }).toArray();
            response.set("Access-Control-Expose-Headers", "X-Total-Count");
            response.set("X-Total-Count", data.length);
            response.json(data);
        }
    } catch {
        response.sendStatus(401);
    }
});

//getOne
app.get("/tickets/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("Usuarios").findOne({"id": verifiedToken.id})
        let parametersFind={"id": Number(request.params.id)}
        if(authData.nivel=="local"){
            parametersFind["id_cor"]=verifiedToken.id;
        }
        let data=await db.collection('Tickets').find(parametersFind).project({_id:0}).toArray();
        log(verifiedToken.id, "ver objeto", request.params.id)
        response.json(data[0]);
    }catch{
        response.sendStatus(401);
    }
})

//create
app.post("/tickets", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        if (!token) {
            response.sendStatus(401);
            return;
        }
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("Usuarios").findOne({"id": verifiedToken.id})
        let addValue=request.body
        //let data=await db.collection('Tickets').find({}).toArray();
        //let id_tik=data.length+1;
        addValue["id"]= await make_id("Tickets");
        addValue["id_cor"]=verifiedToken.id;
        addValue["usuario"]=authData.usuario;
        addValue["status"]="Pendiente";
        addValue["fechaCreacion"] = new Date();
        addValue["fechaCierre"] = "";
        addValue["region"]=authData.region;
        data=await db.collection('Tickets').insertOne(addValue);
        //console.log(addValue)
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

        let addValue = {status: '', id: ''};
        addValue["status"] = request.body.status;
        addValue["id"]=Number(request.params.id);
        if(addValue.status==="Resuelto" ){
            addValue["fechaCierre"] = new Date();
        }

        let data=await db.collection('Tickets').findOne({"id": Number(addValue["id"])});
        let authData=await db.collection("Usuarios").findOne({"id": verifiedToken.id})
        if(data.id_cor === verifiedToken.id || authData.nivel === "nacional" && authData.region === data.region || authData.nivel === "ejecutivo" ){
            await db.collection("Tickets").updateOne({"id": addValue["id"]}, {"$set": addValue});
        }
        else{
            response.sendStatus(401);
        }
    }catch{
        response.sendStatus(401);
    }
})

//delete
app.delete("/tickets/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        if(!token){
            response.sendStatus(401);
            return;
        }
        if(verifiedToken.nivel==="ejecutivo"){
        let data=await db.collection('Tickets').deleteOne({"id": Number(request.params.id)});
        response.json(data);
        }
    }catch{
        response.sendStatus(401);
    }
})

app.get("/ticketsRvsno", async (request, response)=>{
    try{
        let LastWeek = new Date();
        LastWeek.setDate(LastWeek.getDate() - 7);

        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        if(!token){
            response.sendStatus(401);
            return;
        }
        let authData=await db.collection("Usuarios").findOne({"id": verifiedToken.id})
        if(authData.nivel=="ejecutivo"){
            const ticketsr = await db.collection("Tickets").find({"status": "Resuelto", "fechaCreacion": { "$gte": LastWeek }}).toArray();
            const ticketsn = await db.collection("Tickets").find({"status": "Pendiente", "fechaCreacion": { "$gte": LastWeek}}).toArray();
            response.json([ticketsr.length, ticketsn.length]);
        }else if(authData.nivel=="nacional"){
            const ticketsr = await db.collection("Tickets").find({"status": "Resuelto", "region": authData.region, "fechaCreacion": { "$gte": LastWeek }}).toArray();
            const ticketsn = await db.collection("Tickets").find({"status": "Pendiente", "region": authData.region,  "fechaCreacion": { "$gte": LastWeek }}).toArray();
            response.json([ticketsr.length, ticketsn.length]);
        }else if(authData.nivel=="local"){
            const ticketsr = await db.collection("Tickets").find({"status": "Resuelto", "id": authData.id, "fechaCreacion": { "$gte": LastWeek }}).toArray();
            const ticketsn = await db.collection("Tickets").find({"status": "Pendiente", "id": authData.id, "fechaCreacion": { "$gte": LastWeek }}).toArray();
            response.json([ticketsr.length, ticketsn.length]);
        }
        else 
            throw "error no autorizado";


    }catch{
        response.sendStatus(401);
    }
})

app.get('/ticketstop5', async (request, response)=>{
    try{
        let LastWeek = new Date();
        LastWeek.setDate(LastWeek.getDate() - 7);
        //console.log("entro")
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("Usuarios").findOne({"id": verifiedToken.id})
        if(authData.nivel=="ejecutivo"){
            const topTickets = await db.collection("Tickets")
                .aggregate([
                    {
                        $match: {"fechaCreacion": { "$gte": LastWeek }}
                    },
                    { 
                        $group: {
                            _id: "$region",
                            totalTickets: { $sum: 1 } 
                        }
                    },
                    {
                        $sort: { totalTickets: -1 } 
                    },
                    {
                        $limit: 5
                    }
                ])
                .toArray();  
             response.json(topTickets);
    }else{
        response.sendStatus(401);
    }
    }catch{
        response.sendStatus(401);
    }
})

app.get('/ticketsPorRegion', async (request, response)=>{
    try{
        let LastWeek = new Date();
        LastWeek.setDate(LastWeek.getDate() - 7);

        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let authData=await db.collection("Usuarios").findOne({"id": verifiedToken.id})
        if(authData.nivel=="ejecutivo"){
            const topTickets = await db.collection("Tickets")
                .aggregate([
                    {
                        $match: {"fechaCreacion": { "$gte": LastWeek }}
                    },
                    { 
                        $group: {
                            _id: "$region",
                            totalTickets: { $sum: 1 } 
                        }
                    },
                    {
                        $sort: { totalTickets: -1 } 
                    },
                ])
                .toArray();  
             response.json(topTickets);
    }else{
        response.sendStatus(401);
    }
    }catch{
        response.sendStatus(401);
    }
})

//crear comentario
app.post("/comentarios/:id", async (request, response)=>{
    try{
        let token=request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        if(!token){
            response.sendStatus(401);
            return;
        }
        let authData=await db.collection("Usuarios").findOne({"id": verifiedToken.id})
        let addValue=request.body
        //let data=await db.collection('Comentarios').find({}).toArray();
        //let id_com=data.length+1;
        //console.log(request.params);
        let ticket = await db.collection("Tickets").findOne({"id": Number(request.params.id)});
        if(ticket.id_cor === verifiedToken.id ||authData.region === ticket.region || authData.nivel === "ejecutivo" ){
            addValue["id"]= await make_id("Comentarios");
            addValue["id_tik"]=Number(request.params.id);
            addValue["id_cor"]=verifiedToken.id;
            addValue["fecha"] = new Date();
            data=await db.collection('Comentarios').insertOne(addValue);
            response.json(data);
        }
        
    }catch{
        response.sendStatus(401);
    }
})

//Mostrar comentarios
app.get("/comentarios", async (request, response) => {
    try {
        let token = request.get("Authentication");
        if (!token) {
            response.sendStatus(401);
            return;
        }
        let verifiedToken = await jwt.verify(token, "secretKey");
        let parametersFind = {"id_tik": Number(request.query.id_tik)};
        let sortBy = request.query._sort;
        let sortOrder = request.query._order == "ASC" ? 1 : -1;
        let start = Number(request.query._start);
        let end = Number(request.query._end);
        let sorter = {};
        sorter[sortBy] = sortOrder;
        let data = await db.collection("Comentarios").find(parametersFind).sort(sorter).project({ _id: 0 }).toArray();
        let ticket = await db.collection("Tickets").findOne({"id":Number(request.query.id_tik)});
        if(ticket.id_cor === verifiedToken.id || (verifiedToken.region === ticket.region && verifiedToken.nivel === "nacional") || verifiedToken.nivel === "ejecutivo" ){
            response.set("Access-Control-Expose-Headers", "X-Total-Count");
            response.set("X-Total-Count", data.length);
            data = data.slice(start, end);
            response.json(data);
        }
    } catch {
        response.sendStatus(401);
    }
});

module.exports = {app, connectDB};