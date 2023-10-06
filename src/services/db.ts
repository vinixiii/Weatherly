import firestore from '@react-native-firebase/firestore';

const db = {
  cities: firestore().collection('cities'),
};

export default db;
