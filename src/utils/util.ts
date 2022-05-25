import { sample } from 'lodash';
import { AlphabetEnum } from '@utils/enum/alphabet.enum';
import { HttpException } from '@exceptions/HttpException';
import { Types } from 'mongoose';

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

/**
 * Verify whether a data is empty and throw an exception with 400 status code if true
 * @param data
 * @param conflict conflict mode throw a 409 exception if data is not empty
 */
export const checkEmpty = (data: any, conflict = false) => {
  const empty = isEmpty(data);
  if (empty) throw new HttpException(400, `Empty data given ${typeof data}`);
  else if (conflict && !empty) throw new HttpException(400, `Data given already exist ${typeof data}`);
};

/**
 * Verify whether a string is a valid ObjectId and throw an exception with 400 status code if false
 * @param id the id to check
 */
export const checkObjectId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new HttpException(400, 'Invalid userId given');
};

/**
 * Usernames can only have:
 *     - Lowercase Letters (a-z)
 *     - Numbers (0-9)
 *     - Dots (.)
 *     - Underscores (_)
 * @param username
 */
export const isUserNameValid = (username: string) => {
  const res = /^[a-z\d_.]+$/.exec(username);
  return !!res;
};
