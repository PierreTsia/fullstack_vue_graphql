<template>
  <v-container>
     <h1>Home</h1>
     <ApolloQuery :query="getPostsQuery">
       <template slot-scope="{ result: { data, loading, error  } }">
        <div v-if="loading"> loading... </div>
        <div v-if="error">
           Oups! Something got wrong
          <pre>{{ error }}</pre>
        </div>
         <ul v-if="data">
           <li v-for="post in data.getPosts" :key="post._id">
             {{ post.title }} | {{post.imageUrl}}
           </li>

         </ul>
       </template>

     </ApolloQuery>
  </v-container>
</template>

<script>
  import { gql } from "apollo-boost";

  export default {
    name: "home",
    data(){
      return {
        getPostsQuery: gql `
          query {
            getPosts {
              _id
              title
              imageUrl
              description
              likes
            }
          }
        `
      }
    },

  };
</script>
