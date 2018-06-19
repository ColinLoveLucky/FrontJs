/**
 * Created by HaihuaHuang on 2018/1/2.
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import {
  Layout,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  Popconfirm,
  Alert,
  Table,
  Modal,
  Checkbox,
  Upload,
  message,
  Progress
} from 'antd';

import {
  actionType,
  responseStatus,
  whiteListStatusType,
  displayType,
  auditType,
  auditStatusType,
  operationType
} from '../../utils/constObject';
import styles from './whitelist.less';
import appStyles from './whitelistapprove.less';
const {Header, Content, Footer, Sider} = Layout;
const {TextArea} = Input;
import moment from 'moment';


const FormItem = Form.Item;
const {Option} = Select;

const formItemLayout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

const enterMsg = "Company name";

class whiteapprove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      onDelete: this.props.onDelete,
      filteredInfo: null,
      selectedRow: {}
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.handleSearch();
  }

  getFieldValue = (name) => {
    return this.props.form.getFieldValue(name);
  }

  getSearchModel = (pageNumber = 1, pageSzie = 10) => {
    const officialName = this.getFieldValue('CompanyName');
    const searchCondition = {
      "officialName": officialName,
      "auditStatus": auditStatusType.PENDING
    };
    const searchModel = {
      "condition": searchCondition,
      "pageNumber": pageNumber,
      "pageSize": pageSzie,
      "sort": "DESC",
      "sortName": "updatedDate",
    };
    return searchModel;
  }

  handleSearch = (e = null, pageNumber = 1, pageSzie = 10) => {
    if (e != null) {
      e.preventDefault();
    }
    const searchModel = this.getSearchModel(pageNumber, pageSzie);
    this.props.dispatch({
      type: 'whiteListApprove/loadData', payload: {
        action: actionType.SEARCH,
        searchModel: searchModel
      }
    });
  }

  handleAudit = (ids, action) => {
    const searchModel = this.getSearchModel();
    this.props.dispatch({
      type: 'whiteListApprove/loadData', payload: {
        action: action,
        ids: ids,
        searchModel: searchModel
      }
    });
  }

  handleSingleAudit = (id, action) => {
    if (id != null) {
      let ids = [];
      ids.push(key);
      this.handleAudit(ids, action);
    }
  }

  handleBatchAudit = (action) => {
    let rows = this.state.selectedRows;
    if (rows != null && rows.length > 0) {
      let ids = [];
      for (let index in rows) {
        let row = rows[index];
        ids.push(row.id);
      }
      this.handleAudit(ids, action);
      this.handleRowSelectChange([], []);
    }
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }
    this.setState({selectedRowKeys, selectedRows});
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
    });
    //this.props.onChange(pagination, filters, sorter);
  }


  handleTableSelect = (record, index, event) => {
    if (record.id) {
      this.props.dispatch({
        type: 'whiteListApprove/fetchCampaignsLogs',
        payload: {
          key: record.id
        }
      });
    } else {
      location.href = "#/app/WhiteListedApprove";
    }


    this.setState({selectedRow: record});

  }

  handleDetail(key) {
    location.href = "#/app/whiteListed/Detail/" + key;
  }

  getOperationType = (whiteListStatus, updatedTime, createdTime) => {
    let opType = null;
    if (whiteListStatus == whiteListStatusType.INACTIVE) {
      opType = operationType.DELETE;
    } else if (updatedTime != null && createdTime != null && updatedTime == createdTime) {
      opType = operationType.CREATE;
    } else {
      opType = operationType.Update;
    }
    return opType;
  }


  renderSearchForm() {
    const {getFieldDecorator} = this.props.form;
    let {selectedRowKeys} = this.state;
    return (
      <Form>
        <Row gutter={40}>
          <Col span={12}>
            <FormItem label='' {...formItemLayout}>
              {getFieldDecorator('CompanyName')(
                <Input placeholder={enterMsg} suffix={<Icon type="search"/>}
                       onPressEnter={(e) => this.handleSearch(e)}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <span className={styles.tableListOperator}>
              {
                selectedRowKeys.length > 0 && (
                  <Button type="primary" htmlType="submit"
                          onClick={() => this.handleBatchAudit(actionType.APPROVE)}>Approve</Button>
                )
              }
              {
                selectedRowKeys.length > 0 && (
                  <Button onClick={() => this.handleBatchAudit(actionType.REJECT)}>Reject</Button>
                )
              }
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  htmlField = (field) => {
    console.log(field);
    const logs = this.props.data.dataCompanyLogs.data;
    if (logs && logs.result == "success" && logs.content && logs.content.length > 0) {
      let content = logs.content;
      let obj = {};
      console.log('CREATE_COMPANY', content);
      for (var i = 0; i < content.length; i++) {
        obj = content[i];
        if (obj.operationType == 'CREATE_COMPANY') {
          console.log(obj);
          break;
        }
      }
      console.log(obj);
      const index = obj.operationContent.split(":[{")[0].indexOf('create company');
      if (index > -1) {

      }
    }
  };


  render() {
    let {selectedRowKeys, filteredInfo, selectedRow} = this.state;
    let {pagination, loading, data} = this.props;
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      total: data.list.pageTotal * data.list.pageSize,
      onShowSizeChange: (current, size) => {
        this.handleSearch(null, current, size);
      },
      onChange: (page, pageSize) => {
        this.handleSearch(null, page, pageSize);
        console.log(page, pageSize);
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
        className: styles.hideTitle,
      },
      {
        title: 'Company name',
        dataIndex: 'officialName',
      },
      {
        title: 'Time',
        dataIndex: 'updatedDate',
        render: (text) => (moment(text).format("YYYYMMDD HH:MM")),
      },
      {
        title: 'Operation type',
        dataIndex: 'operationType',
        filters: [
          {
            text: operationType.CREATE,
            value: operationType.CREATE,
          },
          {
            text: operationType.UPDATE,
            value: operationType.UPDATE,
          },
          {
            text: operationType.DELETE,
            value: operationType.DELETE,
          },
        ],
        filteredValue: filteredInfo.operationType || null,
        onFilter: (value, record) => record.operationType.includes(value),
        render(text, record) {
          let spanClass = styles.antBadgeStatusDot;
          if (text == operationType.Approved) {
            spanClass += " " + styles.antBadgeStatusApproved;
          }
          else if (text == operationType.Reject) {
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
    ];

    const campaignCols = [
      {
        dataIndex: 'id',
        className: styles.hideTitle,
      },
      {
        title: 'Campaign name',
        dataIndex: 'name',
      }, {
        title: 'Booking volume cap',
        dataIndex: 'bookingVol',
      }, {
        title: 'Approved amount cap',
        dataIndex: 'approvedAmount',
      },
      {
        title: 'Initiate datetime',
        dataIndex: 'startTime',
        render: (text) => <span> {moment(text).format("YYYY-MM-DD")} </span>,
      },
      {
        title: 'End datetime',
        dataIndex: 'endTime',
        render: (text) => <span> {moment(text).format("YYYY-MM-DD")} </span>,
      },
      {
        title: 'Ops Status',
        dataIndex: 'auditStatus',
      },
    ];

    const columnsLog = [{
      title: 'Time',
      dataIndex: 'createdDate',
      render: (text) => <span> {moment(text).format("YYYY-MM-DD")} </span>,
    }, {
      title: 'Operator',
      dataIndex: 'username',
    }, {
      title: 'description',
      dataIndex: 'operationContent',
    }];

    return (
      <div>
        <Row>
          <Col span={8} style={{paddingRight: 20}} className={appStyles.antBorder}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>
                {this.renderSearchForm()}
              </div>
            </div>
            <div style={{marginTop: '20px'}}>
              <div>
                <Alert
                  message={(
                    <div>
                      <a
                        style={{fontWeight: 600}}>{selectedRowKeys.length}</a>&nbsp;{selectedRowKeys.length > 1 ? 'items' : 'item'}
                      have been selected&nbsp;
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
                  onRowClick={this.handleTableSelect}
                />
              </div>
            </div>
          </Col>
          <Col span={15} className={appStyles.antCol}>
            <div style={{fontWeight: '500', color: 'rgba(0, 0, 0, 0.85)', fontSize: '2em'}}>Wal-Mart Stores</div>
            <div style={{marginTop: 10, marginBottom: 10}}>
              <div className={appStyles.antFloat_Left}><label className={appStyles.antFontSize_1}>Whitelist
                Status:&nbsp;&nbsp;&nbsp;</label><span>{selectedRow.status}</span></div>
              <div className={appStyles.antFloat_Left} style={{marginLeft: 50, marginRight: 50}}><label
                className={appStyles.antFontSize_1}>Ops
                status:&nbsp;&nbsp;&nbsp;</label><span>{selectedRow.auditStatus}</span>
              </div>
              <div className={appStyles.antFloat_Left}><label className={appStyles.antFontSize_1}>operation
                type:&nbsp;&nbsp;&nbsp;</label><span>{selectedRow.operationType}</span></div>
              <div className={appStyles.antFloat_Right}>
                  <span className={styles.submitButtons} style={{width: 100}}>
                    <Button type="primary" htmlType="submit" style={{marginLeft: 32}}>Approve</Button>
                    <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>Reject</Button>
                  </span>
              </div>
            </div>
            <div className={appStyles.antWidth}></div>
            <div className={appStyles.antTitle}>
              <h2>Basic information</h2>
            </div>
            <div style={{marginTop: 10}}>
              <table style={{width: 860, height: 200}}>
                <tbody>
                <tr>
                  <td>
                    <span>Company official name : </span>
                    {
                      this.htmlField('officialName')
                    }
                    <strike>detail.officialName</strike>
                  </td>
                  <td>
                    <span>Company private email domain : </span>
                    <strike>detail.emailDomain</strike>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{color: "black"}}>{"detail.officialName130"}</span>
                  </td>
                  <td>
                    <span>Company private email domain : </span>
                    <span style={{color: "black"}}>{"detail.emailDomain"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Company official website : </span>
                    <span style={{color: "black"}}>{"detail.officialWebsite"}</span>
                  </td>
                  <td>
                    <span>Company registered address : </span>
                    <span style={{color: "black"}}>{"detail.registeredAddress"}</span>
                  </td>
                </tr>


                <tr>
                  <td>
                    <span>Company registered phone number : </span>
                    <span style={{color: "black"}}>{"detail.phoneNumber"}</span>
                  </td>
                  <td>
                    <span>Company SAIC registration number : </span>
                    <span style={{color: "black"}}>{"detail.registNumber"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Company type (SCB criterion) : </span>
                    <span style={{color: "black"}}>{"detail.companyType"}</span>
                  </td>
                  <td>
                    <span>Industry/Business nature(SCB criterion) : </span>
                    <span style={{color: "black"}}>{"detail.industry"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Company established time : </span>
                    <span style={{color: "black"}}>{"detail.establishedDate"}</span>
                  </td>
                  <td>
                    <span>Company registered capital : </span>
                    <span style={{color: "black"}}>{"detail.registeredCapital"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Actual paid capital : </span>
                    <span style={{color: "black"}}>{"detail.paidCapital"}</span>
                  </td>
                  <td>
                    <span>Scale of employees : </span>
                    <span style={{color: "black"}}>{"detail.employeesSum"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Total area used for business operation : </span>
                    <span style={{color: "black"}}>{"detail.totalArea"}</span>
                  </td>
                  <td>
                    <span>Is the company publicly listed : </span>
                    <span style={{color: "black"}}>{"detail.isScbSubcompany"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Stock code : </span>
                    <span style={{color: "black"}}>{"detail.stockCode"}</span>
                  </td>
                  <td>
                    <span>Is the company part of SCB : </span>
                    <span style={{color: "black"}}>{"detail.isScbSubcompany"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Is the company in SCB approved company list : </span>
                    <span style={{color: "black"}}>{"detail.isScbApprovedCompany"}</span>
                  </td>
                  <td>
                    <span>Whitelist status : </span>
                    <span style={{color: "black"}}>{"detail.status"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Booking volume cap (7 days) - low : </span>
                    <span style={{color: "black"}}>{"detail.bookingVol7Days"}</span>
                  </td>
                  <td>
                    <span>Booking volume cap (1 months) - low : </span>
                    <span style={{color: "black"}}>{"detail.bookingVol1Month"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Booking volume cap (2 months) - low : </span>
                    <span style={{color: "black"}}>{"detail.bookingVol2Month"}</span>
                  </td>
                  <td>
                    <span>Booking volume cap (3 months) - low : </span>
                    <span style={{color: "black"}}>{"detail.bookingVol3Month"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Approved amount cap (7 days) - low : </span>
                    <span style={{color: "black"}}>{"detail.approvedAmount7Days"}</span>
                  </td>
                  <td>
                    <span>Approved amount cap (1 months) - low : </span>
                    <span style={{color: "black"}}>{"detail.approvedAmount1Month"}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Approved amount cap (2 months) - low : </span>
                    <span style={{color: "black"}}>{"detail.approvedAmount2Month"}</span>
                  </td>
                  <td>
                    <span>Approved amount cap (3 months) - low : </span>
                    <span style={{color: "black"}}>{"detail.approvedAmount3Month"}</span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h2>Duplicate chech</h2>
            </div>
            <div style={{marginTop: 15,}}>
              <Row>
                <Icon type="check"/>&nbsp;
                <span>Company SAIC registraction number</span>
              </Row>
              <Row style={{marginTop: 8,}}>
                <Icon type="check"/>&nbsp;
                <span>Company official nameregistraction number</span>
              </Row>
              <Row style={{marginTop: 8,}}>
                <Icon type="check"/>&nbsp;
                <span>Email domainnameregistraction number</span>
              </Row>
            </div>

            <div style={{marginTop: 25}}>
              <h2>Campaign</h2>
            </div>
            <div style={{marginTop: 10}}>
              <Table columns={campaignCols}
                     rowKey='id'
                     dataSource={this.state.campaignsList}/>
            </div>

            <div style={{marginTop: 25}}>
              <h2>Aduit Log</h2>
            </div>
            <div style={{marginTop: 10}}>
              <div>
                <Table columns={columnsLog}
                       rowKey='id'
                       style={{width: 700}}
                       dataSource={this.state.companyLogs}
                />
              </div>
              <div style={{width: 500, marginTop: 60}}>
                <div style={{width: 60, float: "left"}}><span>Comment:</span></div>
                <FormItem hasFeedback>
                  {/*   {getFieldDecorator('comment', {})(
                   <TextArea rows={5} style={{width: 440}}/>
                   )}*/}
                  <TextArea rows={5} style={{width: 440}}/>
                </FormItem>
                <Button type="primary" onClick={() => this.AddComment()} style={{float: "right"}}>Add</Button>
              </div>
            </div>


          </Col>
        </Row>
      </div>
    );
  }
}
export default Form.create()(whiteapprove);
