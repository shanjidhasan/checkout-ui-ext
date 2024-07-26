// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  let applyDiscount = 0.0;
  if (input.cart.buyerIdentity.customer.metafield != null) {
    applyDiscount = input.cart.buyerIdentity.customer.metafield.value;
  }
  if (input.cart.attribute == null || input.cart.attribute.value == "no") {
    console.log("No attribute found in cart");
    return EMPTY_DISCOUNT;
  }

  console.log("input", JSON.stringify(input));
  let excludeVariantIds = [];
  for (const line of input.cart.lines) {
    console.log("line.merchandise.product.inCollections[0].isMember: ", line.merchandise.product.inCollections[0].isMember); 
    if (!line.merchandise.product.inCollections[0].isMember) {
      excludeVariantIds.push(line.merchandise.id);
    }
  }
  return {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [
      {
          message: "Discount applied",
          value: {
            percentage: {
              value: applyDiscount,
            }
          },
          targets: [
            {
              orderSubtotal: {
                excludedVariantIds: excludeVariantIds,
              }
            }
          ]
      }
    ],
  };
}