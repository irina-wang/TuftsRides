var express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(express.static('public'));

const DATABASE_NAME = 'Shuttle';
const MONGO_URL = "mongodb+srv://ramaty01:mypassword@cluster0-hi4fv.mongodb.net/test?retryWrites=true&w=majority";

let db = null;
let coll = null;

async function startServer() {
    client = await MongoClient.connect(MONGO_URL);
    db = client.db(DATABASE_NAME);
    coll = db.collection('Stations');

    await app.listen(3000);
    console.log('Listening on port 3000');
}

async function getTime(stopName) {
    var today = new Date();
    var hour = today.getHours() + 14;
    var min = today.getMinutes();
    var index = 0;

    console.log(stopName + " Current time: " + hour + ":" + min);

    const stop = await coll.findOne({"stname" : stopName});
    var stopObj = getDay(today, stop, stopName);

    for (i = 0; i < stopObj.length; i++) {
        var h = stopObj[i].getHours() + 4;
        var m = stopObj[i].getMinutes();

        if (h == hour && m > min) {
            index = i; 
            break;
        } else if (h > hour) {
            index = i;
            break;
        }
    }

    var h1 = stopObj[index].getHours() + 4; 
    var m1 = stopObj[index].getMinutes();
    var h2 = stopObj[index + 1].getHours() + 4;
    var m2 = stopObj[index + 1].getMinutes();

    var diff1 = (h1 * 60 + m1) - (hour * 60 + min);
    var diff2 = (h2 * 60 + m2) - (hour * 60 + min);

    var timeObj = {"timea" : diff1, "timeb" : diff2}; 
    console.log(timeObj);

    return timeObj;
}

startServer();

function getDay(today, stop, stopName) {
    var day = today.getDay(); 

    // need to account to not display on sunday
    if (stopName == "Aidekmann" || stopName == "SMFA") {
        if (day == 6) return stop.times_sat;
        else return stop.times_monfri;
    }

    if (day == 1 || day == 2 || day == 3) {
        return stop.times_monwed;
    } else if (day == 4) {
        return stop.times_thurs;
    } else if (day == 5) {
        return stop.times_fri;
    } else if (day == 6) {
        return stop.times_sat;
    }
}

app.get('/CC_P_Row', async function(req, res) {
    var stop = (req.path).substring(1);
    var timeObj = await getTime(stop);
    res.json(timeObj);
})

app.get('/Davis', async function(req, res) {
    var stop = (req.path).substring(1);
    var timeObj = await getTime(stop);
    res.json(timeObj);
})

app.get('/CC_Talbot', async function(req, res) {
    var stop = (req.path).substring(1);
    var timeObj = await getTime(stop);
    res.json(timeObj);
})

app.get('/Carm', async function(req, res) {
    var stop = (req.path).substring(1);
    var timeObj = await getTime(stop);
    res.json(timeObj);
})

app.get('/Olin', async function(req, res) {
    var stop = (req.path).substring(1);
    var timeObj = await getTime(stop);
    res.json(timeObj);
})

app.get('/SMFA', async function(req, res) {
    var stop = (req.path).substring(1);
    var timeObj = await getTime(stop);
    res.json(timeObj);
})

app.get('/Aidekmann', async function(req, res) {
    var stop = (req.path).substring(1);
    var timeObj = await getTime(stop);
    res.json(timeObj);
})