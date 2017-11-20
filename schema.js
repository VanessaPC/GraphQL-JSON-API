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


const Ingredients = new GraphQLObjectType({
    name: 'Ingredients',
    description: '...',

    fields: () => ({
        item: {
            type: GraphQLString,
            resolve: (data.recipe.ingredients) => 
        }
    })
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
            type: new GraphQLList(GraphQLString),
            resolve: (data) => data.recipe.dietLabels
        },
        healthLabels: {
            type: new GraphQLList(GraphQLString),
            resolve: (data) => data.recipe.healthLabels
        },
        ingredientLines: {
            type: new GraphQLList(GraphQLString),
            resolve: (data) => data.recipe.ingredientLines
        },
        ingredients: {
            type: new GraphQLList(Ingredients),
            resolve: (data) => data.recipe.ingredients
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
                        console.log(responseData.hits)
                        return responseData.hits;
                    })
            }
        })
    })
})