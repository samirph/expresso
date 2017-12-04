<template>
  <section class="container">
    <img src="~assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
    <ul class="users">
    </ul>
    <div>
    <h3>Home, sweet home.</h3>
    <div v-if="$store.state.isLogged" class="">
      <h4>Welcome, {{travel_agency_user.first_name}} from {{travel_agency_user.travel_agency.fantasy_name}}!</h4>
    </div>
    <div v-else class="">
      <h4>Login now!</h4>
      <router-link to="/login"><v-btn>Login</v-btn></router-link>
      <v-btn @click="sendWow">Send "Wow!" Message</v-btn>
    </div>
  </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'
// GraphQL query
const userQuery = gql`
  {
    travel_agency_user{
      first_name
      travel_agency{
        fantasy_name
      }
    }
  }`
export default {
  data: () => ({
    region: {},
    auth: null,
    travel_agency_user: {},
    text: 'Wow!',
    messages: []
  }),
  apollo: {
    travel_agency_user: {
      query: userQuery,
      fetchPolicy: 'network-only'
    }
  },
  created () {
    if (process.browser) {
      this.$cable.subscriptions.create({
        channel: 'ChatChannel',
        uuid: '4fa01964-ce10-4f0a-8a09-3ce8a6153e34'
      },
      {
        received (data) {
          console.log('received:')
          console.log(data)
        }
      })
    }
  },
  methods: {
    sendWow () {
      this.$apollo.mutate({
        mutation: gql`
        mutation{
            sendMessage(input: {text: "${this.text}"}){
              message{
                created_at
              }
            }
          }`,
        fetchPolicy: 'network-only'
      }).then(data => {
        console.log('then:')
        console.log(data.data.sendMessage.message)
      })
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
