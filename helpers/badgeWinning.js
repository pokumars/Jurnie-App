/* eslint-disable import/prefer-default-export */
// gets the badge image urls from firebase storage
const badgeIconURLs = {
  trophy:
    'https://firebasestorage.googleapis.com/v0/b/journeyapplicatio.appspot.com/o/badges%2Fbadge-trophy.png?alt=media&token=a01cd3f1-5601-477c-bc1d-aada300dd0b6',
  camera:
    'https://firebasestorage.googleapis.com/v0/b/journeyapplicatio.appspot.com/o/badges%2Fbadge-camera.png?alt=media&token=8ec37d50-0e74-4936-9310-3ceea98c639a',
  target:
    'https://firebasestorage.googleapis.com/v0/b/journeyapplicatio.appspot.com/o/badges%2Fbadge-target.png?alt=media&token=37f37859-ed4e-4d47-8d17-ce43f550c11c',
  medal:
    'https://firebasestorage.googleapis.com/v0/b/journeyapplicatio.appspot.com/o/badges%2Fbadge-medal.png?alt=media&token=cd7a59b2-3aed-4360-92e3-f5cc42af7290',
};

// feedbackAmountMilestones - we are using named tuple3 here. Javascript doesnt have tuples so you can mock or mimic tuples with arrays or objects
// for more info on tuple https://www.tutorialspoint.com/scala_collections/scala_collections_tuple.htm
// or https://medium.com/better-programming/tuples-in-javascript-57ede9b1c9d2
export const feedbackAmountMilestones = [
  {
    score: 1,
    badgeImage: badgeIconURLs.trophy,
    text: 'your 1st feedback milestone badge', // congratulatory text
    name: '1st feedback',
  },
  {
    score: 5,
    badgeImage: badgeIconURLs.trophy,
    text: 'a badge for your 5th feedback', // congratulatory text
    name: '5 feedbacks',
  },
  {
    score: 10,
    badgeImage: badgeIconURLs.trophy,
    text: 'a badge for your 10th feedback', // congratulatory text
    name: '10 feedbacks',
  },
  {
    score: 20,
    badgeImage: badgeIconURLs.trophy,
    text: 'a badge for your 20th feedback', // congratulatory text
    name: '20 feedbacks',
  },
  {
    score: 50,
    badgeImage: badgeIconURLs.trophy,
    text: 'a badge for your 50th feedback', // congratulatory text
    name: '50 feedbacks',
  },
  {
    score: 100,
    badgeImage: badgeIconURLs.trophy,
    text: 'a badge for your 100th feedback', // congratulatory text
    name: '100 feedbacks',
  },
];
