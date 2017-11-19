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

const DietLabels = new GraphQLObjectType({
    name: 'DietLabels',
    description: '...',

    
})

const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    description: '...',
    
    fields: () => ({
        label: {
            type: GraphQLString,
            resolve: (data) => data.recipe.label
        },
        image: {
            type: GraphQLString,
            resolve: (data) => data.recipe.image
        },
        source: {
            type: GraphQLString,
            resolve: (data) => data.recipe.source
        },
        url: {
            type: GraphQLString,
            resolve: (data) => data.recipe.url
        },
        dietLabel: {
            type: new GraphQLList(GraphQLString)
            
        }
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',

        fields: () => ({
            recipe: {
                type: new GraphQLList(RecipeType),
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (root, args) => fetch(
                    `https://api.edamam.com/search?q=`+q+`&app_ID=`+ID)
                    .then((response) => {
                        return response.json();
                    }) 
                    .then ((responseData) => {
                        console.log(responseData.hits[1].recipe.dietLabels)
                        return responseData.hits;
                    })
            }
        })
    })
})