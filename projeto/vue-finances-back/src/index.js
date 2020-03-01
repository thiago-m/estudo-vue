const { GraphQLServer } = require('graphql-yoga')
const Binding = require('prisma-binding')
const { prisma } = require('./generated/prisma-client')

const resolvers = require('./resolvers')

const server = new GraphQLServer({
    typeDefs: `${__dirname}/schema.graphql`,
    resolvers,
    context: request => ({
        ...request,
        db: new Binding.Prisma({
            typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
            endpoint: 'http://192.168.99.100:4466/'
        }),
        prisma
    })
})

server.start().then( () => console.log(`Server running on http://localhost:4000... `) )