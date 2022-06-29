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

const mongoURI = '';
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
    const {username, email, password, telegramID} = req.body;
    try {
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
            password: hashedPas,
            telegramID,
        });
        await user.save()
        res.send({
            statusAuth: true
        }).status(200)
    }catch (e){
        console.log(e)
        res.status(400)
    }

})

app.post('/api/login', async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await Users.findOne({email})
        if(!user){
            res.send({
                userMessage: false
            });
            res.status(404).json({})
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
            personLog: email,
            idTg: user.telegramID,
        })
    }catch (e) {
        console.log(e)
    }
})

app.get('/api/logout', (req, res) =>{
    try {
        res.send({
            success: false,
            personLog: '',
            routerTag: true
        }).status(200)
    }catch (e){
        console.log(e)
        res.status(400)
    }
})

app.post('/api/addListNote', async (req, res) =>{
    const {title, text, date, nickname, IDtg} = req.body;
    try {
        const saveData = new itemList({
            titleNote: title,
            author: nickname,
            date: date,
            description: text,
            IDtgAuthor: IDtg
        })
        await saveData.save()
        res.send({
            status: 'create'
        })
    }catch (e){
        console.log(e)
    }
})

app.post('/api/getAllNote', async (req, res) =>{
    const {nickname} = req.body;
    try {
        let listOfEntries = await itemList.find({author: nickname})
        res.send(listOfEntries).status(200)
    }catch (e){
        console.log(e)
        res.status(400)
    }
})

app.delete('/api/deleteNotes/:id', async (req, res) =>{
    const idNotes = req.params.id;
    try {
        await itemList.deleteOne({id: idNotes})
    }catch (e) {
        console.log(e)
    }
})

app.post('/api/editNote', async (req, res) =>{
    const {title, text, idNote} = req.body;
    try {
        await itemList.updateOne(
            {id: idNote},
            {$set: {
                    titleNote: title,
                    description: text
                }
            }
        )
        res.send().status(200)
    }catch (e){
        console.log(e)
        res.status(400)
    }
});

app.post('/addUserID', async (req,res)=>{
    const {nickname, IDT} = req.body;
    try {
        await Users.updateOne(
            {username: nickname},
            {$set:{
                    telegramID: IDT
                }}
        )
        await itemList.updateOne(
            {author: nickname},
            {$set:{
                    IDtgAuthor: IDT
                }}
        )
        res.status(200).send('Successfully!')
    }
    catch (e){
        console.log(e)
        res.status(400)
    }
});


const TelegramBot = require('node-telegram-bot-api')
const token = ""
const bot = new TelegramBot(token, {polling: true})

const userID = []

bot.onText(/\/start/, (msg, match)=>{
    const chatID = msg.chat.id
    userID.push(chatID)
    console.log('user registered')
    bot.sendMessage(chatID, `
    To receive notifications from our system, insert your ID in the connection field on the website! 
Your ID: ${chatID} 
Enjoy your use +)
    `)
})

setInterval(async function (){
    let date = (new Date()).toISOString().split('T')[0];
    let dateArray = await itemList.find({date: (new Date()).toISOString().split('T')[0], IDtgAuthor: {$ne: null}});
    for(let i = 0; i < Object(dateArray).length; i++){
        let telegramId = dateArray[i].IDtgAuthor;
            bot.sendMessage(telegramId, `
            We remind you about the end of the event👽:
            
${dateArray[i].titleNote}
${dateArray[i].description}
${dateArray[i].date}

        `);
        await itemList.deleteOne({id: dateArray[i]._id})
    }

}, 2000);

start();
