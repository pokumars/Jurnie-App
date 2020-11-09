const tabBarImageNameFormat = (tabName, focused) => {
  if (typeof tabName !== 'string' && typeof focused !== 'boolean') return '';
  
  const joinedName = tabName.replace(' ', '');
  const lowercaseFirstLetterName = joinedName.charAt(0).toLowerCase() + joinedName.slice(1);

  const result = focused ? `${lowercaseFirstLetterName}Active` : lowercaseFirstLetterName;
  return result;
}

export {
  tabBarImageNameFormat
}