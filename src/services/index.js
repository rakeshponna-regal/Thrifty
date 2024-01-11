import * as realm from './realm'
import * as asyncStorage from './asyncStorage'
import 'react-native-get-random-values'

export default {
  ...realm,
  ...asyncStorage
}