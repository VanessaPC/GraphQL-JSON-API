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
            resolve: () => 
                recipe.responseData.label
        },

       /* source: {
            type: GraphQLInt,
            resolve: () => { return recipe.source; }
        }*/
    })
})

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',

        fields: () => ({
            recipe: {
                type: RecipeType,
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (root, args) => fetch(
                    `https://api.edamam.com/search?q=`+q+`&app_ID=`+ID)
                    .then((response) => {
                        console.log('fetching-promise');
                       // response.json(data);
                        //console.log(response.json());
                        return response.json();
                    }) 
                    .then((responseData) => {
                        console.log('response.json-promise resolution');
                        console.log(responseData.hits[0], ' data here maybe?')
                        return responseData.hits[0];
                    })
            }
        })
    })
})