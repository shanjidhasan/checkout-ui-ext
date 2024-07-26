# Functionality of `order-discount` function

## Overview
This function calculates and applies a custom discount to eligible products in an order based on a customer's metafield and a specified product collection.

### Functionality
- **Checks for Metafield:** Verifies if the buyer has a specific metafield associated with a custom discount. If not, returns a discount of 0.
- **Checks Discount Request:** Determines if the customer has requested the discount by checking the value of the `requestedCustomDiscount` attribute. If not, returns a discount of 0.
- **Applies Discount:** Iterates through the order lines, applying the custom discount to products that belong to the `Custom Discount` collection.

### Additional Considerations:
- **Error Handling:** Implementing error handling for cases where metafield data is missing.

### Example input of this function:
```json
{
  "cart": {
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
        "quantity": 2,
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
  "discountApplicationStrategy": "FIRST",
  "discounts": [
    {
      "message": "Discount applied",
      "value": {
        "percentage": {
          "value": "10.0"
        }
      },
      "targets": [
        {
          "orderSubtotal": {
            "excludedVariantIds": []
          }
        }
      ]
    }
  ]
}
```