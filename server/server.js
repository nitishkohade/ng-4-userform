var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
import { User } from './User';
var datafile = 'server/data/users.json';
var rolesfile = 'server/data/roles.json';
var port = process.env.PORT || 3001;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/libs', express.static(path.resolve(__dirname, 'libs')));

var renderIndex = (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
}
var nextID = 0;
app.get('/index', renderIndex);
app.get('/users', function (req, res) {
    console.log("dd");
    res.status(200).send(getUserData(datafile));
});
app.get('/roles', function (req, res) {
    console.log(users);
    res.status(200).send(getUserData(rolesfile));
});
// app.get('/user/:id',function(req, res, id:any) {
//     console.log(users);
//     res.status(200).send(users[parseInt(id)]);
// });
var users = [];
app.delete('/user/:id', function (req, resp) {
    console.log(req.params.id);
    users.splice(req.params.id, 1);
    nextID--;
    resp.status(200).send('success');
})
app.post('/users', function (req, res) {
    console.log(req.body);
    req.body.id = ++nextID;

    users.push(req.body);
    saveUserData(users);
    console.log(users);
    res.set('Content-Type', 'application/json');
    res.status(201).send({ id: req.body.id });
});

//not being used right now
function getUserData(file) {
    var data = fs.readFileSync(file, 'utf8');
    return data;
}

function saveUserData(data) {
    fs.writeFile(datafile, JSON.stringify(data, null, 4), function (err) {
        if (err) {
            console.log(err);
        }
    });
}

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});