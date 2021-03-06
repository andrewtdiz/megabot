import client from '../client';

/**
 * Parses message content for commands and arguments
 * @returns {Object.<string, (string | Array.<string>)>} - an object with the subCommand and arguments
 */
export function parseCommandString() {
  const messageArray = client.message.content.split(' ');
  return { arguments: messageArray.slice(2), subCommand: messageArray[1] };
}

/**
 * Splits up an array into multiple arrays based on a condition
 * @param {Array.<any>} array - array to be partitioned
 * @param {boolean} isValid - the condition to partition on
 */
export function partition(array, isValid) {
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
}
