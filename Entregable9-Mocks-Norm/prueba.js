const {schema, normalize, denormalize} = require('normalizr')
// Example data response
const data = { users: [{ id: '123', name: 'Beth' }] };

const user = new schema.Entity('users');
const responseSchema = new schema.Object({ users: new schema.Array(user) });
// or shorthand
//const responseSchema = { users: new schema.Array(user) };

const normalizedData = normalize(data, responseSchema);

console.log(normalizedData);