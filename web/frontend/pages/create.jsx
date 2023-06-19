import { Card, Page, Layout, TextContainer, Text } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export default function PageName() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();

  const saveAction = async () => {
    const body_data = {
      percentage: 0.1,
      discount_code: 'TEST123'
    };
    console.log(body_data);
    const response = await fetch("/api/reward/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body_data)
    });
    if (response.ok) {
      const res_json = await response.json();
      console.log(res_json)
      navigate('/');
    } else {
      console.log('response not ok!');
    }
  }

  return (
    <Page>
      <TitleBar
        title={t("PageName.title")}
        primaryAction={{
          content: t("PageName.primaryAction"),
          onAction: () => saveAction(),
        }}
        secondaryActions={[
          {
            content: t("PageName.secondaryAction"),
            onAction: () => console.log("Secondary action"),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              {t("PageName.heading")}
            </Text>
            <TextContainer>
              <p>{t("PageName.body")}</p>
            </TextContainer>
          </Card>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              {t("PageName.heading")}
            </Text>
            <TextContainer>
              <p>{t("PageName.body")}</p>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <Text variant="headingMd" as="h2">
              {t("PageName.heading")}
            </Text>
            <TextContainer>
              <p>{t("PageName.body")}</p>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
