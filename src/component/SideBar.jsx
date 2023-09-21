import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
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
          defaultSelectedKeys={["/home"]}
          onClick={(item) => {
            navigation(item.key);
          }}
          items={[
            {
              key: "/",
              icon: <HomeOutlinedIcon fontSize="medium"/>,
              label: "Home",
            },
            {
              key: "/about",
              icon: <InfoOutlinedIcon fontSize="medium"/>,
              label: "About",
            },
            {
              key: "/service",
              icon: <MedicalServicesOutlinedIcon fontSize="medium"/>,
              label: "Service",
            },
            {
              key: "/product",
              icon: <CategoryOutlinedIcon fontSize="medium"/>,
              label: "Product",
            },
            {
              key: "/customer",
              icon: <SupportAgentOutlinedIcon fontSize="medium"/>,
              label: "Customer",
            },
            {
              key: "/team",
              icon: <GroupsOutlinedIcon fontSize="medium"/>,
              label: "Team",
            },
            {
              key: "/contact",
              icon: <ContactSupportOutlinedIcon fontSize="medium"/>,
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
