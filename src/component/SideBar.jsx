import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  WindowsOutlined,
  CustomerServiceOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import AppRoute from "./AppRoute/AppRoute";
import React, { useState,useEffect } from "react";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const navigation = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    // Function to handle sidebar collapse based on screen size
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for sidebar state based on screen size
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          onClick={(item) => {
            navigation(item.key);
          }}
          items={[
            {
              key: "/",
              icon: <WindowsOutlined />,
              label: "Home",
            },
            {
              key: "/about",
              icon: <CustomerServiceOutlined />,
              label: "About",
            },
            {
              key: "/service",
              icon: <CustomerServiceOutlined />,
              label: "Service",
            },
            {
              key: "/product",
              icon: <ProfileOutlined />,
              label: "Product",
            },
            {
              key: "/customer",
              icon: <CustomerServiceOutlined />,
              label: "Customer",
            },
            {
              key: "/team",
              icon: <TeamOutlined />,
              label: "Team",
            },
            {
              key: "/contact",
              icon: <CustomerServiceOutlined />,
              label: "Contact",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <AppRoute></AppRoute>
        </Content>
      </Layout>
    </Layout>
  );
};
export default SideBar;
