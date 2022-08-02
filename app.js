let express = require('express');
require('dotenv').config()
let port = process.env.PORT || 3000
let mutanteService = require("./services");
let bodyParser = require('body-parser')

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


app.post('/mutant', function (req, res) {

    console.log(req.body.dna);

    adn = []
    req.body.dna.forEach(function (secuencia) {
        adn.push([...secuencia])
    })
    console.log(adn)

    res.send(mutanteService.isMutante(adn, req.query.umbralMutante ?? 4));
});

app.listen(port);


// console.log(row.join('').includes('CCCC'));


// console.log(adnSecuencia(adn.at(4)));


// console.log(adn)


// console.log(adnSecuencia(adn.at(4)));

