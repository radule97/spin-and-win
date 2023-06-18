import { Card, Page, Layout, TextContainer, Text, Form, TextField, DatePicker, Select } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import React, { useState } from 'react';

export default function CreateReward() {
  const { t } = useTranslation();
  const [type, setType] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [resourceName, setResourceName] = useState('');
  const [percentageOfLuck, setPercentageOfLuck] = useState('');
  const [requiredSpend, setRequiredSpend] = useState('');

  const handleTypeChange = (value) => setType(value);
  const handleResourceIdChange = (value) => setResourceId(value);
  const handleResourceNameChange = (value) => setResourceName(value);
  const handlePercentageOfLuckChange = (value) => setPercentageOfLuck(value);
  const handleRequiredSpendChange = (value) => setRequiredSpend(value);


  return (
    <Page fullWidth>
      <TitleBar
        title={t("CreateReward.title")}
        primaryAction={{
          content: t("CreateReward.primaryAction"),
          onAction: () => console.log("Primary action"),
        }}
        secondaryActions={[
          {
            content: t("CreateReward.secondaryAction"),
            onAction: () => console.log("Secondary action"),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Form>
              <Select label="Type" options={['Discount', 'Free Gift', 'Gift Card']} onChange={handleTypeChange} value={type} />
              <TextField label="Resource ID" value={resourceId} onChange={handleResourceIdChange} />
              <TextField label="Resource Name" value={resourceName} onChange={handleResourceNameChange} />
              <TextField type="number" label="Percentage of Luck" value={percentageOfLuck} onChange={handlePercentageOfLuckChange} />
              <TextField type="number" label="Required Spend in $" value={requiredSpend} onChange={handleRequiredSpendChange} />
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
