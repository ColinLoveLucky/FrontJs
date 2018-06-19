// import React, {Component} from 'react';
// import {connect} from 'dva';
// import {
//   Row,
//   Col,
//   Card,
//   Form,
//   Input,
//   Select,
//   Icon,
//   Button,
//   Dropdown,
//   Menu,
//   Popconfirm,
//   Modal,
//   message,
//   Alert,
//   Table
// } from 'antd';
// // import styles from './whitelist.less';
// const FormItem = Form.Item;
// const {Option} = Select;
// const columns = [{
//   title: 'SAIC number',
//   dataIndex: 'number',
//   render: text => <a href="#">{text}</a>,
// }, {
//   title: 'Company name',
//   dataIndex: 'companyName',
// }, {
//   title: 'Part of SCB',
//   dataIndex: 'scb',
// },
//   {
//     title: 'Mode',
//     dataIndex: 'mode',
//   },
//   {
//     title: 'Whitelist status',
//     dataIndex: 'whiteListStatus',
//   },
//   {
//     title: 'Ops Status',
//     dataIndex: 'opsStatus',
//   },
//   {
//     title: 'Operation',
//     render: (text, record)  => (
//       <div>
//         <Button style={{marginRight: "2px"}}>edit</Button>
//         |
//         <Popconfirm title="Are you sure you want to delete this?" onConfirm={() =>handleSingleRemove(record.key)}>
//           <Button style={{marginLeft: "2px"}}>delete</Button>
//         </Popconfirm>
//       </div>
//     ),
//   },];
// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   getCheckboxProps: record => ({
//     disabled: record.name === 'Disabled White', // Column configuration not to be checked
//   }),
// };
//
// class whitelist extends Component {
//   constructor(props) {
//     super(props);
//     this.state={
//       expandForm: false,
//       selectedRowKeys: [],
//       totalCallNo: 0,
//     }
//   }
//   handleSearch = (e) => {
//     e.preventDefault();
//     const no = this.props.form.getFieldValue("no");
//     const status = this.props.form.getFieldValue("opStatus");
//     this.props.dispatch({
//       type: 'white/search', payload: {
//         number:no,
//         status:status
//       }
//     });
//   }
//   handleFormReset = () => {
//     const {form, dispatch} = this.props;
//     form.resetFields();
//     // dispatch({
//     //   type: 'rule/fetch',
//     //   payload: {},
//     // });
//   }
//   handleMenuClick = () => {
//   }
//   cleanSelectedKeys = () => {
//
//   }
//   handleSingleRemove (key) {
//     console.log(key);
//   }
//   render() {
//     const {getFieldDecorator} = this.props.form;
//     const {selectedRowKeys, totalCallNo} = this.state;
//     const menu = (
//       <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
//         <Menu.Item key="remove">Creation</Menu.Item>
//         <Menu.Item key="approval">Update</Menu.Item>
//       </Menu>
//     );
//     return (
//       <Card bordered={false}>
//         <Form onSubmit={this.handleSearch} layout="inline">
//           <Row>
//             <Col md={8} sm={24}>
//               <FormItem label="SAIC number">
//                 {getFieldDecorator('no')(
//                   <Input style={{width: '250px'}} placeholder="Please enter"/>
//                 )}
//               </FormItem>
//             </Col>
//             <Col md={8} sm={24}>
//               <FormItem label="Ops status">
//                 {getFieldDecorator('opStatus')(
//                   <Select placeholder="Please select" style={{width: '250px'}}>
//                     <Option value="Approve">Approve</Option>
//                     <Option value="Reject">Reject</Option>
//                   </Select>
//                 )}
//               </FormItem>
//             </Col>
//             <Col md={2} sm={24}>
//               <FormItem>
//                 <Button icon="search" type="primary" htmlType="submit">Search</Button>
//
//               </FormItem>
//             </Col>
//             <Col md={2} sm={24}>
//               <FormItem>
//                 <Button type="primary" onClick={this.handleFormReset}>Reset</Button>
//               </FormItem>
//             </Col>
//           </Row>
//           <Row style={{marginTop: '20px'}}>
//             <Col md={2} sm={24}>
//               <FormItem>
//                 <Button icon="plus" type="primary">Create</Button>
//               </FormItem>
//             </Col>
//             <Col md={2} sm={24}>
//               <FormItem>
//                 <Dropdown overlay={menu}>
//                   <Button type="primary">
//                     Batch <Icon type="down"/>
//                   </Button>
//                 </Dropdown>
//               </FormItem>
//             </Col>
//             <Col md={2} sm={24}>
//               <FormItem>
//                 <Popconfirm title="Are you sure you want to delete this?">
//                   <Button type="primary" icon="delete">Delete</Button>
//                 </Popconfirm>
//               </FormItem>
//             </Col>
//           </Row>
//         </Form>
//         <div style={{marginTop: '20px'}}>
//           <div>
//             <Alert
//               message={(
//                 <div>
//                   selected <a
//                   style={{fontWeight: 600}}>{selectedRowKeys.length}</a> {selectedRowKeys.length > 1 ? 'items' : 'item'}&nbsp;&nbsp;
//                   <a onClick={this.cleanSelectedKeys} style={{marginLeft: 24}}>Clear</a>
//                 </div>
//               )}
//               type="info"
//               showIcon
//             />
//           </div>
//           <div style={{marginTop: '20px'}}>
//             <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.whiteList.data.list}/>
//           </div>
//         </div>
//       </Card>
//     );
//   }
// }
//
// function mapStateToProps(stroe) {
//   return {
//     whiteList:stroe.white
//   };
// }
//
// export default connect(mapStateToProps)(Form.create()(whitelist));

import React, {Component} from 'react';
import {connect} from 'dva';
import Main from "../../components/White/whitelistmian";

class whitelist extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Main data={this.props.whiteList.data} dispatch={this.props.dispatch} batchExportURL = {this.props.whiteList.batchExportUrl}/>
    );
  }
}

function mapStateToProps(store) {
  return {
    whiteList: store.whiteList,
  };
}

export default connect(mapStateToProps)(whitelist);
