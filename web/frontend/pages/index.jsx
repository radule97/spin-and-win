import {
  Card,
  Button,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
  IndexTable,
  LegacyCard,
  Badge
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import { trophyImage } from "../assets";

export default function HomePage() {
  const { t } = useTranslation();

  const orders = [
    {
      id: '1020',
      order: '#1020',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1019',
      order: '#1019',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1018',
      order: '#1018',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
  ];
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const rowMarkup = orders.map(
      (
          {id, order, date, customer, total, paymentStatus, fulfillmentStatus},
          index,
      ) => (
          <IndexTable.Row
              id={id}
              key={id}
              position={index}
          >
            <IndexTable.Cell>
              <Text variant="bodyMd" fontWeight="bold" as="span">
                {order}
              </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>{date}</IndexTable.Cell>
            <IndexTable.Cell>{customer}</IndexTable.Cell>
            <IndexTable.Cell>{total}</IndexTable.Cell>
            <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
            <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
          </IndexTable.Row>
      ),
  );

  return (
    <Page fullWidth>
      <TitleBar title={t("HomePage.title")}  primaryAction={{
        content: t("CreateReward.primaryAction"),
        onAction: () => console.log("Primary action"),
      }} />
      <Layout>
        <Layout.Section>
          <LegacyCard>
            <IndexTable
                itemCount={orders.length}
                headings={[
                  {title: 'Reward'},
                  {title: 'Date'},
                  {title: 'Type'},
                  {title: 'Total'},
                  {title: 'Payment status'},
                  {title: 'Fulfillment status'},
                ]}
            >
              {rowMarkup}
            </IndexTable>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
