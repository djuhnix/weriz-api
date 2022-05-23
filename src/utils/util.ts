import { sample } from 'lodash';
import { AlphabetEnum } from '@utils/enum/alphabet.enum';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else return value !== null && typeof value === 'object' && !Object.keys(value).length;
};

/**
 * Create a random word from a string
 * @param {String} base base string
 * @param {number} length the length of the new word
 */
export const generateCommunityCode = (base: string, length = 2): string => {
  const consonantsReg = new RegExp(`[${AlphabetEnum.CONSONANTS}]`, 'gi');
  const vowelsReg = new RegExp(`[${AlphabetEnum.VOWELS}]`, 'gi');
  let randomWord = '';

  const baseConsonants = base.match(consonantsReg);
  const baseVowels = base.match(vowelsReg);

  for (let i = 0; i < length; i++) {
    randomWord += sample(baseConsonants ? baseConsonants : AlphabetEnum.CONSONANTS) + sample(baseVowels ? baseVowels : AlphabetEnum.VOWELS);
  }

  return randomWord.toLowerCase();
};
