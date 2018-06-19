import React, {Component} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import styles from './whiteDetail.css';

import {Card, Icon, Row, Button, Table, Modal, Form, Input, Popconfirm, Col, DatePicker,InputNumber} from 'antd';

import NumericInput from '../../components/numInput';

const {TextArea} = Input;
const FormItem = Form.Item;


const placeholderMsg = {
  input: 'Pleae enter ',
  select: 'Please enter ',
};

const fieldLabels = {
  CampaignName: {key: "CampaignName", name: "Campaign name"},
  BookingVolumeCap: {key: "BookingVolumeCap", name: "Booking volume cap"},
  ApprovedAmountCap: {key: "ApprovedAmountCap", name: "Approved amount cap"},
  InitiateDatetime: {key: "InitiateDatetime", name: "Initiate datetime"},
  EndDatetime: {key: "EndDatetime", name: "End datetime"},
  Approver1: {key: "Approver1", name: "Approver1"},
  Approver2: {key: "Approver2", name: "Approver2"},
};

class whiteDetail extends Component {

  state = {
    visible: false,
    companyId: "",
    companyState:true,
    campaignId:"",
    modelState:"create",
    modelTitle:"Barch creation",

    startValue: moment(),
    endValue: null,
    endOpen: false,
    campaignsList: null,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    let params = {
      "approvedAmount": this.getFieldValue(fieldLabels.ApprovedAmountCap.key),
      "auditStatus": "PENDING",
      "bookingVol": this.getFieldValue(fieldLabels.BookingVolumeCap.key),
      "companyId": this.state.companyId,
      "id": this.state.campaignId,
      "endTime": this.getFieldValue(fieldLabels.InitiateDatetime.key).format('YYYY-MM-DD'),
      "name": this.getFieldValue(fieldLabels.CampaignName.key),
      "startTime": this.getFieldValue(fieldLabels.EndDatetime.key).format('YYYY-MM-DD'),
      "approver1": this.getFieldValue(fieldLabels.Approver1.key),
      "approver2": this.getFieldValue(fieldLabels.Approver2.key),
      "status": "ACTIVE"
    };

    console.log(JSON.stringify(params));
    if (this.state.modelState == "create") {
      this.createCampaign(params);
    } else {
      this.editCampaign(params);
    }
    this.props.form.resetFields();
    this.setState({
      visible: false,
    });
  }

  //创建活动信息
  createCampaign=(params)=> {
   this.props.dispatch({
      type: 'white/fetchAddCampaign', payload: {
        params: params
      }
    });
  }

  //编辑活动信息
  editCampaign=(params)=> {
    this.props.dispatch({
      type: 'white/fetchEditCampagna', payload: {
        params: params
      }
    });
  }


  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  getFieldValue = (name) => {
    return this.props.form.getFieldValue(name);
  }
  setFieldValue=(obj)=>{
      this.props.form.setFieldsValue(obj);
  }


  //日期控件使用函数
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    console.log(startValue);
    console.log(endValue);

    if (!startValue || !endValue) {
      return false;
      // return moment.valueOf() <= startValue.valueOf();
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({endOpen: true});
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({endOpen: open});
  }

  handleSingleRemove(key) {
    console.log(key, 'keykeykeykey');
    let keys = [key];
    this.props.dispatch({
      type: 'white/fetchDeleteCampaign', payload: {
        params: keys
      }
    });
  }

  deatilEdit(key) {
    this.props.dispatch({
      type: 'white/fetchDetail',
      payload: {
        path: "#/app/white/whiteedit",
        key: key
      }
    });
  }

  /**编辑活动信息**/
  handleEdit(obj) {
    this.state.modelState = "edit";
    this.state.campaignId = obj.id;
    this.state.modelTitle = "Barch edit";

    const ApprovedAmountCap = fieldLabels.ApprovedAmountCap.key;
    const BookingVolumeCap = fieldLabels.BookingVolumeCap.key;
    const InitiateDatetime = fieldLabels.InitiateDatetime.key;
    const CampaignName = fieldLabels.CampaignName.key;
    const EndDatetime = fieldLabels.EndDatetime.key;
    const Approver1 = fieldLabels.Approver1.key;
    const Approver2 = fieldLabels.Approver2.key;

    this.setFieldValue({
      ApprovedAmountCap: obj.approvedAmount,
      BookingVolumeCap: obj.bookingVol,
      InitiateDatetime: moment(obj.endTime),
      CampaignName: obj.name,
      EndDatetime: moment(obj.startTime),
      Approver1: obj.approver1,
      Approver2: obj.approver2
    });
    this.setState({
      visible: true,
    });
  }

  AddComment(key) {
    let params = {
      "comment": this.getFieldValue("comment"),
      "id": this.state.companyId
    };
    this.props.dispatch({
      type: 'white/fetchAddComment',
      payload: {
        params: params
      }
    });
  }

  componentWillMount() {
    let key = this.props.match.params.companyId;
    if (key) {
      this.props.dispatch({
        type: 'white/fetchAllDetail',
        payload: {
          key: key
        }
      });
    } else {
      location.href = "#/app/whiteListed";
    }
  }

  render() {
    let detail = {};
    //基础信息

    if (this.props.white.dataEdit.data) {
      detail = this.props.white.dataEdit.data.content;
      this.state.companyId = detail.id;
      this.state.companyState=detail.status == "INACTIVE" ? true : false
    }
    //活动列表
    if (this.props.white.dataCampaigns.data) {
      this.state.campaignsList = this.props.white.dataCampaigns.data.content;
    }
    //日志列表
    if (this.props.white.dataCompanyLogs.data) {
      this.state.companyLogs = this.props.white.dataCompanyLogs.data.content;
    }
    const {getFieldDecorator} = this.props.form;
    const {startValue, endValue, endOpen} = this.state;


    let list =detail.checkPoint!=null ? detail.checkPoint.split(''):null;
    let style1 = {
      color: "#39B3EA",
      fontWeight: "bold"
    }
    let style2 = {
      color: "#39B3EA",
      fontWeight: "bold"
    }
    let style3 = {
      color: "#39B3EA",
      fontWeight: "bold"
    }
    if ( list && list[0] == "0"   ) {
      style1 = {display: "none"}
    }
    if ( list && list[1] == "0"   ) {
      style1 = {display: "none"}
    }
    if ( list && list[2] == "0"   ) {
      style1 = {display: "none"}
    }



    const columns = [
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
        render: (text) =><span> {moment(text).format("YYYYMMDD hh:mm")} </span>,
      },
      {
        title: 'End datetime',
        dataIndex: 'endTime',
        render: (text) =><span> {moment(text).format("YYYYMMDD hh:mm")} </span>,
      },
      {
        title: 'Approver1',
        dataIndex: 'approver1',
      },
      {
        title: 'Approver2',
        dataIndex: 'approver2',
      },
      {
        title: 'Ops Status',
        dataIndex: 'auditStatus',
      },
      {
        title: 'Operation',
        render: (text, record) => {
          let campaignStatus = 'ACTIVE' == record.status ? true :false ;
          let isDisabled = true;
          if (!this.state.companyState && campaignStatus){
            isDisabled = false;
          }


          return (  <div>
              <a style={{marginRight: "2px"}} onClick={() => this.handleEdit(record)}
                 disabled={isDisabled}>edit</a>
              &nbsp;|&nbsp;
              <Popconfirm title="Are you sure you want to delete this?"
                          onConfirm={() => this.handleSingleRemove(record.id)}>
                <a style={{marginLeft: "2px"}} disabled={isDisabled}>delete</a>

              </Popconfirm>
            </div>
          )
        },
      },];

    const columns1 = [{
      title: 'Time',
      dataIndex: 'createdDate',
      render: (text) =><span> {moment(text).format("YYYYMMDD hh:mm")} </span>,
    }, {
      title: 'Operator',
      dataIndex: 'username',
    }, {
      title: 'description',
      dataIndex: 'operationContent',
    }];

    return (
      <div>
        <div style={{marginTop: 25}}>
          <div style={{float: "right"}}>
            <Button type="primary"
                    onClick={() => this.deatilEdit(detail.id)}
                    disabled={detail.status == "INACTIVE" ? true : false }>Edit</Button>&nbsp;
          </div>
          <div>
            <h2>Basic information</h2>
          </div>
          <div style={{marginTop: 10}}>
            <table style={{width: 1250, height: 200}}>
              <tbody>
              <tr>
                <td>
                  <span>Company official name : </span>
                  <span style={{color: "black"}}>{detail.officialName}</span>
                </td>
                <td>
                  <span>Company private email domain : </span>
                  <span style={{color: "black"}}>{detail.emailDomain}</span>
                </td>
                <td>
                  <span>Company official website : </span>
                  <span style={{color: "black"}}>{detail.officialWebsite}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Company registered address : </span>
                  <span style={{color: "black"}}>{detail.registeredAddress}</span>
                </td>
                <td>
                  <span>Company registered phone number : </span>
                  <span style={{color: "black"}}>{detail.phoneNumber}</span>
                </td>
                <td>
                  <span>Company SAIC registration number : </span>
                  <span style={{color: "black"}}>{detail.registNumber}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Company type (SCB criterion) : </span>
                  <span style={{color: "black"}}>{detail.companyType}</span>
                </td>
                <td>
                  <span>Industry/Business nature(SCB criterion) : </span>
                  <span style={{color: "black"}}>{detail.industry}</span>
                </td>
                <td>
                  <span>Company established time : </span>
                  <span style={{color: "black"}}>{detail.establishedDate}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Company registered capital : </span>
                  <span style={{color: "black"}}>{detail.registeredCapital}</span>
                </td>
                <td>
                  <span>Actual paid capital : </span>
                  <span style={{color: "black"}}>{detail.paidCapital}</span>
                </td>
                <td>
                  <span>Scale of employees : </span>
                  <span style={{color: "black"}}>{detail.employeesSum}</span>
                </td>
                </tr>
              <tr>
                <td>
                  <span>Total area used for business operation : </span>
                  <span style={{color: "black"}}>{detail.totalArea}</span>
                </td>
                <td>
                  <span>Is the company publicly listed : </span>
                  <span style={{color: "black"}}>{detail.isScbSubcompany}</span>
                </td>
                <td>
                  <span>Stock code : </span>
                  <span style={{color: "black"}}>{detail.stockCode}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Is the company part of SCB : </span>
                  <span style={{color: "black"}}>{detail.isScbSubcompany}</span>
                </td>
                <td>
                  <span>Is the company in SCB approved company list : </span>
                  <span style={{color: "black"}}>{detail.isScbApprovedCompany}</span>
                </td>
                <td>
                  <span>Whitelist status : </span>
                  <span style={{color: "black"}}>{detail.status}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Booking volume cap (7 days) - low : </span>
                  <span style={{color: "black"}}>{detail.bookingVol7Days}</span>
                </td>
                <td>
                  <span>Booking volume cap (1 months) - low : </span>
                  <span style={{color: "black"}}>{detail.bookingVol1Month}</span>
                </td>
                <td>
                  <span>Booking volume cap (2 months) - low : </span>
                  <span style={{color: "black"}}>{detail.bookingVol2Month}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Booking volume cap (3 months) - low : </span>
                  <span style={{color: "black"}}>{detail.bookingVol3Month}</span>
                </td>
                <td>
                  <span>Approved amount cap (7 days) - low : </span>
                  <span style={{color: "black"}}>{detail.approvedAmount7Days}</span>
                </td>
                <td>
                  <span>Approved amount cap (1 months) - low : </span>
                  <span style={{color: "black"}}>{detail.approvedAmount1Month}</span>
                </td>
                </tr>
              <tr>
                <td>
                  <span>Approved amount cap (2 months) - low : </span>
                  <span style={{color: "black"}}>{detail.approvedAmount2Month}</span>
                </td>
                <td>
                  <span>Approved amount cap (3 months) - low : </span>
                  <span style={{color: "black"}}>{detail.approvedAmount3Month}</span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div style={{marginTop: 25}}>
            <h2>Duplicate chech</h2>
          </div>
          <div style={{marginTop: 15,}}>
            <Row>
              <Icon type="check" style={style1}/>&nbsp;
              <span>Company SAIC registraction number</span>
            </Row>
            <Row style={{marginTop: 5,}}>
              <Icon type="check" style={style2}/>&nbsp;
              <span>Company official nameregistraction number</span>
            </Row>
            <Row style={{marginTop: 5,}}>
              <Icon type="check" style={style3}/>&nbsp;
              <span>Email domainnameregistraction number</span>
            </Row>
          </div>
          <div style={{float: "right"}}>
            <Button type="primary" onClick={this.showModal}
                    disabled={detail.status == "INACTIVE" ? true : false }>Add</Button>
            <Modal
              title={this.state.modelTitle}
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Form>
                <Row gutter={16}>
                  <Col lg={{span: 10, offset: 1}}>
                    <FormItem label={fieldLabels.CampaignName.name} hasFeedback>
                      {getFieldDecorator(fieldLabels.CampaignName.key, {
                        rules: [{required: true, message: placeholderMsg.input + fieldLabels.CampaignName.name}],
                      })(
                        <Input placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={{span: 10, offset: 2}}>
                    <FormItem label={fieldLabels.BookingVolumeCap.name} hasFeedback>
                      {getFieldDecorator(fieldLabels.BookingVolumeCap.key, {
                        rules: [{required: true, message: placeholderMsg.input + fieldLabels.BookingVolumeCap.name}],
                      })(
                        <NumericInput placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col lg={{span: 10, offset: 1}}>
                    <FormItem label={"ApprovedAmountCap"} hasFeedback>
                      {getFieldDecorator("ApprovedAmountCap", {
                        rules: [{required: true, message: placeholderMsg.input + fieldLabels.ApprovedAmountCap.name}],
                      })(
                        <NumericInput placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={{span: 10, offset: 2}}>
                    {/* <FormItem label={fieldLabels.InitiateDatetime} hasFeedback>
                     {getFieldDecorator('InitiateDatetime', {
                     initialValue: 2,
                     rules: [{required: true, message: placeholderMsg.input + fieldLabels.InitiateDatetime}],
                     })(
                     <Input placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                     )}
                     </FormItem>*/}
                  </Col>
                </Row>
                <Row>
                  <Col lg={{span: 10, offset: 1}}>
                    <FormItem label={fieldLabels.InitiateDatetime.name} hasFeedback>
                      {getFieldDecorator(fieldLabels.InitiateDatetime.key, {
                        initialValue: startValue,
                        rules: [{required: true, message: placeholderMsg.input + fieldLabels.InitiateDatetime.name}],
                      })(
                        <DatePicker
                          disabledDate={this.disabledStartDate}
                          placeholder={placeholderMsg.input}
                          format='YYYY-MM-DD'
                          style={{width: '100%'}}
                          onChange={this.onStartChange}
                          onOpenChange={this.handleStartOpenChange}
                        />,
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={{span: 10, offset: 2}}>
                    <FormItem label={fieldLabels.EndDatetime.name} hasFeedback>
                      {getFieldDecorator(fieldLabels.EndDatetime.key, {
                        initialValue: endValue,
                        rules: [{required: true, message: placeholderMsg.input + fieldLabels.EndDatetime.name}],
                      })(
                        <DatePicker
                          disabledDate={this.disabledEndDate}
                          placeholder={placeholderMsg.input}
                          format='YYYY-MM-DD'
                          style={{width: '100%'}}
                          onChange={this.onEndChange}
                          open={endOpen}
                          onOpenChange={this.handleEndOpenChange}
                        />,
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col lg={{span: 10, offset: 1}}>
                    <FormItem label={fieldLabels.Approver1.name} hasFeedback>
                      {getFieldDecorator(fieldLabels.Approver1.key, {
                        rules: [{required: true, message: placeholderMsg.input + fieldLabels.Approver1.name}],
                      })(
                        <Input placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                      )}
                    </FormItem>
                  </Col>
                  <Col lg={{span: 10, offset: 2}}>
                    <FormItem label={fieldLabels.Approver2.name} hasFeedback>
                      {getFieldDecorator(fieldLabels.Approver2.key, {
                        rules: [{required: true, message: placeholderMsg.input + fieldLabels.Approver2.name}],
                      })(
                        <Input placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Modal>
          </div>
        </div>

        <div style={{marginTop: 25}}>
          <h2>Campaign</h2>
        </div>
        <div style={{marginTop: 10}}>
          <Table columns={columns}
                 rowKey='id'
                 dataSource={this.state.campaignsList}/>
        </div>
        <div style={{marginTop: 25}}>
          <h2>Aduit Log</h2>
        </div>
        <div style={{marginTop: 10}}>
          <div style={{float: "left"}}>
            <Table columns={columns1}
                   rowKey='id'
                   style={{width: 700}}
                   dataSource={this.state.companyLogs}
            />
          </div>
          <div style={{float: "right", width:500}}>
            <div style={{width:60,float:"left"}}><span>Comment:</span></div>
            <FormItem hasFeedback>
              {getFieldDecorator('comment', {})(
                <TextArea rows={5} style={{width: 440}}/>
              )}
            </FormItem>
            <Button type="primary" onClick={() => this.AddComment()} style={{float: "right"}}>Add</Button>
          </div>
        </div>
      </div>
    );
  };
}

function mapStateToProps(store) {
  return {white: store.white};
}

export default connect(mapStateToProps)(Form.create()(whiteDetail))
;
