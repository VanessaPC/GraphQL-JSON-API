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
    GraphQLList,
    GraphQLFloat
} = require('graphql')


/*const TotalNutrients = new GraphQLObjectType({
    name: 'TotalNutrients',
    description: '...', 

    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: (data) => data.GraphQLString
        }
        quantity: {
            type: new GraphQLList(Nutrients),
            resolve: (data) => data
        }
    })
})*/

const Ingredients = new GraphQLObjectType({
    name: 'Ingredients',
    description: '...',

    fields: () => ({
        text: {
            type: GraphQLString,
            resolve: (data) => data.text
        },
        quantity: {
            type: GraphQLFloat,
            resolve: (data) => data.quantity
        },
        measure: {
            type: GraphQLString,
            resolve: (data) => data.measure
        },
        food: {
            type: GraphQLString,
            resolve: (data) => data.food
        },
        weight: {
            type: GraphQLFloat,
            resolve: (data) => data.weight
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
        shareAs: {
            type: GraphQLString,
            resolve: (data) => data.recipe.shareAs
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
            
        },
        calories: {
            type: GraphQLString,
            resolve: (data) => data.recipe.calories
        },
        totalWeight: {
            type: GraphQLFloat,
            resolve: (data) => data.recipe.totalWeight
        }/*
        totalNutrients: {
            type: new GraphQLList(TotalNutrients),
            resolve: (data) => data.recipe.totalNutrients
        }*/
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
                        //console.log(responseData.hits[0].recipe.totalNutrients)
                        console.log(responseData.hits[0].recipe)
                        return responseData.hits;
                    })
            }
        })
    })
})