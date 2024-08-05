import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
    Todo: a
        .model({
            content: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),

    Property: a
        .model({
            id: a.id(),
            title: a.string(),
            slug: a.string(),
            valuation: a.float(),
            min: a.float(),
            max: a.float(),
            description: a.string(),
            address: a.string(),
            town: a.string(),
            city: a.string(),
            county: a.string(),
            postcode: a.string(),
            condition: a.string(),
            country: a.string(),
            bedrooms: a.integer(),
            bathrooms: a.integer(),
            garages: a.integer(),
            area_size: a.integer(),
            year_built: a.integer(),
            views: a.integer(),
            is_featured: a.boolean(),
            is_published: a.boolean(),
            is_sold: a.boolean(),
            is_yeoley_plus: a.boolean(),
            user_id: a.id(),  // Assuming `a.id()` is a valid type definition in your library
            type: a.string(),
            longitude: a.float(),
            latitude: a.float(),
            valuation_type: a.string(),
            prefix: a.string(),
            tenure: a.string(),
            current_epc_rating: a.string(),
            potential_epc_rating: a.string(),
            epc_date: a.string(),
            layout: a.string(),
            content: a.string(),
        })
        .authorization((allow) => [allow.publicApiKey()]),

    Favourites: a.model({
        id: a.id(),
        userId: a.string(),  // Cognito user ID
        propertyId: a.id(),  // Foreign key to Property
    })
    .secondaryIndexes((index) => [
        index("userId"),
        index("propertyId")
    ])
    .authorization((allow) => [allow.publicApiKey()]),
});
export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});



/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
