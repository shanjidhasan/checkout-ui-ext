// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  let customDiscountApplied = false;
  if (input.cart.buyerIdentity.customer.metafield == null) {
    return {errors: []};
  }
  if (input.cart.attribute == null || input.cart.attribute.value == "no") {
    return {errors: []};
  }

  for (const line of input.cart.lines) {
    console.log("line.merchandise.product.inCollections[0].isMember: ", line.merchandise.product.inCollections[0].isMember); 
    if (line.merchandise.product.inCollections[0].isMember) {
      customDiscountApplied = true;
      break;
    }
  }
  if (customDiscountApplied) {
    if (input.cart.cost.totalAmount.amount < 1000) {
      return {
        errors: [
          {
            localizedMessage: `Discount cannot be applied to orders less than 100 ${input.cart.cost.totalAmount.currencyCode}`,
            target: "cart",
          },
        ],
      };
    } 
  }
};