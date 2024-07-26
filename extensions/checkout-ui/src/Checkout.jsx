import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  Text,
  useApplyAttributeChange,
  useAppMetafields,
  useSubtotalAmount,
  useAttributeValues
} from "@shopify/ui-extensions-react/checkout";
import React, { useState } from 'react';

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const applyAttributeChange = useApplyAttributeChange();
  const subtoTalAmount = useSubtotalAmount().amount;

  console.log("subtoTalAmount: ", subtoTalAmount);

  const attributeValues = useAttributeValues([
    'requestedCustomDiscount'  
  ]);

  let checked = false;
  if (attributeValues.length > 0) {
    checked = attributeValues[0] === 'yes';
  }
  console.log("checked: ", checked);

  console.log("attributeValues: ", attributeValues);

  const discountsMetafield = useAppMetafields({
    type: 'customer',
    namespace: 'custom',
    key: 'discounts'
  });

  let discountPercent = 0;
  if (discountsMetafield.length > 0) {
    discountPercent = discountsMetafield[0].metafield.value;
    console.log('discountPercent: ', discountPercent);
    // applyDiscount(discountPercent);
  }

  // 3. Render a UI
  return (
    <BlockStack border={"dotted"} padding={"tight"}>
      <Banner title="Checkout Discount">
        {<Text>{`You have custom discount of ${discountPercent}%`}</Text>}
      </Banner>
      <Checkbox onChange={onCheckboxChange} checked={checked}>
        {<Text>{`I would like to recieve the discount`}</Text>}
      </Checkbox>
    </BlockStack>
  );

  async function onCheckboxChange(isChecked) {
    console.log("Checkbox checked:", isChecked);
    const result = await applyAttributeChange({
      key: "requestedCustomDiscount",
      type: "updateAttribute",
      value: isChecked ? "yes" : "no",
    });
    console.log("applyAttributeChange result", result);
  }
}