import React, {Component} from 'react';
import {Route, Switch, Redirect, Link} from 'dva/router';
import {connect} from 'dva';
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
import style from './App.css';
import Welcome from './Dashbash/welcome';
import WhiteList from './White/whitelist';
import WhiteCreate from './White/whitecreate';
import WhiteEdit from './White/whiteedit';
import WhiteDetail from './White/whiteDetail'
import white from "../models/White/white";

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  state = {
    collapsed: false,
    routes: [],
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleClick(e) {
    this.props.dispatch({
      type: 'app/go', payload: "#/app/" + e.key
    });
  }

  componentWillMount() {

  }

  signOut() {
    localStorage.removeItem("userName");
    location.href = "#/login";
  }

  render() {
    const menutar = [
      {
        'id': 'id1',
        'name': 'user',
        'vvl': ['a', 'b', 'c', 'd']
      },
      {
        'id': 'id2',
        'name': 'password',
        'vvl': ['x', 'y', 'p', 'n']
      },
      {
        'id': 'id3',
        'name': 'shadow',
        'vvl': ['t', 'w', 'u', 'k']
      }
    ];

    const columnMenuInfo = [{
      key: '1',
      title: 'name'
    }, {
      key: '2',
      title: 'hello'
    }];
    let html = columnMenuInfo.map((obj, i) => {
      if (obj.key == 1) {
        return <Menu.Item key="welcome">
          <Icon type="pie-chart"/>
          <span>主页</span>
        </Menu.Item>
      }
      else {
        // menutar.map(function (item) {
        //     return (<SubMenu key={item.id}
        //                      title={<span><Icon type="appstore"/><span>{item.name}</span></span>}>
        //       {item.vvl.map((vl) => (
        //         <Menu.Item key={item.vvl.indexOf(vl)}>{vl}</Menu.Item>
        //       ))}
        //     </SubMenu>)
        //   }
        // )
        // return <SubMenu key="whiteManager" title={<span><Icon type="user"/><span>WhiteManager</span></span>}>
        //   <Menu.Item key="white/whiteList">WhiteList</Menu.Item>
        //   <Menu.Item key="4">Bill</Menu.Item>
        //   <Menu.Item key="5">Alex</Menu.Item>
        // </SubMenu>
        return <Menu.Item key="whiteListed">
          <Icon type="user"/>
          <span>WhiteListed</span>
        </Menu.Item>
      }
    });

    const breadcrumbNameMap = {
      '/app/welcome': 'Welcome',
      '/app/whiteListed': 'White-Listed',
      '/app/whiteListed/Create': 'Create',
      '/app/whiteListed/Edit': 'Edit',
      '/app/whiteListed/Detail': 'Detail',
    };

    const pathSnippets = this.props.location.pathname.split('/').filter(item => {
      if (item != "app") {
        return item;
      }
    });
    let nvaigatorInfo = "";
    if (pathSnippets.length > 1) {
      nvaigatorInfo = pathSnippets[pathSnippets.length - 1];
    }
    let isShowEditDelete = false;
    pathSnippets.forEach((item) => {
      if (item === "Detail") {
        isShowEditDelete = true;
      }
    });


    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/app/${pathSnippets.slice(0, index + 1).join('/')}`;

      return (
        <Breadcrumb.Item key={url}>
          <a href={'#' + url}> {breadcrumbNameMap[url]}</a>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [].concat(extraBreadcrumbItems);

    return (
      <div>
        <Layout style={{minHeight: '100vh'}}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className={style.logo}/>
            <Menu theme="dark" mode="inline" onClick={this.handleClick.bind(this)}>
              {
                html
              }
            </Menu>
          </Sider>
          <Layout>
            <Header style={{background: '#fff', padding: 0}}>
              <Icon
                className={style.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className={style.rightWarpper}>
                <Menu mode="horizontal" style={{borderBottom: 0}} onClick={this.signOut}>
                  <SubMenu
                    title={<span>
                      <Icon type="user"/>
                      {
                        localStorage.getItem("userName")
                      }
                      </span>}>
                    <Menu.Item key="logout">
                      Sign out
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
            </Header>
            <div className={style.bread}>
              <Breadcrumb>
                {breadcrumbItems}
              </Breadcrumb>
            </div>
            <div style={{backgroundColor: 'white', paddingLeft: '18px', paddingBottom: '10px'}}>
              <div>
                <span style={{fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)', fontSize: '2em'}}> {nvaigatorInfo}</span>
                {
                  isShowEditDelete ? <Button style={{float: 'right', marginRight: '50px'}}>Delete</Button> : ""
                }
                {
                  isShowEditDelete ? <div style={{fontSize: '12px', marginTop: '10px'}}>
                    <div style={{color: '#000000', float: 'left'}}>WhiteList Status:Action</div>
                    <div style={{color: '#000000', float: 'left', marginLeft: '38px'}}>Ops Status:Pending Approve</div>
                  </div> : ""
                }
              </div>
            </div>
            <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
              <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                <Switch>
                  {/*<Route exact path="/app/welcome" component={Welcome}/>*/}
                  {/*<Route exact path="/app/white" component={WhiteList}/>*/}
                  {/*<Route exact path="/app/white/whiteList" component={WhiteList}/>*/}
                  {/*<Route exact path="/app/white/whitecreate" component={WhiteCreate}/>*/}
                  {/*<Route exact path="/app/white/whiteedit" component={WhiteEdit}/>*/}
                  {/*<Route exact path="/app/white/whiteDetail" component={WhiteDetail}/>*/}
                  {/*<Redirect exact from='/app' to="/app/welcome"/>*/}
                  <Route exact path="/app/welcome" component={Welcome}/>
                  <Route exact path="/app/whiteListed" component={WhiteList}/>
                  <Route exact path="/app/whiteListed/Create" component={WhiteCreate}/>
                  <Route exact path="/app/whiteListed/Edit" component={WhiteEdit}/>
                  <Route exact path="/app/whiteListed/Detail" component={WhiteDetail}/>
                  <Redirect exact from='/app' to="/app/welcome"/>
                </Switch>
              </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    white: store.white,
    login: store.login,
  };
}

export default connect(mapStateToProps)(App);
