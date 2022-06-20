const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');
const { readFileSync } = require('fs');
const { produtos, categorias } = require('./produtos_db');

const porta = 4001;


const typeDefs = gql(readFileSync('produtos.graphql', {encoding: 'UTF-8'}));

const resolvers= {
    Query: {
        produtos: () => {
            return produtos;
        },
        produto: (parent, args, context) => {
            const produto = produtos.find(p => args.id === p.id);

            if(!produto) return null;
            else return produto; 
        },
        categorias: () => {
            return categorias;
        },
        categoria: (parent, args, context) => {
            const categoria = categorias.find(c => args.id === c.id);

            if(!categoria) return null;
            else return categoria;
        }
    },
    Produto: {
        categoria: (parent, args, context) => {
            const categoria = categorias.find(c => c.id === parent.categoriaId);
            if(!categoria) return null;
            else return categoria;
        }
    },
    Categoria: {
        produtos: (parent, args, context) => {
            return produtos.filter(p => p.categoriaId === parent.id);
        }
    }
}

const servidor = new ApolloServer({schema: buildFederatedSchema({typeDefs, resolvers})});

servidor.listen({port: porta}).then(({url}) => {
    console.log("Pronto em: " + url);
}).catch(err => {console.log(err)});