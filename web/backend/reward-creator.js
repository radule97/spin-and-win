import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";

/*################
mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
  discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
    codeDiscountNode {
      # DiscountCodeNode fields
    }
    userErrors {
      field
      message
    }
  }
}

Confirmed
mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
  discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
    codeDiscountNode {
      id
    }
    userErrors {
      field
      message
    }
  }
}

#################*/
const CREATE_BASIC_DISCOUNT_CODE_MUTATION = `
mutation discountCodeAppCreate($codeAppDiscount: DiscountCodeAppInput!) {
  discountCodeAppCreate(codeAppDiscount: $codeAppDiscount) {
    codeAppDiscount {
      discountId
      title
      appDiscountType {
        description
        functionId
      }
      combinesWith {
        orderDiscounts
        productDiscounts
        shippingDiscounts
      }
      codes(first: 100) {
        nodes {
          code
        }
      }
      status
      usageLimit
    }
    userErrors {
      field
      message
    }
  }
}
`;

export default async function rewardCreator(session, body = {}) {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    const response = await client.query({
      data: {
        query: CREATE_BASIC_DISCOUNT_CODE_MUTATION,
        variables: {
          "codeAppDiscount": {
            "code": "APP_DISCOUNT_2",
            "title": "Take 5$ from order discount",
            "functionId": "01G6M10DHVKQGAR0VZMD4D3V78",
            "appliesOncePerCustomer": true,
            "combinesWith": {
              "orderDiscounts": true,
              "productDiscounts": true,
              "shippingDiscounts": true
            },
            "startsAt": "2021-02-02T17:09:21Z",
            "endsAt": "2024-02-02T17:09:21Z",
            "usageLimit": 1,
            "metafields": [
              {
                "namespace": "default",
                "key": "function-configuration",
                "type": "json",
                "value": "{\"discounts\":[{\"value\":{\"fixedAmount\":{\"amount\":5}},\"targets\":[{\"orderSubtotal\":{\"excludedVariantIds\":[]}}]}],\"discountApplicationStrategy\":\"FIRST\"}"
              }
            ]
          }
        },
      },
    });
    console.log(JSON.stringify(response, null, 2));
    return response;

  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}
