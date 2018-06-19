import React, {Component} from 'react';
import {Route, Switch, Redirect,Link} from 'dva/router';
import {connect} from 'dva';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import style from './App.css';
import Welcome from './Dashbash/welcome';
import WhiteList from './WhiteManager/whitelist';
import WhiteCreate from './WhiteManager/whitecreate';
import WhiteEdit from './WhiteManager/whiteedit';

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  state = {
    collapsed: false,
    routes:[],
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleClick(e) {
    this.props.dispatch({
      type: 'menu/go', payload: "#/app/" + e.key
    });
  }

  componentWillMount() {
    // this.setState({
    //   menuList: (" <Menu.Item key=\"welcome\">\n" +
    //   "                <Icon type=\"pie-chart\"/>\n" +
    //   "                <span>主页</span>\n" +
    //   "              </Menu.Item>\n" +
    //   "              <Menu.Item key=\"2\">\n" +
    //   "                <Icon type=\"desktop\"/>\n" +
    //   "                <span>Option 2</span>\n" +
    //   "              </Menu.Item>\n" +
    //   "              <SubMenu\n" +
    //   "                key=\"whiteManager\"\n" +
    //   "                title={<span><Icon type=\"user\"/><span>WhiteManager</span></span>}\n" +
    //   "              >\n" +
    //   "                <Menu.Item key=\"whiteList\">WhiteList</Menu.Item>\n" +
    //   "                <Menu.Item key=\"4\">Bill</Menu.Item>\n" +
    //   "                <Menu.Item key=\"5\">Alex</Menu.Item>\n" +
    //   "              </SubMenu>\n" +
    //   "              <SubMenu\n" +
    //   "                key=\"sub2\"\n" +
    //   "                title={<span><Icon type=\"team\"/><span>Team</span></span>}\n" +
    //   "              >\n" +
    //   "                <Menu.Item key=\"6\">Team 1</Menu.Item>\n" +
    //   "                <Menu.Item key=\"8\">Team 2</Menu.Item>\n" +
    //   "              </SubMenu>\n" +
    //   "              <Menu.Item key=\"9\">\n" +
    //   "                <Icon type=\"file\"/>\n" +
    //   "                <span>File</span>\n" +
    //   "              </Menu.Item>")
    // });
  }

  itemRender(route, params, routes, paths) {
    console.log(routes);
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }

  changeBreadcrumb(val) {
    console.log(val);
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
        return <SubMenu key="whiteManager" title={<span><Icon type="user"/><span>WhiteManager</span></span>}>
          <Menu.Item key="whiteList">WhiteList</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
      }
    });

    const routes = [{
      path: 'index',
      breadcrumbName: '首页'
    }, {
      path: 'first',
      breadcrumbName: '一级面包屑'
    }, {
      path: 'second',
      breadcrumbName: '当前页面'
    }];

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
            </Header>
            <div className={style.bread}>
              {/*<Breadcrumb>*/}
              {/*<Breadcrumb.Item>{}</Breadcrumb.Item>*/}
              {/*/!*<Breadcrumb.Item>Bill</Breadcrumb.Item>*!/*/}
              {/*</Breadcrumb>*/}
              <Breadcrumb itemRender={this.itemRender} routes={routes}/>;
            </div>
            <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
              <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                <Switch>
                  <Route path="/app/welcome" component={Welcome}/>
                  <Route path="/app/whiteList" component={WhiteList}/>
                  <Route path="/app/whitecreate" component={WhiteCreate}/>
                  <Route path="/app/whiteedit" component={WhiteEdit}/>
                  <Redirect from='/app' to="/app/welcome"/>
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

export default connect()(App);
