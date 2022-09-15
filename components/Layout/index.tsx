import React, { ReactNode } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Typography } from "antd";
import {
  ReadOutlined,
  StarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
const { Header, Footer, Content } = Layout;
const { Text, Link } = Typography;

interface PageLayoutProps {
  children: ReactNode;
}

const items = [
  {
    label: (
      <Text strong style={{ fontSize: "larger" }}>
        Motiva - Phrases
      </Text>
    ),
    key: "title",
    disabled: true,
    icon: <ReadOutlined style={{ color: "black" }} />,
  },
  {
    label: <Link href="/">Frase do dia</Link>,
    key: "day-phrase",
    icon: <FileTextOutlined style={{ color: "black" }} />,
  },
  {
    label: <Link href="/top-phrases">Top 10 mais comentadas</Link>,
    key: "top-prhases",
    icon: <StarOutlined style={{ color: "#faad14" }} />,
  },
];

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <Layout>
      <Header style={{ background: "#fff" }}>
        <Menu items={items} mode="horizontal" theme="light" />
      </Header>
      <Content style={{ padding: "0 50px" }}>{children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
