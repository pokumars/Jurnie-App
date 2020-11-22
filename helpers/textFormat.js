export const tabBarImageNameFormat = (tabName, focused) => {
  if (typeof tabName !== 'string' && typeof focused !== 'boolean') {
    return '';
  }

  const joinedName = tabName.replace(' ', '');
  const lowercaseFirstLetterName = joinedName.charAt(0).toLowerCase() + joinedName.slice(1);

  const result = focused ? `${lowercaseFirstLetterName}Active` : lowercaseFirstLetterName;
  return result;
};

export const formatScore = (input) => {
  if (typeof input !== 'number') return '';

  const stringInput = input.toString();
  const result = stringInput.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // If the number of digits in a number are more than 3, for every 3 digits, add a dot
  return result;
};
