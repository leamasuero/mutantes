const {MongoClient, ServerApiVersion} = require("mongodb");

const mutanteService = {
    isMutante: function (adn, umbralMutante) {
        const self = this;
        let secuenciasMutantes = 0;

        // secuencias horizontales
        adn.forEach(function (secuencia) {
            if (self.secuenciaMutante(secuencia)) {
                secuenciasMutantes++
            }
        })

        // secuencias verticales
        for (let j = 0; j < adn.at(0).length; j++) {
            let secuencia = [];
            for (let i = 0; i < adn.length; i++) {
                secuencia.push(adn.at(i).at(j))
            }

            console.log(secuencia)
            if (self.secuenciaMutante(secuencia)) {
                secuenciasMutantes++
            }
        }


        console.log(secuenciasMutantes, umbralMutante)
        return secuenciasMutantes >= umbralMutante;
    },
    secuenciaMutante: function (secuencia) {

        let current = null;
        let ocurrencias = 1;
        let mutante = false;

        secuencia.forEach(function (letra) {

            if (current === null) {
                ocurrencias = 1;
                current = letra;
            } else {

                if (letra === current) {
                    ocurrencias++;
                } else {
                    current = letra;
                    ocurrencias = 1;
                }

            }
            // console.log("ocurrencias" + ocurrencias)
            if (ocurrencias === 4) {
                mutante = true;
            }

        });

        return mutante;
    }
}

const db = {

    persist: function (collection, adn) {

        const client = new MongoClient(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1
        });


        return client.db("adn").collection(collection).insertOne({adn: adn});
    }
}

module.exports = {
    db,
    mutanteService
}
