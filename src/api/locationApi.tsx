import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

//List location saved to db;
export const listLocations = async ()=> {
    const { data: locations, errors } = await client.models.UserLocations.list();
    if (errors) {
        console.error(errors);
        throw new Error('Failed to fetch locations for user');
    }
    console.log('List locations',locations)
    return locations;
};
//
// export const listUserLocations = async (userId: string)=> {
//     const { data: locations, errors } = await client.models.UserLocations.listUserLocationsByUserId(
//         { userId: userId },
//         { selectionSet: ['id','name','longitude', 'latitude', 'userRel.*'] },
//     );
//     if (errors) {
//         console.error(errors);
//         throw new Error('Failed to fetch locations for user');
//     }
//     console.log('List locations',locations)
//     return locations;
// };