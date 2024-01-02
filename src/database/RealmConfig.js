import Realm from 'realm';
import { thrifitiSchema } from './schemas/ThriftiSchema';
Realm.THROW_ON_GLOBAL_REALM = true;
// const realmSchema = new Realm({ path: 'UserDatabase.realm' ,schema: thrifitiSchema })
realmSchema = new Realm({
    path: 'UserDatabase.realm',
    schema: thrifitiSchema,
    schemaVersion: 2
  });

export default realmSchema;



