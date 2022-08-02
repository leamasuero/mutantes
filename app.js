let express = require('express');
require('dotenv').config()
let port = process.env.PORT || 3000
let mutanteService = require("./services");
let bodyParser = require('body-parser')
const {MongoClient, ServerApiVersion} = require('mongodb');

let app = express();
app.use(bodyParser.json())


let adn = [
    ['A', 'T', 'G', 'C', 'G', 'A'],
    ['C', 'A', 'G', 'T', 'G', 'C'],
    ['T', 'T', 'A', 'T', 'G', 'T'],
    ['A', 'G', 'A', 'A', 'G', 'G'],
    ['T', 'C', 'C', 'C', 'C', 'A'],
    ['T', 'C', 'A', 'C', 'T', 'G'],
];

app.get('/', function (req, res) {

    const uri = "mongodb+srv://sanbox:tPGbHzCbFX5wiwpv@clusterdb.opzvo.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    });
    client.connect(err => {
        const collection = client.db("mutantes").collection("stats");
        console.log(collection)
        const result = collection.insertOne({count_mutant_dna: 3})
        console.log(result)
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        // perform actions on the collection object
        client.close();
    });

    res.send(`${result.insertedId}`)
})


app.post('/mutant', function (req, res) {

    console.log(req.body.dna);

    adn = []
    req.body.dna.forEach(function (secuencia) {
        adn.push([...secuencia])
    })
    console.log(adn)


    if (mutanteService.isMutante(adn, req.query.umbralMutante ?? 4)) {
        res.status(200).send()
    }

    res.status(403).send()
});

app.listen(port);


// console.log(row.join('').includes('CCCC'));


// console.log(adnSecuencia(adn.at(4)));


// console.log(adn)


// console.log(adnSecuencia(adn.at(4)));


