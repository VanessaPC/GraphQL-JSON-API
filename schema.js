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

/*fetch(
    'https://api.edamam.com/search?q='+ q + '&app_ID=' + ID 
).then(response => response.json())*/


const RecipeType = new GraphQLObjectType({
    name: 'Ingredients',
    description: '...',

    fields: () => {
        url: {
            type: GraphQLString
            /*resolve: (argument) => {
                console.log(argument)
                return this.argument;
            }*/
        }

        //calories: {
          //  type: GraphQLInt
           /* resolve: (argument) => {
                return this.argument;
            }*/
        //}
    }
})

module.export = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',

        fields: () => {
            recipe: {
                type: RecipeType
                args: {
                   url: { type: graphQLString }
                }
            }
        }
    })
})