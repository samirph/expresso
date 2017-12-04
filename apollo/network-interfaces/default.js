import { createNetworkInterface } from 'apollo-client'

export default (ctx) => {
  const networkInterface = createNetworkInterface({
    uri: 'http://127.0.0.1:3001/graphql'
  })
  // here you can place your middleware. ctx has the context forwarded from Nuxt

  // you can return the networkInterface directly or return an object with additional
  // apollo-client options
  // return networkInterface

  // alternative return a object with constructor options of apollo-client
  return {
    networkInterface,
    dataIdFromObject: o => o.id
  }
}
