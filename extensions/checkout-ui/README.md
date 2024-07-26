# Functionality of `checkout-ui` extension

## Overview
This checkout UI extension displays a custom discount option to customers based on their existing metafield data. Customers can apply a discount by checking a box.

### Functionality
- **Checks for Metafield:** Determines if the buyer has a specific metafield associated with a custom discount. If not, the discount option is hidden.
- **Displays Discount Option:** If the metafield exists, a checkbox is displayed allowing the customer to apply the discount.
- **Handles Checkbox Interaction:**
  - When the checkbox is checked, the `requestedCustomDiscount` attribute is set to `yes`.
  - When the checkbox is unchecked, the `requestedCustomDiscount` attribute is set to `no`.
  - In both cases, a custom web pixel event named `customDiscountEvent` is emitted.

### Additional Considerations:
- **Discount Logic:** The actual discount application and calculation is handled by `order-discount` function triggered by change of `requestedCustomDiscount` attribute value.
- **Error Handling:** Implementing error handling for cases where metafield data is missing.