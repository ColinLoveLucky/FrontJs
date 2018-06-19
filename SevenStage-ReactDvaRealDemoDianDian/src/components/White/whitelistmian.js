import React, {Component} from 'react';
import {connect} from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Popconfirm, Alert, Table, Modal, Checkbox, Upload, message  } from 'antd';
import { actionType, responseStatus, whiteListStatusType, batchOperateType, batchOperateText, whiteListCheckType, whiteListCheckText } from '../../utils/constObject';
import styles from './whitelist.less';
import {exportWhiteListByIdsAsync} from '../../services/whiteapi';
const FormItem = Form.Item;
const {Option} = Select;
const labelObj = {
  CompanyName: "Company name",
  EmailDomain: "Email domain",
  SAICNumber: "SAIC number",
  PartOfSCB: "Part of SCB",
  Mode: "Mode",
  CampaignName: "Campagin name",
  WhitelistStatus: "Whitelist status",
  OpsStatus: "Ops status",
};

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const selectMsg = "Please select";
const enterMsg = "Please enter";

class whitelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandForm: true,
      selectedRowKeys: [],
      selectedRows:[],
      onDelete: this.props.onDelete,
      filteredInfo: null,
      batchOperateTitle: "",
      batchOperateVisible:false,
      batchExportUrl:"",
      chkSAICStatus:true,
      chkOfficialNameStatus:true,
      chkEmailStatus:true
    }
  }

  componentDidMount(){
    this.handleSearch();
  }

  getFieldValue = (name) => {
    return this.props.form.getFieldValue(name);
  }

  getSearchModel = () => {
    const { pagination } = this.props;
    let paginationHasValue = (pagination != null && pagination != undefined) ? true : false;
    const officialName = this.getFieldValue('CompanyName');
    const emailDomain = this.getFieldValue('EmailDomain');
    const registNumber = this.getFieldValue('SAICNumber');
    const isScbSubcompany = this.getFieldValue('PartOfSCB');
    const mode = this.getFieldValue('Mode');
    const campaignName = this.getFieldValue('CampaignName');
    const status = this.getFieldValue('WhitelistStatus');
    const auditStatus = this.getFieldValue('OpsStatus');
    const searchCondition = {
      "officialName":officialName,
      "emailDomain":emailDomain,
      "registNumber":registNumber,
      "isScbSubcompany":isScbSubcompany,
      "mode":mode,
      "campaignName":campaignName,
      "status":status,
      "auditStatus":auditStatus
    };
    const searchModel = {
      "condition":searchCondition,
      "pageNumber": paginationHasValue ? pagination.current : 1,
      "pageSize": paginationHasValue ? pagination.pageSize : 10,
      "sort": "DESC",
      "sortName": "updatedDate",
    };
    return searchModel;
  }

  handleSearch = (e = null) => {
    if(e != null){
      e.preventDefault();
    }
    const searchModel = this.getSearchModel();
    this.props.dispatch({
      type: 'whiteList/loadData', payload: {
        action: actionType.SEARCH,
        searchModel: searchModel
      }
    });
  }

  handleRemove = (ids) => {
    const searchModel = this.getSearchModel();
    this.props.dispatch({
      type: 'whiteList/loadData', payload: {
        action: actionType.DELETE,
        whiteListStatus:whiteListStatusType.INACTIVE,
        ids: ids,
        searchModel: searchModel
      }
    });
  }

  handleSingleRemove(key) {
    if(key != null){
      let ids = [];
      ids.push(key);
      this.handleRemove(ids);
    }
  }

  handleBatchRemove(e){
    e.preventDefault();
    let rows = this.state.selectedRows;
    if(rows != null && rows.length > 0){
      let ids = [];
      for(let index in rows){
        let row = rows[index];
        ids.push(row.id);
      }
      this.handleRemove(ids);
      this.handleRowSelectChange([], []);
    }
  }

  handleExport = (e) => {
    e.preventDefault();
    let rows = this.state.selectedRows;
    if(rows != null && rows.length > 0){
      let ids = [];
      for(let index in rows){
        let row = rows[index];
        ids.push(row.id);
      }
      const response=  exportWhiteListByIdsAsync(ids,{});
      console.log(response.hasOwnProperty("result"));
      if(response != null && !response.hasOwnProperty("result")){
        //var debug = {hello: "world"};
        //var blob = new Blob([JSON.stringify(debug, null, 2)],
        //var blob = new Blob([blob]);
        var blob = new Blob([response], {type: "application/x-xls"});
        const url= (window.URL || window.webkitURL).createObjectURL(blob);
        console.log(url);
        this.setState({batchExportUrl:url});
      }else if(response.result == responseStatus.ERROR){
        // Warning
      }
      // this.props.dispatch({
      //   type: 'whiteList/exportWhilteListByIds', payload: {
      //     ids: ids,
      //   }
      // });
    }
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  }

  handleMenuClick = (e) => {
    switch(e.key){
      case batchOperateType.ADD:
        this.setState({batchOperateTitle:batchOperateText.ADD});
        break;

      case batchOperateType.UPDATE:
        this.setState({batchOperateTitle:batchOperateText.UPDATE});
        break;
    }
    this.setState({
      batchOperateVisible: true,
    });
  }

  handleBatchCancel = (e) => {
    e.preventDefault();
    this.setState({
      batchOperateVisible: false,
    });
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }
    this.setState({ selectedRowKeys,selectedRows});
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
    });
    //this.props.onChange(pagination, filters, sorter);
  }

  hanldleCreate = () => {
    location.href = "#/app/whiteListed/Create";
  }

  handleEdit(key){
    this.props.dispatch({
      type: 'white/fetchDetail', payload: {
        path:"#/app/whiteListed/Edit",
        key: key
      }
    });
  }

  handleDetail(key){
    this.props.dispatch({
      type:'white/fetchAllDetail',
      payload:{
        path:"#/app/whiteListed/Detail",
        key:key
      }
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  checkOnChange(e) {
    if (e.target.id === whiteListCheckType.SAIC) {
      this.state.chkSAICStatus = e.target.checked;
    }
    else if (e.target.id === whiteListCheckType.OFFICIALNAME) {
      this.state.chkOfficialNameStatus = e.target.checked;
    }
    else if (e.target.id === whiteListCheckType.EMAIL) {
      this.state.chkEmailStatus = e.target.checked;
    }
    if (!(this.state.chkSAICStatus || this.state.chkOfficialNameStatus || this.state.chkEmailStatus)) {
      e.target.checked = true;
      if (e.target.id === whiteListCheckType.SAIC) {
        this.state.chkSAICStatus = e.target.checked;
      }
      else if (e.target.id === whiteListCheckType.OFFICIALNAME) {
        this.state.chkOfficialNameStatus = e.target.checked;
      }
      else if (e.target.id === whiteListCheckType.EMAIL) {
        this.state.chkEmailStatus = e.target.checked;
      }
    }
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={40}>
          <Col span={8}>
            <FormItem label={labelObj.CompanyName} {...formItemLayout}>
              {getFieldDecorator('CompanyName')(
                <Input placeholder={enterMsg} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.EmailDomain} {...formItemLayout}>
              {getFieldDecorator('EmailDomain')(
                <Input placeholder={enterMsg} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit" style={{marginLeft:32}}>Search</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>Reset</Button>
              {/*<a style={{ marginLeft: 8 }} onClick={this.toggleForm}>Open<Icon type="down" /></a>*/}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} >
        <Row gutter={40}>
          <Col span={8}>
            <FormItem label={labelObj.CompanyName} {...formItemLayout}>
              {getFieldDecorator('CompanyName')(
                <Input placeholder={enterMsg} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.EmailDomain} {...formItemLayout}>
              {getFieldDecorator('EmailDomain')(
                <Input placeholder={enterMsg} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.SAICNumber} {...formItemLayout}>
              {getFieldDecorator('SAICNumber')(
                <Input placeholder={enterMsg} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.PartOfSCB} {...formItemLayout}>
              {getFieldDecorator('PartOfSCB')(
                <Select placeholder={selectMsg}>
                  <Option value="true">true</Option>
                  <Option value="false">false</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.Mode} {...formItemLayout}>
              {getFieldDecorator('Mode')(
                <Select placeholder={selectMsg}>
                  <Option value="NOMAL">NOMAL</Option>
                  <Option value="CAMPAIGN">CAMPAIGN</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.CampaignName} {...formItemLayout}>
              {getFieldDecorator('CampaignName')(
                <Input placeholder={enterMsg} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.WhitelistStatus} {...formItemLayout}>
              {getFieldDecorator('WhitelistStatus')(
                <Select placeholder={selectMsg}>
                  <Option value="ACTIVE">ACTIVE</Option>
                  <Option value="INACTIVE">INACTIVE</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.OpsStatus} {...formItemLayout}>
              {getFieldDecorator('OpsStatus')(
                <Select placeholder={selectMsg}>
                  <Option value="PENDING">PENDING</Option>
                  <Option value="APPROVED">APPROVED</Option>
                  <Option value="REJECT">REJECT</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit" style={{marginLeft:32}}>Search</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>Reset</Button>
                 <a style={{ marginLeft: 8 }} href={this.state.batchExportUrl} download='abcd.xlsx'>testHref</a>
              {/*<a style={{ marginLeft: 8 }} onClick={this.toggleForm}>Collapse<Icon type="up" /></a>*/}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  renderBatchForm(){
    const {getFieldDecorator} = this.props.form;
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <Modal
        title={this.state.batchOperateTitle}
        visible={this.state.batchOperateVisible}
        onCancel={this.handleBatchCancel}
        footer={null}
      >
        <Form>
          <Row type="flex" justify="center">
            <Col>
                <span className={styles.batchText}>1.Duplicate check</span>
            </Col>
          </Row>
          <Row>
            <Col offset={6}>
              <FormItem>
                {getFieldDecorator(whiteListCheckType.SAIC, {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox onChange={(e) => this.checkOnChange(e)}>{whiteListCheckText.SAIC}</Checkbox>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col offset={6}>
              <FormItem>
                {getFieldDecorator(whiteListCheckType.OFFICIALNAME, {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox onChange={(e) => this.checkOnChange(e)}>{whiteListCheckText.OFFICIALNAME}</Checkbox>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col offset={6}>
              <FormItem>
                {getFieldDecorator(whiteListCheckType.EMAIL, {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox onChange={(e) => this.checkOnChange(e)}>{whiteListCheckText.EMAIL}</Checkbox>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col>
              <span className={styles.batchText}>2.Upload Excel</span>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col >
              <span className={styles.batchText}>
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
              </span>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col>
              <span className={styles.batchText}>Supported formats:.xlsx</span>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col>
              <span className={styles.batchText}><Icon type="download" /><a href="#">Download template</a></span>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }

  render() {
    let { selectedRowKeys, filteredInfo } = this.state;
    let { pagination, loading } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key={batchOperateType.ADD}>{batchOperateText.ADD}</Menu.Item>
        <Menu.Item key={batchOperateType.UPDATE}>{batchOperateText.UPDATE}</Menu.Item>
      </Menu>
    );
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };
    let opsStatus = {
      Approved:"APPROVED",
      Reject:"REJECT",
      Pending:"PENDING"
    };
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        dataIndex: 'id',
        className:styles.hideTitle,
      },
      {
        title: 'SAIC number',
        dataIndex: 'registNumber',
        render: (text, record) => <a onClick={() => this.handleDetail(record.id)} >{text}</a>,
      },
      {
        title: 'Company name',
        dataIndex: 'officialName',
      },
      {
        title: 'Part of SCB',
        dataIndex: 'isScbSubcompany',
        render: (text) => text != null && text != undefined ? text.toString() : "",
      },
      {
        title: 'Mode',
        dataIndex: 'mode',
      },
      {
        title: 'Whitelist status',
        dataIndex: 'status',
      },
      {
        title: 'Ops Status',
        dataIndex: 'auditStatus',
        filters: [
          {
            text: opsStatus.Approved,
            value: opsStatus.Approved,
          },
          {
            text: opsStatus.Reject,
            value: opsStatus.Reject,
          },
          {
            text: opsStatus.Pending,
            value: opsStatus.Pending,
          },
        ],
        filteredValue: filteredInfo.auditStatus || null,
        onFilter: (value, record) => record.auditStatus.includes(value),
        render(text) {
          let spanClass = styles.antBadgeStatusDot;
          if (text == opsStatus.Approved) {
            spanClass += " " + styles.antBadgeStatusApproved;
          }
          else if (text == opsStatus.Reject) {
            spanClass += " " + styles.antBadgeStatusRejected;
          }
          else if (text == opsStatus.Pending) {
            spanClass += " " + styles.antBadgeStatusPendingApprove;
          }
          else {
            spanClass += " " + styles.antBadgeStatusDefault;
          }
          return (
            <span className={styles.antBadge + " " + styles.antBadgeStatus + " " + styles.antBadgeNotAWrapper}>
                <span className={spanClass}></span>
                <span className={styles.antBadgeStatusText}>{text}</span>
              </span>
          );
        },
      },
      {
        title: 'Operation',
        render: (text, record) => {
          let isDisabled = record.status == whiteListStatusType.INACTIVE ? true : false;
          return (
          <div>
            <a onClick={() => this.handleEdit(record.id)} disabled={isDisabled}>edit</a>
            &nbsp;|&nbsp;
            <Popconfirm title="Are you sure you want to delete this?" onConfirm={() => this.handleSingleRemove(record.id)} >
              <a disabled={isDisabled}>delete</a>
            </Popconfirm>
          </div>
          )
        },
      },
    ];
    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            {this.renderForm()}
          </div>
          <div className={styles.tableListOperator}>
            <Button type="primary" onClick={this.hanldleCreate}>Create</Button>
            <span>
              <Dropdown overlay={menu}>
                <Button>Batch<Icon type="down" /></Button>
              </Dropdown>
            </span>
            {this.renderBatchForm()}
            {
              selectedRowKeys.length > 0 && (
                <Popconfirm title="Are you sure you want to delete this?" onConfirm={(e) => this.handleBatchRemove(e)}>
                  <Button>Delete</Button>
                </Popconfirm>
              )
            }
            {
              selectedRowKeys.length > 0 && (
                <a href={this.state.batchExportUrl} onClick={(e)=>this.handleExport(e)} download='abcd.xlsx'>Export</a>
              )
            }
          </div>
        </div>
        <div style={{marginTop: '20px'}}>
          <div>
            <Alert
              message={(
                <div>
                  <a style={{fontWeight: 600}}>{selectedRowKeys.length}</a>&nbsp;{selectedRowKeys.length > 1 ? 'items' : 'item'} have been selected&nbsp;
                  <a onClick={this.cleanSelectedKeys} style={{marginLeft: 24}}>Reset</a>
                </div>
              )}
              type="info"
              showIcon
            />
          </div>
          <div style={{marginTop: '20px'}}>
            <Table
              loading={loading}
              rowSelection={rowSelection}
              columns={columns}
              rowKey='id'
              dataSource={this.props.data.list}
              pagination={paginationProps}
              onChange={this.handleTableChange}
            />
          </div>
        </div>
      </Card>
    );
  }
}
export default Form.create()(whitelist);
