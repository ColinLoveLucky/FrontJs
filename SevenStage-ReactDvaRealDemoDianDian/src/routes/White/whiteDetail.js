import React, {Component} from 'react';
import { connect } from 'dva';
import styles from './whiteDetail.css';
import {Card,Icon,Row,Button,Table,Modal,Form,Input} from 'antd';
const FormItem = Form.Item;

class whiteDetail extends Component {

  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
   // console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  }
 deatilEdit(key) {
    this.props.dispatch({
      type: 'white/fetchDetail',
      payload: {
        path:"#/app/white/whiteedit",
        key: key
      }
    });
  }

  render() {
    //const {getFieldDecorator} = this.props.form;
/*    console.log("基础数据："+this.props.white.dataEdit);
    console.log("活动数据："+this.props.white.dataCampaigns);*/
    console.log(this.props.white,'this.props.white');
    let detail =this.props.white.dataEdit.data.content;
    let campaignsList = this.props.white.dataCampaigns.data.content;
    const columns = [{
      title: 'Campaign name',
      dataIndex: 'campaignName',
    }, {
      title: 'Booking volume cap',
      dataIndex: 'bookingVolumeCap',
    }, {
      title: 'Approved amount cap',
      dataIndex: 'approvedAmountCap',
    },
      {
        title: 'Initiate datetime',
        dataIndex: 'initiateDatetime',
      },
      {
        title: 'End datetime',
        dataIndex: 'endDatetime',
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
        dataIndex: 'opsStatus',
      },
      {
        title: 'Operation',
        render: (text, record) => (
          <div>
            <a style={{marginRight: "2px"}} onClick={() => this.handleEdit(record.key)}>edit</a>
            |
            <Popconfirm title="Are you sure you want to delete this?" onConfirm={() => this.handleSingleRemove(record.key)}>
              <a style={{marginLeft: "2px"}}>delete</a>
            </Popconfirm>
          </div>
        ),
      },];

    const columns1 = [{
      title: 'Time',
      dataIndex: 'time',
    }, {
      title: 'Operator',
      dataIndex: 'operator',
    }, {
      title: 'description',
      dataIndex: 'description',
    }
    ];

      return (
        <div>
          <div style={{float:"right"}}>
            <Button type="primary" onClick={() => this.deatilEdit(detail.id)}>Edit</Button>&nbsp;
          </div>
          <div>
              <h2>Basic information</h2>
          </div>
          <div style={{marginTop:10}}>
            <table style={{width:1100,height:200}}>
              <tr>
                <td>
                   <span>Company official name : </span>
                   <span style={{ color:"black"}}>{detail.officialName}</span>
                </td>
                <td>
                  <span>Company private email domain : </span>
                  <span style={{ color:"black"}}>{detail.emailDomain}</span>
                </td>
                <td>
                  <span>Company official website : </span>
                  <span style={{ color:"black"}}>{detail.officialWebsite}</span>
                </td>
                <td>
                  <span>Company registered address : </span>
                  <span style={{ color:"black"}}>{detail.registeredAddress}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Company registered phone number : </span>
                  <span style={{ color:"black"}}>{detail.phoneNumber}</span>
                </td>
                <td>
                  <span>Company SAIC registration number : </span>
                  <span style={{ color:"black"}}>{detail.registNumber}</span>
                </td>
                <td>
                  <span>Company type (SCB criterion) : </span>
                  <span style={{ color:"black"}}>{detail.companyType}</span>
                </td>
                <td>
                  <span>Industry/Business nature(SCB criterion) : </span>
                  <span style={{ color:"black"}}>{detail.industry}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Company established time : </span>
                  <span style={{ color:"black"}}>{detail.establishedDate}</span>
                </td>
                <td>
                  <span>Company registered capital : </span>
                  <span style={{ color:"black"}}>{detail.registeredCapital}</span>
                </td>
                <td>
                  <span>Actual paid capital : </span>
                  <span style={{ color:"black"}}>{detail.paidCapital}</span>
                </td>
                <td>
                  <span>Scale of employees : </span>
                  <span style={{ color:"black"}}>{detail.employeesSum}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Total area used for business operation : </span>
                  <span style={{ color:"black"}}>{detail.totalArea}</span>
                </td>
                <td>
                  <span>Is the company publicly listed : </span>
                  <span style={{ color:"black"}}>{detail.isScbSubcompany}</span>
                </td>
                <td>
                  <span>Stock code : </span>
                  <span style={{ color:"black"}}>{detail.stockCode}</span>
                </td>
                <td>
                  <span>Is the company part of SCB : </span>
                  <span style={{ color:"black"}}>{detail.isScbSubcompany}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Is the company in SCB approved company list : </span>
                  <span style={{ color:"black"}}>{detail.isScbApprovedCompany}</span>
                </td>
                <td>
                  <span>Whitelist status : </span>
                  <span style={{ color:"black"}}>{detail.status}</span>
                </td>
                <td>
                  <span>Booking volume cap (7 days) - low : </span>
                  <span style={{ color:"black"}}>{detail.bookingVol7Days}</span>
                </td>
                <td>
                  <span>Booking volume cap (1 months) - low : </span>
                  <span style={{ color:"black"}}>{detail.bookingVol1Month}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Booking volume cap (2 months) - low : </span>
                  <span style={{ color:"black"}}>{detail.bookingVol2Month}</span>
                </td>
                <td>
                  <span>Booking volume cap (3 months) - low : </span>
                  <span style={{ color:"black"}}>{detail.bookingVol3Month}</span>
                </td>
                <td>
                  <span>Approved amount cap (7 days) - low : </span>
                  <span style={{ color:"black"}}>{detail.approvedAmount7Days}</span>
                </td>
                <td>
                  <span>Approved amount cap (1 months) - low : </span>
                  <span style={{ color:"black"}}>{detail.approvedAmount1Month}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Approved amount cap (2 months) - low : </span>
                  <span style={{ color:"black"}}>{detail.approvedAmount2Month}</span>
                </td>
                <td>
                  <span>Approved amount cap (3 months) - low : </span>
                  <span style={{ color:"black"}}>{detail.approvedAmount3Month}</span>
                </td>
              </tr>
              </table>
          </div>
          <div style={{marginTop:25,borderTop:"1px solid #ECECEC",}}>
          </div>
          <div style={{marginTop:25}}>
            <h2>Duplicate chech</h2>
          </div>
          <div style={{ marginTop:15,}}>
            <Row>
              <Icon type="check" style={{color: "#39B3EA",fontWeight:"bold"}} />&nbsp;
              <span>Company SAIC registraction number</span>
            </Row>
            <Row style={{ marginTop:5,}}>
              <Icon type="check" style={{color: "#39B3EA",fontWeight:"bold"}} />&nbsp;
              <span>Company official nameregistraction number</span>
            </Row>
            <Row style={{ marginTop:5,}}>
              <Icon type="check" style={{color: "#39B3EA",fontWeight:"bold"}} />&nbsp;
              <span>Email domainnameregistraction number</span>
            </Row>
          </div>
          <div style={{float:"right"}}>
            <Button type="primary" onClick={this.showModal}>Add</Button>
            <Modal
              title="Barch creation"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              >
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  <span>Campaign name</span>
                  <Input size="large" placeholder="large size" />
                  <span>Booking volume cap</span>
                  <Input size="large" placeholder="large size" />
                </FormItem>
                <FormItem>
                  <span>Booking amount cap</span>
                  <Input size="large" placeholder="large size" />
                </FormItem>
              </Form>
            </Modal>
          </div>
          <div style={{marginTop:25}}>
            <h2>Campaign</h2>
          </div>
          <div style={{marginTop:10}}>
              <Table  columns={columns}   dataSource={campaignsList}  />
          </div>
          <div style={{marginTop:25}}>
            <h2>Aduit Log</h2>
          </div>
          <div style={{marginTop:10}}>
            <Table  columns={columns1} />
          </div>
        </div>


      );
    }
}

function mapStateToProps(store) {
  console.log(store.white);
  return {white: store.white};
}

export default connect(mapStateToProps)(Form.create()(whiteDetail));
