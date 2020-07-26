import {getRandomNumberFloat, getRandomElementFromArray} from '../utils/common.js';

const commentsText = [
  `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the directors funniest and most exquisitely designed movies in years.`,
  `Andersons films are too precious for some, but for those of us willing to lose ourselves in them, theyre a delight. The Grand Budapest Hotel is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
  `I didnt find it amusing, and while I can appreciate the creativity, its an hour and 40 minutes I wish I could take back.`,
  `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`
];

const users = [
  `Джон`,
  `Майкл`,
  `Джексон`,
  `Андрей`
];

const generateComment = (index) => {
  return {
    id: index,
    user: getRandomElementFromArray(users),
    rating: getRandomNumberFloat(1, 10),
    comment: getRandomElementFromArray(commentsText),
    date: new Date()
  };
};

const generateComments = (commentsCount) => {
  return new Array(commentsCount)
    .fill(``)
    .map((item, index) => {
      return generateComment(index);
    });
};

export {generateComments};


