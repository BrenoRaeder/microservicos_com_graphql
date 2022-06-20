const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const { readFileSync } = require('fs');

const supergraphSdl = readFileSync("superGraph.graphql").toString();

const gateway = new ApolloGateway({
    supergraphSdl
});

const servidor = new ApolloServer({
    gateway
});

servidor.listen(3000).then(({url}) => {
    console.log("Gateway pronto em: " + url);
}).catch(err => {console.log(err)});