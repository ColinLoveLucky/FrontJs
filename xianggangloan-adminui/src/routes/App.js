import React, {Component} from 'react';
import {Route, Switch, Redirect, Link} from 'dva/router';
import {connect} from 'dva';
import {Layout, Menu, Breadcrumb, Icon, Button, Popconfirm} from 'antd';
import style from './App.css';
import Welcome from './Dashbash/welcome';
import WhiteList from './White/whitelist';
import WhiteCreate from './White/whitecreate';
import WhiteEdit from './White/whiteedit';
import WhiteDetail from './White/whiteDetail';
import WhiteApprove from './White/whiteapprove';
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

  handleClick(e, key) {
    this.props.dispatch({
      type: 'app/go', payload: "#/app/" + e.key
    });
  }

  componentWillMount() {

  }

  signOut() {
    localStorage.removeItem("userName");
    this.props.dispatch({
      type: 'login/loginout', payload: ""
    });
    location.href = "#/login";
  }

  handleWhiteListDelete() {
    let detail = this.props.white.dataEdit.data != undefined ? this.props.white.dataEdit.data.content : '';
    this.props.dispatch({
      type: 'white/fetchEditFullDelete', payload: {
        whiteListStatus: detail != "" ? detail.status : "",
        ids: detail != "" ? detail.id : ""
      }
    });
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
    // console.log("href1", location.href.split("/").reverse()[0]!=""?location.href.split("/").reverse()[0]:"ww");

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
/*        return <Menu.Item key="whiteListed">
          <Icon type="user"/>
          <span>WhiteListed</span>
        </Menu.Item>*/

         return <SubMenu key="whiteManager" title={<span><Icon type="user"/><span>WhiteManager</span></span>}>
          <Menu.Item key="whiteListed">
            <Icon type="user"/>
            <span>WhiteListed</span>
          </Menu.Item>
           <Menu.Item key="WhiteListedApprove">
             <Icon type="user"/>
             <span>Approve</span>
           </Menu.Item>
         </SubMenu>


      }
    });

    const breadcrumbNameMap = {
      '/app/welcome': 'Welcome',
      '/app/whiteListed': 'White-Listed',
      '/app/whiteListed/Create': 'Create',
      '/app/whiteListed/Edit': 'Edit',
      '/app/whiteListed/Detail': 'Detail',
      '/app/WhiteListedApprove':'Approve',
    };

    const pathSnippets = this.props.location.pathname.split('/').filter(item => {
      if (item != "app") {
        return item;
      }
    });
    let nvaigatorInfo = "";
    if (pathSnippets.length > 1) {
      const title = pathSnippets[pathSnippets.length - 2];
      if (title === 'Edit') {
        nvaigatorInfo = title;
      } else
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

    let detail = this.props.white.dataEdit.data != undefined ? this.props.white.dataEdit.data.content : '';
    let opsStatus = {
      Approved: "APPROVED",
      Reject: "REJECT",
      Pending: "PENDING"
    };
    return (
      <div>
        <Layout style={{minHeight: '100vh'}}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className={style.logo}/>
            <Menu theme="dark" mode="inline"   onClick={this.handleClick.bind(this)}
                  defaultSelectedKeys={[location.href.split("/").reverse()[0]]}>
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
                <Menu mode="horizontal" style={{borderBottom: 0}} onClick={this.signOut.bind(this)}>
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
                <span style={{fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)', fontSize: '2em'}}>
                  {isShowEditDelete ? detail.officialName : nvaigatorInfo}
                  </span>
                {
                  isShowEditDelete ? <Popconfirm title="Are you sure you want to delete?"
                                                 onConfirm={(e) => this.handleWhiteListDelete(e)}>
                    <Button style={{float: 'right', marginRight: '64px'}}
                            disabled={(detail != "" ? detail.status : "") == "INACTIVE" ? true : false}>Delete</Button>
                  </Popconfirm> : ""
                }
                {
                  isShowEditDelete ? <div style={{fontSize: '12px', marginTop: '10px'}}>
                    <div style={{float: 'left'}}>
                      <span style={{color: '#000000', marginRight: '10px'}}>   WhiteList Status:
                      </span>
                      <span>  {detail != "" ? detail.status : ""}
                      </span>
                    </div>
                    <div style={{float: 'left', marginLeft: '38px'}}>
                      <span style={{color: '#000000', marginRight: '10px'}}>Ops Status: </span>
                      <span>
                         <span
                           className={style.antBadgeStatusDot + " " + ((detail != "" ? detail.auditStatus : "") == opsStatus.Approved ? style.antBadgeStatusApproved :
                             ((detail != "" ? detail.auditStatus : "") == opsStatus.Reject) ? style.antBadgeStatusRejected :
                               ((detail != "" ? detail.auditStatus : "") == opsStatus.Pending) ? style.antBadgeStatusPendingApprove : style.antBadgeStatusDefault)}
                           style={{marginRight: '10px'}}></span>
                        {detail != "" ? detail.auditStatus : ""}
                      </span>
                    </div>
                  </div> : ""
                }
              </div>
            </div>
            <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
              <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                <Switch>
                  <Route exact path="/app/welcome" component={Welcome}/>
                  <Route exact path="/app/whiteListed" component={WhiteList}/>
                  <Route exact path="/app/whiteListed/Create" component={WhiteCreate}/>
                  <Route exact path="/app/whiteListed/Edit/:companyId" component={WhiteEdit}/>
                  <Route exact path="/app/whiteListed/Detail/:companyId" component={WhiteDetail}/>
                  <Route exact path="/app/WhiteListedApprove" component={WhiteApprove} />
                  <Redirect exact from='/app' to="/app/welcome"/>
                </Switch>
              </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
              DIANRONG©2017 Created by DIANRONG
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    white: store.white
  };
}

export default connect(mapStateToProps)(App);
