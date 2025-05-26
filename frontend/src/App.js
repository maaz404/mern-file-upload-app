import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { UploadOutlined, TableOutlined } from "@ant-design/icons";
import "./App.css";
import UploadForm from "./components/UploadForm";
import DataList from "./components/DataList";

const { Header, Content } = Layout;

function AppContent() {
  const location = useLocation();
  
  const menuItems = [
    {
      key: "/",
      icon: <UploadOutlined />,
      label: <Link to="/">Upload Form</Link>,
    },
    {
      key: "/data",
      icon: <TableOutlined />,
      label: <Link to="/data">View Data</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ padding: 0 }}>
        <div style={{ color: "white", fontSize: "20px", paddingLeft: "20px", float: "left", lineHeight: "64px" }}>
          File Upload App
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ float: "right", lineHeight: "64px" }}
        />
      </Header>
      <Content style={{ padding: "24px", minHeight: "calc(100vh - 64px)" }}>
        <Routes>
          <Route path="/" element={<UploadForm />} />
          <Route path="/data" element={<DataList />} />
        </Routes>
      </Content>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
