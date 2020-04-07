var express = require('express');
var cors = require('cors')
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var fetch = require('node-fetch')


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    hello2: String
    getMissions: [ Mission ]
  }

  type SpecDetail {
    iconImage: String
    title: String
    description: String
    bodyImage: String
    color: String
  }

  type SpecEntries {
    category: String
    specEntries: [ SpecDetail ]
  }

  type Mission {
      missionId: String
      specificationsT: [ SpecEntries ]
      
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: async () => {
        return "hello James"

    },
    hello2: async () => {
        let r = await fetch('http://localhost:8090/hello').then(r => { return r.json() })
        return r
    },
    getMissions: async () => {
        let r = await fetch('http://localhost:8090/retrieveMissions')
            .then(r =>  r.json() )
  
            .catch(err => console.log("err--->", err) )

        console.log("r--->", r )
        
        return r
    }   
};

var app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4400);
console.log('Running a GraphQL API server at http://localhost:4400/graphql');