import { Layout } from "antd";

import Sidebar from "./sidebar";
import Timeline from "./timeline/timeline";

const { Header, Footer, Sider, Content } = Layout;

export default function Editor() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Sidebar />
      </Sider>
      <Content>
        <Timeline />
      </Content>
    </Layout>
  );
}
