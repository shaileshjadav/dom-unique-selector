/**
 * Expose `unique`
 */

import { getID } from './getID';
import { getClassSelectors } from './getClasses';
import { getCombinations } from './getCombinations';
import { getAttributes } from './getAttributes';
import { getNthChild } from './getNthChild';
import { getTag } from './getTag';
import { isUnique } from './isUnique';
import { getParents } from './getParents';


/**
 * Returns all the selectors of the elmenet
 * @param  { Object } element
 * @return { Object }
 */
function getAllSelectors( el, selectors, attributesToIgnore )
{
  const funcs =
    {
      'Tag'        : getTag,
      'NthChild'   : getNthChild,
      'Attributes' : elem => getAttributes( elem, attributesToIgnore ),
      'Class'      : getClassSelectors,
      'ID'         : getID,
    };

  return selectors.reduce( ( res, next ) =>
  {
    res[ next ] = funcs[ next ]( el );
    return res;
  }, {} );
}

/**
 * Tests uniqueNess of the element inside its parent
 * @param  { Object } element
 * @param { String } Selectors
 * @return { Boolean }
 */
function testUniqueness( element, selector )
{
  const { parentNode } = element;
  const elements = parentNode.querySelectorAll( selector );
  return elements.length === 1 && elements[ 0 ] === element;
}

/**
 * Tests all selectors for uniqueness and returns the first unique selector.
 * @param  { Object } element
 * @param  { Array } selectors
 * @return { String }
 */
function getFirstUnique( element, selectors )
{
    return selectors.find( testUniqueness.bind( null, element ) );
}

/**
 * Checks all the possible selectors of an element to find one unique and return it
 * @param  { Object } element
 * @param  { Array } items
 * @param  { String } tag
 * @return { String }
 */
function getUniqueCombination( element, items, tag )
{
  let combinations = getCombinations( items, 3 ),
      firstUnique = getFirstUnique( element, combinations );

  if( Boolean( firstUnique ) )
  {
      return firstUnique;
  }

  if( Boolean( tag ) )
  {
      combinations = combinations.map( combination => tag + combination );
      firstUnique = getFirstUnique( element, combinations );

      if( Boolean( firstUnique ) )
      {
          return firstUnique;
      }
  }

  return null;
}

/**
 * Returns a uniqueSelector based on the passed options
 * @param  { DOM } element
 * @param  { Array } options
 * @return { String }
 */
// function getUniqueSelector( element, selectorTypes, attributesToIgnore, excludeRegex )
// {
//   let foundSelector;

//   const elementSelectors = getAllSelectors( element, selectorTypes, attributesToIgnore );

//   if( excludeRegex && excludeRegex instanceof RegExp )
//   {
//     elementSelectors.ID = excludeRegex.test( elementSelectors.ID ) ? null : elementSelectors.ID;
//     elementSelectors.Class = elementSelectors.Class.filter( className => !excludeRegex.test( className ) );
//   }

//   for( let selectorType of selectorTypes )
//   {
//       const { ID, Tag, Class : Classes, Attributes, NthChild } = elementSelectors;
//       switch ( selectorType )
//       {
//         case 'ID' :
//         if ( Boolean( ID ) && testUniqueness( element, ID ) )
//         {
//             return ID;
//         }
//         break;

//         case 'Tag':
//           if ( Boolean( Tag ) && testUniqueness( element, Tag ) )
//           {
//               return Tag;
//           }
//           break;

//         case 'Class':
//           if ( Boolean( Classes ) && Classes.length )
//           {
//             foundSelector = getUniqueCombination( element, Classes, Tag );
//             if (foundSelector) {
//               return foundSelector;
//             }
//           }
//           break;

//         case 'Attributes':
//           if ( Boolean( Attributes ) && Attributes.length )
//           {
//             foundSelector = getUniqueCombination( element, Attributes, Tag );
//             if ( foundSelector )
//             {
//               return foundSelector;
//             }
//           }
//           break;

//         case 'NthChild':
//           if ( Boolean( NthChild ) )
//           {
//             return NthChild
//           }
//       }
//   }
//   return '*';
// }

/**
 * Returns a selector for the container that will be used as the group context.
 * This can be customized – for example, using a unique ID, a class, or even a combination.
 *
 * @param {Element} element
 * @return {String}
 */
function getContainerSelector(element) {
  // For example, assume the immediate parent with a unique ID or a specific class.
  // Here we check for an ID first:
  if (element.parentNode && element.parentNode.id) {
    return `#${element.parentNode.id}`;
  }
  // If no ID, try a class (this is simplistic – in practice, you might need to be more robust)
  const selector = getUniqueSelector(element.parentNode, ['Class', 'Tag', 'NthChild'], ['id', 'class', 'length'], null);
  if (document.querySelectorAll(selector).length === 1) {
    console.log("parentSelector", selector);
    // Use the first class name; if multiple are present, adjust accordingly.
    // return `.${element.parentNode.classList[0]}`;
    return selector;
  }
  return getContainerSelector(element.parentNode);
  // Fallback to the parent tag name
  return element.parentNode ? element.parentNode.tagName.toLowerCase() : 'body';
}


/**
 * Returns a selector for the element.
 * When `group` is true, returns a less-specific selector
 * that can match a group of similar elements.
 *
 * @param {Element} element
 * @param {Array} selectorTypes
 * @param {Array} attributesToIgnore
 * @param {RegExp} excludeRegex
 * @param {Boolean} group - Whether to generate a group selector.
 * @return {String}
 */
function getUniqueSelector(element, selectorTypes, attributesToIgnore, excludeRegex, group = false) {
  let foundSelector;
  const elementSelectors = getAllSelectors(element, selectorTypes, attributesToIgnore);

  // Filter selectors based on excludeRegex if provided
  if (excludeRegex && excludeRegex instanceof RegExp) {
    elementSelectors.ID = excludeRegex.test(elementSelectors.ID) ? null : elementSelectors.ID;
    elementSelectors.Class = elementSelectors.Class.filter(className => !excludeRegex.test(className));
  }

  // When group mode is enabled, we want a selector that is less specific.
  // For example, we might prefer to ignore NthChild or IDs.
  for (let selectorType of selectorTypes) {
    // Destructure selectors
    const { ID, Tag, Class: Classes, Attributes, NthChild } = elementSelectors;

    switch (selectorType) {
      // case 'ID':
      //   if (!group && Boolean(ID) && testUniqueness(element, ID)) {
      //     return ID;
      //   }
      //   break;

      case 'Tag':
        // Even in group mode, tag names can be useful.
        // In unique mode we check uniqueness; in group mode we don't.
        if (Boolean(Tag) && (!group || testGroupMatch(element, Tag))) {
          return Tag;
        }
        break;

      case 'Class':
        if (Boolean(Classes) && Classes.length) {
          foundSelector = getUniqueCombination(element, Classes, Tag);
          if (foundSelector) {
            // In group mode, remove any :nth-of-type or overly specific parts.
            if (group) {
              foundSelector = relaxSelector(foundSelector);
            }
            return foundSelector;
          }
        }
        break;

      case 'Attributes':
        if (Boolean(Attributes) && Attributes.length) {
          foundSelector = getUniqueCombination(element, Attributes, Tag);
          if (foundSelector) {
            if (group) {
              foundSelector = relaxSelector(foundSelector);
            }
            return foundSelector;
          }
        }
        break;

      case 'NthChild':
        // For group mode, we typically want to omit nth-child since it selects a single element.
        if (!group && Boolean(NthChild)) {
          return NthChild;
        }
        break;
    }
  }
  return '*';
}

/**
 * Optional helper to check that a selector matches a group.
 * For example, this function might check that the selector returns more than one element.
 * Modify this as needed.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Boolean}
 */
function testGroupMatch(element, selector) {
  // For group selection, you might simply want the selector to match at least one element,
  // or if you know that it should match multiple elements in your DOM, test for that.
  // For simplicity, here we just test that it matches the element itself.
  try {
    const matches = element.parentNode.querySelectorAll(selector);
    return matches.length >= 1; // or set a minimum group size if desired.
  } catch (e) {
    return false;
  }
}

/**
 * Relax a selector string by removing overly specific parts like nth-of-type.
 *
 * @param {String} selector
 * @return {String}
 */
function relaxSelector(selector) {
  // Remove :nth-of-type(…) pseudo-classes
  return selector.replace(/:nth-of-type\(\d+\)/g, '');
}


/**
 * Generate unique CSS selector for given DOM element
 *
 * @param {Element} el
 * @return {String}
 * @api private
 */

export default function unique( el, options={} )
{
  const {
    selectorTypes = ['ID', 'Class', 'Tag', 'NthChild'],
    attributesToIgnore = ['id', 'class', 'length'],
    excludeRegex = null,
    group = false, 
  } = options;
  const allSelectors = [];
  const parents = getParents( el );

  for( let elem of parents )
  {
    const selector = getUniqueSelector( elem, selectorTypes, attributesToIgnore, excludeRegex, group );
    // Get a selector for the parent container
    const containerSelector = getContainerSelector(elem);

    console.log(`${containerSelector} ${selector}`);
    if(group) {
      return `${containerSelector} ${selector}`;
    }

    if( Boolean( selector ) )
    {
      allSelectors.push( selector );
    }
  }

  const selectors = [];
  for( let it of allSelectors )
  {
    selectors.unshift( it );
    const selector = selectors.join( ' > ' );
    if( isUnique( el, selector ) )
    {
      return selector;
    }
  }

  return null;
}
