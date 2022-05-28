const express = require('express')
const app = express()
const session = require('express-session')
const mongoose = require("mongoose");
const MongoDBSession = require('connect-mongodb-session')(session)
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
const router = express.Router();
const PORT = 3000

const mongoURI = 'mongodb+srv://da4a:nomokon@cluster0.c2vqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'mySessions',
});

app.use(session({
    secret: 'new keygen',
    resave: false,
    saveUninitialized: false,
    store: store,
}))
app.use(express.json());
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

const Users = require('./models/users');
const itemList = require('./models/itemList');

const start = async () =>{
    try{
        await mongoose.connect(mongoURI)
        app.listen(PORT, ()=>{
            console.log(`Start server at http://localhost:${PORT}`);
        })
    }catch (e){
        console.log(e)
    }
};

app.get('/', (req, res)=>{
    res.send('Hello Word');
});

app.post('/api/register', async (req, res) =>{
    const {username, email, password} = req.body;
    const person = await Users.findOne({username});
    if(person){
        res.send({
            personInBD: true
        })
    }
    const hashedPas = await bcrypt.hash(password,12)
    const user = new Users({
        username,
        email,
        password: hashedPas
    });
    await user.save()
    res.send({
        statusAuth: true
    })
})

app.post('/api/login', async (req,res)=>{
    const {email, password} = req.body;
    console.log(req.body)
    const user = await Users.findOne({email})
    if(!user){
        res.send({
            userMessage: false
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        res.send({
            passMessage: false
        })
    }
    res.send({
        success: true,
        nickname: user.username,
        personLog: email
    })
})

app.get('/api/logout', (req, res) =>{
    res.send({
        success: false,
        personLog: '',
        routerTag: true
    })
})

app.post('/api/addListNote', async (req, res) =>{
    const {title, text, nickname} = req.body;
    const saveData = new itemList({
        titleNote: title,
        author: nickname,
        description: text
    })
    await saveData.save()
    res.send({
        status: 'create'
    })
})

app.post('/api/getAllNote', async (req, res) =>{
    const {nickname} = req.body;
    let listOfEntries = await itemList.find({author: nickname})
    res.send(listOfEntries)
})

app.delete('/api/deleteNotes/:id', async (req, res) =>{
    const idNotes = req.params.id;
    await itemList.deleteOne({id: idNotes})
})

app.post('/api/editNote', async (req, res) =>{
    const {title, text, idNote} = req.body;
    await itemList.updateOne(
        {id: idNote},
        {$set: {
                titleNote: title,
                description: text
            }
        }
    )
    res.send()
})

start();