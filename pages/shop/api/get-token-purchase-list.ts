import Purchases from 'react-native-purchases';

export default async function getOfferings() {
  const response = await Purchases.getOfferings();

  return response;
}
