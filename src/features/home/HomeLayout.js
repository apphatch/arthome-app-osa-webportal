import React from 'react';

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  UploadOutlined,
  LogoutOutlined,
  ImportOutlined,
  DownloadOutlined,
} from '@ant-design/icons';

import { connect } from 'react-redux';
import authActions from '../auth/redux/actions';
import history from '../../common/history';

const { Header, Sider, Content } = Layout;

const HomeLayout = ({ children, dispatch }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    dispatch(authActions.logout());
  };
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />} onClick={() => history.push('/')}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<ImportOutlined />} onClick={() => history.push('/cico')}>
            Checkin/Checkout
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />} onClick={() => history.push('/upload')}>
            Upload
          </Menu.Item>
          <Menu.Item key="4" icon={<DownloadOutlined />} onClick={() => history.push('/download')}>
            Download
          </Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default connect()(HomeLayout);
