import React, {Component} from 'react';
import {connect} from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, Popconfirm, Alert, Table, Modal, Checkbox, Upload, message, Progress  } from 'antd';
import { actionType, responseStatus, whiteListStatusType, batchOperateType, batchOperateText, batchUploadStatusType, progressStatus, displayType, whiteListCheckType, whiteListCheckText, auditStatusType } from '../../utils/constObject';
import styles from './whitelist.less';
import {exportWhiteListByIdsAsync, batchOperateWhiteListByCheckpPointAsync} from '../../services/whiteapi';

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
      batchOperateTypeKey:"",
      batchOperateVisible:false,
      batchUploadClosable:true,
      batchUploadStatus:batchUploadStatusType.UPLOAD,
      batchUploadInfo:"",
      batchUploadProgressStatus:progressStatus.ACTIVE,
      batchExportUrl:"",
      chkSAICStatus:true,
      chkOfficialNameStatus:true,
      chkEmailStatus:true,
      batchUploadFile: "",
      uploadPercent:0,
      batchUploadErrMsg:"",
      batchUploadSetInterval:null,
      batchUploadAction:""
    }
  }

  componentDidMount(){
    console.log("componentDidMount");

    this.handleSearch();
  }

  getFieldValue = (name) => {
    return this.props.form.getFieldValue(name);
  }

  getSearchModel = (pageNumber = 1, pageSzie = 10) => {
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
      "pageNumber": pageNumber,
      "pageSize": pageSzie,
      "sort": "DESC",
      "sortName": "updatedDate",
    };
    return searchModel;
  }

  handleSearch = (e = null, pageNumber = 1, pageSzie = 10) => {
    if(e != null){
      e.preventDefault();
    }
    const searchModel = this.getSearchModel(pageNumber, pageSzie);
    this.props.dispatch({
      type: 'whiteList/loadData', payload: {
        action: actionType.SEARCH,
        searchModel: searchModel
      }
    });
  }

  handleSetWhiteListStatus = (ids, action) => {
    const searchModel = this.getSearchModel();
    this.props.dispatch({
      type: 'whiteList/loadData', payload: {
        action: action,
        ids: ids,
        searchModel: searchModel
      }
    });
  }

  handleSingleRemove(key) {
    if(key != null){
      let ids = [];
      ids.push(key);
      this.handleSetWhiteListStatus(ids, actionType.DELETE);
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
      this.handleSetWhiteListStatus(ids, actionType.DELETE);
      this.handleRowSelectChange([], []);
    }
  }

  handleSingleActivate(key) {
    if(key != null){
      let ids = [];
      ids.push(key);
      this.handleSetWhiteListStatus(ids, actionType.ACTIVATE);
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
      window.location.href="/admin/api/whiteList/batch/export/companys/" + ids.concat(",");
      // var data = "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";
      // //var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      // var blob = new Blob([data], {type: 'application/vnd.ms-excel	application/x-excel'});
      // //var blob = new Blob([data], {type: 'application/octet-binary'});
      // //var blob = new Blob([data], {type:'application/octet-stream'});
      // var blob = new Blob([data]);
      // const url= (window.URL || window.webkitURL).createObjectURL(blob);
      // let a = document.createElement('a');
      // a.href = url;
      // a.download = "whitelist.xlsx";
      // //a.download = "whitelist.xls";
      // a.click();
      // a.remove();

      //window.location.href=url;

      //const response = exportWhiteListByIdsAsync(ids,{});
      //console.log(response.hasOwnProperty("result"));
      //if(response != null && !response.hasOwnProperty("result")){
        //var debug = {hello: "world"};
        //var blob = new Blob([JSON.stringify(debug, null, 2)]);
        //var blob = new Blob([blob]);
        //var blob = new Blob([response], {type: "application/octet-binary"});
        //var blob = new Blob([response]);
        // var testData = [1, 2, 3, 4, 5];
        //console.log(response);
        //var blob = new Blob([response.body], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        //var blob = new Blob([response.body], {type: "application/octet-stream"});
        //var blob = new Blob([response], {type: "application/octet-stream"});
        //var blob = "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";
        //const url= (window.URL || window.webkitURL).createObjectURL(blob);
        //console.log(blob);
        //var url = response;
        //console.log(url);
        //console.log(response);
        //this.setState({batchExportUrl:url});
      //}else if(response.result == responseStatus.ERROR){
        // Warning
      //}
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
        this.setState({
          batchOperateTitle:batchOperateText.ADD,
          batchOperateTypeKey:batchOperateType.ADD,
          batchOperateVisible: true,
        });
        break;

      case batchOperateType.UPDATE:
        this.setState({
          batchOperateTitle:batchOperateText.UPDATE,
          batchOperateTypeKey:batchOperateType.UPDATE,
          batchOperateVisible: true,
        });
        break;
    }
  }

  handleBatchCancel = (e = null) => {
    if(e != null){
      e.preventDefault();
    }
    this.setState({
      batchOperateVisible:false,
      batchUploadClosable:true,
      batchUploadStatus:batchUploadStatusType.UPLOAD,
      batchUploadInfo:"",
      batchUploadProgressStatus:progressStatus.ACTIVE,
      batchExportUrl:"",
      chkSAICStatus:true,
      chkOfficialNameStatus:true,
      chkEmailStatus:true,
      batchUploadFile: "",
      uploadPercent:0,
      batchUploadErrMsg:""
    });
  }

  handleBatchBack = (e = null) => {
    if(e != null){
      e.preventDefault();
    }
    this.setState({
      batchOperateVisible:true,
      batchUploadClosable:true,
      batchUploadStatus:batchUploadStatusType.UPLOAD,
      batchUploadInfo:"",
      batchUploadProgressStatus:progressStatus.ACTIVE,
      batchExportUrl:"",
      chkSAICStatus:true,
      chkOfficialNameStatus:true,
      chkEmailStatus:true,
      batchUploadFile: "",
      uploadPercent:0,
      batchUploadErrMsg:""
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
    window.location.href = "#/app/whiteListed/Create";
  }

  handleEdit(key) {
    window.location.href = "#/app/whiteListed/Edit/" + key
  }

  handleDetail(key) {
    window.location.href = "#/app/whiteListed/Detail/" + key;
  }

  /*
  handleDownloadTemplate = (e) => {
    if(e != null){
      e.preventDefault();
    }
    window.location.href = "/admin/api/whiteList/batch/save/template";
  }
  */

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

  handleUploadChange = (info) => {
    let { batchOperateTypeKey, batchUploadFile} = this.state;
    let fileName = info.file.name;
    let ts  = setInterval((t) => {
      if(t.state.uploadPercent < 90){
        let percent = t.state.uploadPercent + Math.floor(10 * Math.random());
        //console.log(percent);
        t.setState({
          batchUploadClosable:false,
          uploadPercent:percent,
          batchUploadStatus:batchUploadStatusType.UPLOADING,
          batchUploadInfo:fileName + " Uploading"
        });
      }
    }, 10, this);
    //console.log("ts outer:", ts);
    const checkPoint = this.getBatchUploadCheckPoint();
    const batchUpload = batchOperateWhiteListByCheckpPointAsync(checkPoint, batchOperateTypeKey, info.file);
    let state = this;
    batchUpload.then(function (response) {
      clearInterval(ts);
      //console.log("to background!");
      if(response != null && response.data != null){
        console.log(response.data);
        if (response.data.result === responseStatus.SUCCESS) {
          state.setState({
            batchUploadClosable:true,
            uploadPercent: 100,
            batchUploadStatus:batchUploadStatusType.SUCCESS,
            batchUploadProgressStatus: progressStatus.SUCCESS,
            batchUploadInfo:fileName + " Upload successfully",
            batchUploadErrMsg:""
          });
        }else if(response.data.result === responseStatus.ERROR){
          state.setState({
            batchUploadClosable:true,
            batchUploadStatus:batchUploadStatusType.FAILURE,
            batchUploadErrMsg:response.data.errorMsg
          });
        }
      }else {
        state.setState({
          batchUploadClosable:true,
          batchUploadProgressStatus: progressStatus.EXCEPTION,
          batchUploadStatus:batchUploadStatusType.EXCEPTION,
          batchUploadInfo:fileName + " Upload failure",
        });
      }
    });
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
            <FormItem label={labelObj.CompanyName} {...formItemLayout} hasFeedback>
              {getFieldDecorator('CompanyName', {
                rules: [{required: false}, {
                  max: 128,
                  message: 'max length 128'
                }],
              })(
                <Input placeholder={enterMsg} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.EmailDomain} {...formItemLayout} hasFeedback>
              {getFieldDecorator('EmailDomain', {
                rules: [{required: false}, {
                  max: 32,
                  message: 'max length 32'
                }],
              })(
                <Input placeholder={enterMsg} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.SAICNumber} {...formItemLayout} hasFeedback>
              {getFieldDecorator('SAICNumber')(
                <Input placeholder={enterMsg} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.PartOfSCB} {...formItemLayout} hasFeedback>
              {getFieldDecorator('PartOfSCB')(
                <Select placeholder={selectMsg}>
                  <Option value="true">true</Option>
                  <Option value="false">false</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.Mode} {...formItemLayout} hasFeedback>
              {getFieldDecorator('Mode')(
                <Select placeholder={selectMsg}>
                  <Option value="NOMAL">NOMAL</Option>
                  <Option value="CAMPAIGN">CAMPAIGN</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.CampaignName} {...formItemLayout} hasFeedback>
              {getFieldDecorator('CampaignName', {
                rules: [{required: false}, {
                  max: 32,
                  message: 'max length 32'
                }],
              })(
                <Input placeholder={enterMsg} />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.WhitelistStatus} {...formItemLayout} hasFeedback>
              {getFieldDecorator('WhitelistStatus')(
                <Select placeholder={selectMsg}>
                  <Option value="ACTIVE">ACTIVE</Option>
                  <Option value="INACTIVE">INACTIVE</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={labelObj.OpsStatus} {...formItemLayout} hasFeedback>
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

  renderBatchUploadFooter(){
    let result = null;
    if(this.state.batchUploadStatus === batchUploadStatusType.SUCCESS){
      result = [<Button key="submit" type="primary" onClick={() => this.handleBatchCancel()}>Submit</Button>];
    }else if(this.state.batchUploadStatus === batchUploadStatusType.FAILURE || this.state.batchUploadStatus === batchUploadStatusType.EXCEPTION){
      result = [<Button key="back" type="primary" onClick={() => this.handleBatchBack()}>Back</Button>];
    }else{
     // Do Nothing
    }
    return (
      result
    );
  }

  getBatchUploadCheckPoint = () => {
    let { chkSAICStatus, chkOfficialNameStatus, chkEmailStatus } = this.state;
    return (chkSAICStatus ? "1" : "0") + (chkOfficialNameStatus ? "1" : "0") + (chkEmailStatus ? "1" : "0");
  }

  renderBatchUploadAction = () => {
    let action = null;
    let checkPoint = this.getBatchUploadCheckPoint();
    switch(this.state.batchOperateTypeKey){
      case batchOperateType.ADD:
        action = "/admin/api/whiteList/batch/add/companys/" + checkPoint;
        break;

      case batchOperateType.UPDATE:
        action = "/admin/api/whiteList/batch/update/companys/" + checkPoint;
        break
    }
    return (action);
  }

  renderBatchForm(){
    const {getFieldDecorator} = this.props.form;
    const props = {
      accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      beforeUpload: (file) => {
        this.setState({
          batchUploadFile:file
        });
        return false;
      },
    };
    return (
        <Modal
          title={this.state.batchOperateTitle}
          visible={this.state.batchOperateVisible}
          onCancel={this.handleBatchCancel}
          closable = {this.state.batchUploadClosable}
          footer={this.renderBatchUploadFooter()}
        >
          <div style={{display:this.state.batchUploadStatus === batchUploadStatusType.UPLOAD ? displayType.BLOCK : displayType.NONE}}>
            <Form layout="inline">
              <Row type="flex" justify="center" className={styles.batchTips}>
                <Col>
                  <span style={{fontSize:14}}>1.Duplicate check</span>
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
              <Row type="flex" justify="center" className={styles.batchTips}>
                <Col>
                  <span style={{fontSize:14}}>2.Upload Excel</span>
                </Col>
              </Row>
              <Row type="flex" justify="center" className={styles.batchRow}>
                <Col >
                  <span>
                    {/*<Upload {...props} beforeUpload={(file) => this.handleBeforeUpload(file)} onChange={() => this.handleUploadChange()} showUploadList={false}>*/}
                    <Upload {...props} showUploadList={false} onChange={(info) => this.handleUploadChange(info)} action={this.renderBatchUploadAction()}>
                      <Button>
                        <Icon type="upload" /> Click to Upload
                      </Button>
                    </Upload>
                  </span>
                </Col>
              </Row>
              <Row type="flex" justify="center" className={styles.batchRow} style={{display:this.state.batchOperateTypeKey === batchOperateType.ADD ? "" : displayType.NONE}}>
                <Col>
                  <span>Supported formats:.xlsx</span>
                </Col>
              </Row>
              <Row type="flex" justify="center" className={styles.batchRow} style={{display:this.state.batchOperateTypeKey === batchOperateType.ADD ? "" : displayType.NONE}}>
                <Col>
                  <span><Icon type="download" /><a href="/admin/api/whiteList/batch/save/template" download="whitelist.xlsx">Download template</a></span>
                </Col>
              </Row>
            </Form>
          </div>
          <div style={{textAlign:"center", display: [batchUploadStatusType.UPLOADING, batchUploadStatusType.SUCCESS, batchUploadStatusType.EXCEPTION].indexOf(this.state.batchUploadStatus) >= 0 ? displayType.BLOCK : displayType.NONE}}>
            <div style={{display:"inline"}}>{this.state.batchUploadInfo}</div>
            <Progress percent={this.state.uploadPercent} status={this.state.batchUploadProgressStatus} />
          </div>
          <div style={{display:this.state.batchUploadStatus === batchUploadStatusType.FAILURE ? displayType.BLOCK : displayType.NONE}}>
            <div>{this.state.batchUploadFile.name + " upload failure"}</div>
            <div>That's the reason:</div>
            <div>{this.state.batchUploadErrMsg}</div>
          </div>
        </Modal>
    );
  }

  render() {
    let { selectedRowKeys, filteredInfo } = this.state;
    let { pagination, loading, data } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key={batchOperateType.ADD}>{batchOperateText.ADD}</Menu.Item>
        <Menu.Item key={batchOperateType.UPDATE}>{batchOperateText.UPDATE}</Menu.Item>
      </Menu>
    );
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      total:data.list.pageTotal  * data.list.pageSize,
      onShowSizeChange: (current, size) => {
        this.handleSearch(null, current, size);
      },
      onChange:(page, pageSize) => {
        this.handleSearch(null, page, pageSize);
      },
      ...pagination,
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
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
            text: auditStatusType.APPROVED,
            value: auditStatusType.APPROVED,
          },
          {
            text: auditStatusType.REJECT,
            value: auditStatusType.REJECT,
          },
          {
            text: auditStatusType.PENDING,
            value: auditStatusType.PENDING,
          },
        ],
        filteredValue: filteredInfo.auditStatus || null,
        onFilter: (value, record) => record.auditStatus.includes(value),
        render(text) {
          let spanClass = styles.antBadgeStatusDot;
          if (text == auditStatusType.APPROVED) {
            spanClass += " " + styles.antBadgeStatusApproved;
          }
          else if (text == auditStatusType.REJECT) {
            spanClass += " " + styles.antBadgeStatusRejected;
          }
          else if (text == auditStatusType.PENDING) {
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
          let activateDisabled = (record.auditStatus == auditStatusType.REJECT && record.status == whiteListStatusType.INACTIVE) ? false : true;
          let editDisabled = (record.auditStatus == auditStatusType.PENDING ||
            (record.auditStatus == auditStatusType.APPROVED && record.status == whiteListStatusType.INACTIVE)) ? true : false;
          return (
            <div>
              <div style={{ display: activateDisabled ? displayType.BLOCK : displayType.NONE}}>
                <a onClick={() => this.handleEdit(record.id)} disabled={editDisabled}>edit</a>
                &nbsp;|&nbsp;
                <Popconfirm title="Are you sure you want to delete this?" onConfirm={() => this.handleSingleRemove(record.id)} >
                  <a disabled={editDisabled}>delete</a>
                </Popconfirm>
              </div>
              <div style={{ display: activateDisabled ? displayType.NONE : displayType.BLOCK}}>
                <Popconfirm title="Are you sure you want to activate this?" onConfirm={() => this.handleSingleActivate(record.id)} >
                  <a disabled={activateDisabled}>activate</a>
                </Popconfirm>
              </div>
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
                <Button onClick={(e)=>this.handleExport(e)}>Export</Button>
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
              dataSource={data.list.data}
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
