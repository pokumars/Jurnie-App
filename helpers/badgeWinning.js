import { determineBadgeIcon } from './determineAsset';

// feedbackAmountMilestones - we are using named tuple3 here. Javascript doesnt have tuples so you can mock or mimic tuples with arrays or objects
// for more info on tuple https://www.tutorialspoint.com/scala_collections/scala_collections_tuple.htm
// or https://medium.com/better-programming/tuples-in-javascript-57ede9b1c9d2
export const feedbackAmountMilestones = [
  {
    score: 1,
    badgeImage: determineBadgeIcon('trophy'),
    text: 'your 1st feedback milestone badge',
    name: 'firstbadge',
  },
  {
    score: 5,
    badgeImage: determineBadgeIcon('trophy'),
    text: 'a badge for your 5th feedback',
    name: 'good badge',
  },
  {
    score: 10,
    badgeImage: determineBadgeIcon('trophy'),
    text: 'a badge for your 10th feedback',
    name: 'super badge',
  },
  {
    score: 20,
    badgeImage: determineBadgeIcon('trophy'),
    text: 'a badge for your 20th feedback',
    name: 'woow badge',
  },
  {
    score: 50,
    badgeImage: determineBadgeIcon('trophy'),
    text: 'a badge for your 50th feedback',
    name: 'Superbe badge',
  },
  {
    score: 100,
    badgeImage: determineBadgeIcon('trophy'),
    text: 'a badge for your 100th feedback',
    name: 'Master badge',
  },
];
