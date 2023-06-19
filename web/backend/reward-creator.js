import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";

const CREATE_BASIC_DISCOUNT_CODE_MUTATION = `
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
`;

export const DEFAULT_PRODUCTS_COUNT = 5;
const CREATE_PRODUCTS_MUTATION = `
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
      }
    }
  }
`;

export default async function rewardCreator(session, body = {}) {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    /*
    items: {
                products: {
                  productsToAdd: body.products
                }
              },
    * */
    const createdDiscountResponse = await client.query({
      data: {
        query: CREATE_BASIC_DISCOUNT_CODE_MUTATION,
        variables: {
          basicCodeDiscount: {
            appliesOncePerCustomer: true,
            code: `${body.discount_code}`,
            customerGets: {
              value: {
                percentage: body.percentage
              }
            },
            customerSelection: {
              all: true,
            },
            startsAt: "2022-04-18T02:38:45Z",
            title: `${body.discount_code}`
          },
        },
      },
    });

    if(createdDiscountResponse.body.data.discountCodeBasicCreate.codeDiscountNode && createdDiscountResponse.body.data.discountCodeBasicCreate.codeDiscountNode.id){
      body.discountCodeId = createdDiscountResponse.body.data.discountCodeBasicCreate.codeDiscountNode.id;
      const discountCodeData = await getDiscount(session, body);
      if(discountCodeData.body.data.codeDiscountNode.id){
        body.metafield_value = discountCodeData.body.data.codeDiscountNode;
        return await createMetaFieldsDiscounts(session, body);
      }
    }
  } catch (error) {
    throw new Error(`${error.message}\n${JSON.stringify(error.response, null, 2)}`);
  }
}
