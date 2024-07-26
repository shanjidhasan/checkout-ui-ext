// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api").Target} Target
* @typedef {import("../generated/api").ProductVariant} ProductVariant
*/

/**
* @type {FunctionRunResult}
*/
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {Input} input
 * @returns {Output}
 */
export function run(input) {
  const discountPercent = 10;

  const targets = input.cart.lines
    // Only include cart lines with a quantity of two or more
    .filter(line => line.quantity >= 2)
    .map(line => {
      const discountedAmount = line.cost.totalAmount.amount * (1 - discountPercent / 100);
      return /** @type {Target} */ ({
        // Use the cart line ID to create a discount target
        cartLine: {
          id: line.id,
          discountedAmount: discountedAmount.toFixed(2),
        }
      });
    });

  if (!targets.length) {
    // You can use STDERR for debug logs in your function
    console.error("No cart lines qualify for volume discount.");
    return EMPTY_DISCOUNT;
  }

  return {
    discounts: targets.map(target => ({
      message: "10% discount applied",
      targets: [target.cartLine],
      value: {
        percentage: discountPercent,
      },
    })),
  };
}
