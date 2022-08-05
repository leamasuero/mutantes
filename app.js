let express = require('express');
require('dotenv').config()
let port = process.env.PORT || 3000
let {mutanteService, db} = require("./services");
let bodyParser = require('body-parser')
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

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


app.get('/', async function (req, res) {

    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    });

    const stats = client.db("adn").collection("humanos");

    const document = await stats.find({}).toArray()
    console.log(document)

})


app.post('/mutant', function (req, res) {

    console.log(req.body.dna);

    adn = []
    req.body.dna.forEach(function (secuencia) {
        adn.push([...secuencia])
    })

    console.log(adn)


    if (mutanteService.isMutante(adn, req.query.umbralMutante ?? 4)) {
        db.persist('mutantes', adn)
        res.status(200).send()
    }

    db.persist('humanos', adn)
    res.status(403).send()
});

app.listen(port);


// console.log(row.join('').includes('CCCC'));


// console.log(adnSecuencia(adn.at(4)));


// console.log(adn)


// console.log(adnSecuencia(adn.at(4)));


