import { json } from "@remix-run/node";
import { useLoaderData, Link, useNavigate } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  Card,
  EmptyState,
  Layout,
  Page,
  IndexTable,
  Thumbnail,
  Text,
  Icon,
  InlineStack,
} from "@shopify/polaris";
import db from "../db.server";


import { AlertDiamondIcon, ImageIcon } from "@shopify/polaris-icons";

async function getQRCodes() {
  const webPixelDatas = await db.pixelData.findMany({
    orderBy: { id: "desc" },
  });

  if (webPixelDatas.length === 0) return [];

  return webPixelDatas;
}

export async function loader({ request }) {
  const webPixelDatas = await getQRCodes();

  return json({
    webPixelDatas,
  });
}

const EmptyQRCodeState = ({ onAction }) => (
  <EmptyState
    heading="Create unique QR codes for your product"
    action={{
      content: "Create QR code",
      onAction,
    }}
    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
  >
    <p>Allow customers to scan codes and buy products using their phones.</p>
  </EmptyState>
);

function truncate(str, { length = 25 } = {}) {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.slice(0, length) + "…";
}

const QRTable = ({ webPixelDatas }) => (
  <IndexTable
    resourceName={{
      singular: "Web pixel data",
      plural: "Web pixel datas",
    }}
    itemCount={webPixelDatas.length}
    headings={[
      { title: "Id", hidden: true },
      { title: "Products" },
      { title: "Customer Email" },
      { title: "Customer Name" },
      { title: "Cart Total Amount" },
      { title: "Date created" },
    ]}
    selectable={false}
  >
    {webPixelDatas.map((webPixelData) => (
      <QRTableRow key={webPixelData.id} webPixelData={webPixelData} />
    ))}
  </IndexTable>
);

const QRTableRow = ({ webPixelData }) => (
  <IndexTable.Row id={webPixelData.id} position={webPixelData.id}>
    <IndexTable.Cell>
      <Text>{webPixelData.id}</Text>
    </IndexTable.Cell>
    <IndexTable.Cell>
      <Text>{webPixelData.productIds}</Text>
    </IndexTable.Cell>
    <IndexTable.Cell>
      <Text>{webPixelData.customerEmail}</Text>
    </IndexTable.Cell>
    <IndexTable.Cell>
      <Text>{webPixelData.customerFirstName} {webPixelData.customerLastName}</Text>
    </IndexTable.Cell>
    <IndexTable.Cell>
      <Text>{webPixelData.cartTotalAmount} {webPixelData.shopCurrencyCode}</Text>
    </IndexTable.Cell>
    <IndexTable.Cell>
      {new Date(webPixelData.createdAt).toDateString()}
    </IndexTable.Cell>
  </IndexTable.Row>
);

export default function Index() {
  const { webPixelDatas } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Page>
      <ui-title-bar title="Web pixel datas">
      </ui-title-bar>
      <Layout>
        <Layout.Section>
          <Card padding="0">
            {webPixelDatas.length === 0 ? (
              <EmptyQRCodeState onAction={() => navigate("qrcodes/new")} />
            ) : (
              <QRTable webPixelDatas={webPixelDatas} />
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
