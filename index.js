'use strict'

const {  graphql, buildSchema } = require('graphql');
const express  = require('express');
const gqlMiddleware = require('express-graphql');

const app = express();
const port = process.env.port ||  3000;

// definiendo el esquema inicial
/*
    hello : String le estamos indicando que va a devolver un string
*/
const schema = buildSchema(`
    type Query {
        hello : String ,
        saludo : String
    }
`)

// Configurar los resolvers
const resolvers = {
    hello: () => {
        return 'Hola mundo'
    },
    saludo: () => {
        return 'Hola a todos'
    }
}

app.use('/api', gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}));

// Ejecutar el query;
graphql(schema, '{saludo}', resolvers).then((data) => {
    console.log(data);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost ${port}/api`)
})