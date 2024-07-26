# Functionality of `cart-checkout-validation` function

## Overview
This function validates a cart to ensure it meets specific criteria related to a custom discount before proceeding to checkout.

### Functionality
- **Checks for Metafield:** Determines if the buyer has a specific metafield associated with a custom discount. If not, the validation passes.
- **Checks Discount Request:** Verifies if the customer has requested the custom discount by checking the `requestedCustomDiscount` attribute. If not, the validation passes.
- **Validates Cart Total:** If both the metafield and discount request conditions are met, calculates the cart total for products belonging to a specific collection. If the total is less than 100, an error is thrown to prevent checkout.

### Additional Considerations:
- **Error Handling:** Implementing error handling for cases where metafield data is missing.

### Example input of this function:
```json
{
  "cart": {
    "cost": {
      "subtotalAmount": {
        "amount": "885.95"
      },
      "totalAmount": {
        "amount": "916.95",
        "currencyCode": "BDT"
      },
      "totalDutyAmount": {
        "amount": "0.0"
      },
      "totalTaxAmount": {
        "amount": "119.6"
      }
    },
    "attribute": {
      "key": "requestedCustomDiscount",
      "value": "yes"
    },
    "buyerIdentity": {
      "customer": {
        "id": "gid://shopify/Customer/7940215800112",
        "metafield": {
          "type": "number_decimal",
          "value": "10.0"
        }
      }
    },
    "lines": [
      {
        "id": "gid://shopify/CartLine/0",
        "quantity": 1,
        "merchandise": {
          "id": "gid://shopify/ProductVariant/48825753010480",
          "product": {
            "inCollections": [
              {
                "collectionId": "gid://shopify/Collection/477085073712",
                "isMember": true
              }
            ]
          }
        }
      }
    ]
  }
}
```

### Example output of this function:
```json
{
  "errors": [
    {
      "localizedMessage": "Discount cannot be applied to orders less than 100 BDT",
      "target": "cart"
    }
  ]
}
```