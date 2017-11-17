const fetch = require('node-fetch')

// I need a search word in order to search 
const q = 'chicken';

// my App ID 
const ID = '913bd957';

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql')


const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    description: '...',
    
    fields: () => ({
        label: {
            type: GraphQLString,
            resolve: (data) => 
                data.recipe.label
        },
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',

        fields: () => ({
            recipe: {
                type: GraphQLList(RecipeType),
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (root, args) => fetch(
                    `https://api.edamam.com/search?q=`+q+`&app_ID=`+ID)
                    .then((response) => {
                        return response.json();
                    }) 
                    .then((responseData) => {
                        //console.log(responseData.hits[0], ' data here maybe?')
                        for (var i = 0; i < responseData.hits.length; i++) {
                            console.log( responseData, responseData.hits[i])
                            return responseData.hits[i];
                        }
                    })
            }
        })
    })
})