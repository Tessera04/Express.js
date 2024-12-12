require('dotenv').config();

let bodyParser = require('body-parser');
let express = require('express');
let app = express();
let absolutePathIndex = __dirname + '/views/index.html';
let absolutePath = __dirname + '/public';
var message= 'Hello json';

app.use((req, res, next) => {
    console.log(req.method + ' ' + req.path + ' - ' +req.ip);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/public', express.static(absolutePath));

//app.get('/', (req, res) => {res.send('Hello Express')});
app.get('/', (req, res) => {res.sendFile(absolutePathIndex)});

app.get('/now', (req,res,next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.send({time : req.time});
});

app.get('/json', (req, res) => {
        if(process.env.MESSAGE_STYLE === 'uppercase'){
            res.json({'message': message.toUpperCase()});
        }else{
            res.json({'message': message});
        }
    }
);

app.get('/:word/echo', (req,res) => {
    res.json({ echo : req.params.word})
});

app.get('/name', (req,res) => {
    var firstName = req.query.first;
    var lastName = req.query.last;

    res.json({
        name: `${firstName} ${lastName}`
    });
});

app.post('/name', (req, res) => {
    var firstName = req.body.first;
    var lastName = req.body.last;

    res.json({
        name: `${firstName} ${lastName}`
    });
});






























 module.exports = app;
