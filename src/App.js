

import React from 'react'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const HELLO2_QUERY = gql`
  {
    hello2
  }
`;

function App() {
  return (
    <Query query={HELLO2_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          
          let helloData = JSON.parse(data.hello2).data
          console.log("data--->", helloData, data.hello2)
          return (
            <div>{ helloData }</div>
          )
        }
    }
    </Query>
  )
  
}

export default App;
