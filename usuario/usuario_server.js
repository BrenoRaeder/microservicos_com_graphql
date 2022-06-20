const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { readFileSync } = require('fs');
const { usuarios } = require('./usuario_db');

const porta = 4000;



const typeDefs = gql(readFileSync('usuario.graphql', {encoding: 'utf-8'}));

const resolvers = {
    Query:{
        usuarios: () => {
            return usuarios;
        },
        usuario: (parent, args, context) => {
            const usuarioId = args.id;
            const usuario = usuarios.find(u => u.id === usuarioId);

            if(!usuario) return null;
            else return usuario;
        }
    }
};

const servidor = new ApolloServer({ schema: buildFederatedSchema({ typeDefs, resolvers})});

servidor.listen( {port: porta} ).then(({url})=>{
    console.log('Pronto para acesso em: ' + url)
}).catch(err => {console.log(err)});
