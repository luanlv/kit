import React, { PropTypes } from 'react'
import { Layout, Menu, Breadcrumb, Icon, LocaleProvider } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import Link from '../../../components/Link'
import LoadingBar from 'react-redux-loading-bar';
import enUS from 'antd/lib/locale-provider/en_US';

class App extends React.Component {
  state = {
    collapsed: false,
    mode: 'inline',
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <LocaleProvider locale={enUS}>
       <Layout>
        <LoadingBar />
        <Sider
          collapsible
          breakpoint="lg"
          collapsedWidth="0"
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          width="170"
        >
          <div className="logo" />
          <div className="admin-topSlide">
           <span>ADMIN</span>
          </div>
          <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={[this.props.name]}>
            <Menu.Item key="Dashboard">
              <Link to="/admin/">
                <span>
                  <Icon type="layout" />
                  <span className="nav-text">Dashboard</span>
                </span>
              </Link>
            </Menu.Item>

            {/*<SubMenu*/}
              {/*key="sub2"*/}
              {/*title={<span><Icon type="team" /><span className="nav-text">Team</span></span>}*/}
            {/*>*/}
              {/*<Menu.Item key="4">Team 1</Menu.Item>*/}
              {/*<Menu.Item key="Dashboard">Team 2</Menu.Item>*/}
            {/*</SubMenu>*/}

            <Menu.Item key="Library">
              <Link to="/admin/library">
                <span>
                  <Icon type="appstore-o" />
                  <span className="nav-text">Thư viện</span>
                </span>
              </Link>
            </Menu.Item>

            <Menu.Item key="Setting">
              <Link to="/admin/setting">
                <span>
                  <Icon type="tool" />
                  <span className="nav-text">Cài đặt</span>
                </span>
              </Link>
            </Menu.Item>

            <Menu.Item key="Editor">
              <Link to="/admin/editor">
                <span>
                  <Icon type="tool" />
                  <span className="nav-text">Editor</span>
                </span>
              </Link>
            </Menu.Item>

          </Menu>
        </Sider>

        <Layout>
          <Header style={{ height: 47, background: 'white', padding: 0}} >
          </Header>
          <Content style={{ margin: '0 5px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>{ this.props.name }</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{background: '#fff', minHeight: 500 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      </LocaleProvider>
    );
  }
}



export default App
