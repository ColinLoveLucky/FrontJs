import React, {Component} from 'react';
import {connect} from 'dva';
import styles from './whiteedit.css';
import {
  Card,
  Button,
  Popconfirm,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Select,
  message
} from 'antd';
import NumericInput from '../../components/numInput';

const CheckboxGroup = Checkbox.Group;
const placeholderMsg = {
  input: 'Pleae enter',
  select: "please select"
};
const FormItem = Form.Item;
const fieldLabels = {
  CompanyOfficialName: 'Company official name',
  CompanyPrivateEmailDomain: 'Company private email domain',
  CompanyOfficialWebsite: 'Company official website',
  CompanyRegisteredAddress: 'Company registered address',
  CompanyRegisteredPhoneNumber: 'Company registered phone number',
  CompanySAICRegistrationNumber: 'Company SAIC registration number',
  CompanyType: 'Company type (SCB criterion)',
  IndustryBusinessNature: 'Industry/Business nature(SCB criterion)',
  CompanyEstablishedTime: 'Company established time',
  CompanyRegisteredCapital: 'Company registered capital',
  ActualPaidCapital: 'Actual paid capital',
  ScaleOfEmployees: 'Scale of employees',
  TotalAreaUsedForBusinessOperation: 'Total area used for business operation',
  IsTheCompanyPubliclyListed: 'Is the company publicly listed',
  StockCode: 'Stock code',
  IsTheCompanyPartOfSCB: 'Is the company part of SCB',
  IsTheCompanyInSCBApprovedCompanyList: 'Is the company in SCB approved company list',
  WhitelistStatus: 'Whitelist    status:',
  BookingVolumeCap7DaysLow: 'Booking volume cap (7 days) - low',
  BookingVolumeCap1MonthLow: 'Booking volume cap (1 months) - low',
  BookingVolumeCap2MonthsLow: 'Booking volume cap (2 months) - low',
  BookingVolumeCap3MonthsLow: 'Booking volume cap (3 months) - low',
  ApprovedAmountCap7DaysLow: 'Approved amount cap (7 days) - low',
  ApprovedAmountCap1MonthsLow: 'Approved amount cap (1 months) - low',
  ApprovedAmountCap2MonthsLow: 'Approved amount cap (2 months) - low',
  ApprovedAmountCap3MonthsLow: 'Approved amount cap (3 months) - low',
};
const preInput = "please input ";

class whitecreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chkSAICStatus: true,
      chkOfficialStatus: true,
      chkEmailStatus: true,
      value: ''
    }
  }

  onChange(e) {
    if (e.target.id === "chkSAIC") {
      this.state.chkSAICStatus = e.target.checked;
    }
    else if (e.target.id === "chkOfficial") {
      this.state.chkOfficialStatus = e.target.checked;
    }
    else if (e.target.id === "chkEmail") {
      this.state.chkEmailStatus = e.target.checked;
    }
    if (!(this.state.chkSAICStatus || this.state.chkOfficialStatus || this.state.chkEmailStatus)) {
      e.target.checked = true;
      if (e.target.id === "chkSAIC") {
        this.state.chkSAICStatus = e.target.checked;
      }
      else if (e.target.id === "chkOfficial") {
        this.state.chkOfficialStatus = e.target.checked;
      }
      else if (e.target.id === "chkEmail") {
        this.state.chkEmailStatus = e.target.checked;
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'white/create', payload: values
        });
        if (this.props.white.createStatus) {
          //  message.success("Created Successfully");
          location.href = "#/app/white/whiteList";
        }
        else {
          // message.error(this.props.white.createErrorMsg);
        }
      }
    });
  }

  handleCancel = (e) => {
    e.preventDefault();
    location.href = "#/app/whiteListed";
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Row>
          <Col span={4} offset={21}>
            <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
            <span className={styles.margin_5}/>
            <Popconfirm title="Are you sure you want to cancel?" onConfirm={(e) => this.handleCancel(e)}>
              <Button>Cancel</Button>
            </Popconfirm>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <div className={styles.margin_bottom_10}><h2>Basic information</h2></div>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit} layout="inline">
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyOfficialName} hasFeedback>
                {getFieldDecorator('CompanyOfficialName', {
                  rules: [{required: true, message: preInput + fieldLabels.CompanyOfficialName}, {
                    max: 128,
                    message: 'max length 128'
                  }],
                })(
                  <Input placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyPrivateEmailDomain} hasFeedback>
                {getFieldDecorator('CompanyPrivateEmailDomain', {
                  rules: [{required: true, message: preInput + fieldLabels.CompanyPrivateEmailDomain}, {
                    max: 32,
                    message: 'max length 32'
                  }],
                })(
                  <Input placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyOfficialWebsite} hasFeedback>
                {getFieldDecorator('CompanyOfficialWebsite', {
                  rules: [{required: false, message: preInput + fieldLabels.CompanyOfficialWebsite}, {
                    max: 128,
                    message: 'max length 128'
                  }],
                })(
                  <Input placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyRegisteredAddress} hasFeedback>
                {getFieldDecorator('CompanyRegisteredAddress', {
                  rules: [{required: true, message: preInput + fieldLabels.CompanyRegisteredAddress}, {
                    max: 128,
                    message: 'max length 128'
                  }],
                })(
                  <Input placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyRegisteredPhoneNumber} hasFeedback>
                {getFieldDecorator('CompanyRegisteredPhoneNumber', {
                  rules: [{required: true, message: preInput + fieldLabels.CompanyRegisteredPhoneNumber}],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="25"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanySAICRegistrationNumber} hasFeedback>
                {getFieldDecorator('CompanySAICRegistrationNumber', {
                  rules: [{required: true, message: preInput + fieldLabels.CompanySAICRegistrationNumber}, {
                    min: 13,
                    message: 'min length 13'
                  }],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="15"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyType} wrapperCol={{span: 19}} hasFeedback>
                {getFieldDecorator('CompanyType', {
                  rules: [{required: true, message: preInput + fieldLabels.CompanyType}],
                })(
                  <Select placeholder={placeholderMsg.input} style={{width: '155px'}}>
                    <Select.Option value="C">私企</Select.Option>
                    <Select.Option value="B">外企</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.IndustryBusinessNature} wrapperCol={{span: 15}} hasFeedback>
                {getFieldDecorator('IndustryBusinessNature', {
                  rules: [{required: true, message: preInput + fieldLabels.IndustryBusinessNature}],
                })(
                  <Select placeholder={placeholderMsg.input} style={{width: '155px'}}>
                    <Select.Option value="C">制造业</Select.Option>
                    <Select.Option value="B">金融</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyEstablishedTime} hasFeedback>
                {getFieldDecorator('CompanyEstablishedTime', {
                  rules: [{required: true, message: preInput + fieldLabels.CompanyEstablishedTime}],
                })(
                  <DatePicker placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyRegisteredCapital} hasFeedback>
                {getFieldDecorator('CompanyRegisteredCapital', {
                  rules: [{
                    required: true,
                    message: preInput + fieldLabels.CompanyRegisteredCapital
                  }, {pattern: "^\\d{0,15}(\\.\\d{1,3})?$", message: "Data format is wrong"}],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="18"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.ActualPaidCapital} labelCol={{span: 11, pull: 1}} hasFeedback>
                {getFieldDecorator('ActualPaidCapital', {
                  rules: [{
                    required: true,
                    message: preInput + fieldLabels.ActualPaidCapital
                  }, {pattern: "^\\d{0,15}(\\.\\d{1,3})?$", message: "Data format is wrong"}],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="18"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.ScaleOfEmployees} labelCol={{span: 11, pull: 1}} hasFeedback>
                {getFieldDecorator('ScaleOfEmployees', {
                  rules: [{required: true, message: preInput + fieldLabels.ScaleOfEmployees}, {
                    pattern: '^\\d{0,15}$',
                    message: "Data format is wrong"
                  }],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="15"/>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.TotalAreaUsedForBusinessOperation} hasFeedback>
                {getFieldDecorator('TotalAreaUsedForBusinessOperation', {
                  rules: [{
                    required: true,
                    message: preInput + fieldLabels.TotalAreaUsedForBusinessOperation
                  }, {pattern: "^\\d{0,15}(\\.\\d{1,3})?$", message: "Data format is wrong"}],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="18"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.IsTheCompanyPubliclyListed} hasFeedback>
                {getFieldDecorator('IsTheCompanyPubliclyListed', {
                  rules: [{required: true, message: preInput + fieldLabels.IsTheCompanyPubliclyListed}],
                })(
                  <Select placeholder={placeholderMsg.select} style={{width: '155px'}}>
                    <Select.Option value="true">Y</Select.Option>
                    <Select.Option value="false">N</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.StockCode} labelCol={{span: 11, pull: 3}}>
                {getFieldDecorator('StockCode', {
                  rules: [{required: false, message: '请输入'}, {max: 128, message: 'max length 128'}],
                })(
                  <Input placeholder={placeholderMsg.input}/>,
                )}
              </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.IsTheCompanyPartOfSCB} labelCol={{span: 14}} hasFeedback>
                {getFieldDecorator('IsTheCompanyPartOfSCB', {
                  rules: [{required: true, message: preInput + fieldLabels.IsTheCompanyPartOfSCB}],
                })(
                  <Select placeholder={placeholderMsg.select} style={{width: '155px'}}>
                    <Select.Option value="true">Y</Select.Option>
                    <Select.Option value="false">N</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.IsTheCompanyInSCBApprovedCompanyList} wrapperCol={{span: 14}} hasFeedback>
                {getFieldDecorator('IsTheCompanyInSCBApprovedCompanyList', {
                  rules: [{required: true, message: preInput + fieldLabels.IsTheCompanyInSCBApprovedCompanyList}],
                })(
                  <Select placeholder={placeholderMsg.select} style={{width: '155px'}}>
                    <Select.Option value="true">Y</Select.Option>
                    <Select.Option value="false">N</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col lg={5} md={12} sm={24}>
              <FormItem label={fieldLabels.WhitelistStatus} hasFeedback>
                {getFieldDecorator('WhitelistStatus', {
                  rules: [{required: true, message: preInput + fieldLabels.WhitelistStatus}],
                })(
                  <Select placeholder={placeholderMsg.select} style={{width: '155px'}}>
                    <Select.Option value="ACTIVE">Active</Select.Option>
                    <Select.Option value="INACTIVE">Inactive</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col lg={{span: 6, offset: 1}} md={12} sm={24}>
              <FormItem label={fieldLabels.BookingVolumeCap7DaysLow} hasFeedback>
                {getFieldDecorator('BookingVolumeCap7DaysLow', {
                  rules: [{
                    required: true,
                    message: preInput + fieldLabels.BookingVolumeCap7DaysLow
                  }, {pattern: '^\\d{0,15}$', message: "Data format is wrong"}],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="15"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.BookingVolumeCap1MonthLow} hasFeedback>
                {getFieldDecorator('BookingVolumeCap1MonthLow', {
                  rules: [{
                    required: true,
                    message: preInput + fieldLabels.BookingVolumeCap1MonthLow
                  }, {pattern: '^\\d{0,15}$', message: "Data format is wrong"}],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="15"/>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.BookingVolumeCap2MonthsLow} hasFeedback>
                {getFieldDecorator('BookingVolumeCap2MonthsLow', {
                  rules: [{
                    required: true,
                    message: preInput + fieldLabels.BookingVolumeCap2MonthsLow
                  }, {pattern: '^\\d{0,15}$', message: "Data format is wrong"}],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="15"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.BookingVolumeCap3MonthsLow} hasFeedback>
                {getFieldDecorator('BookingVolumeCap3MonthsLow', {
                  rules: [{
                    required: true,
                    message: preInput + fieldLabels.BookingVolumeCap3MonthsLow
                  }, {pattern: '^\\d{0,15}$', message: "Data format is wrong"}],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="15"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.ApprovedAmountCap7DaysLow} hasFeedback>
                {getFieldDecorator('ApprovedAmountCap7DaysLow', {
                  rules: [{
                    required: true,
                    message: preInput + fieldLabels.ApprovedAmountCap7DaysLow
                  }, {pattern: '^\\d{0,15}$', message: "Data format is wrong"}],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="15"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.ApprovedAmountCap1MonthsLow} hasFeedback>
                {getFieldDecorator('ApprovedAmountCap1MonthsLow', {
                  rules: [{
                    required: true,
                    message: preInput + fieldLabels.ApprovedAmountCap1MonthsLow
                  }, {pattern: '^\\d{0,15}$', message: "Data format is wrong"}],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="15"/>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.ApprovedAmountCap2MonthsLow} hasFeedback>
                {getFieldDecorator('ApprovedAmountCap2MonthsLow', {
                  rules: [{required: true, message: preInput + fieldLabels.ApprovedAmountCap2MonthsLow}],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="18"/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.ApprovedAmountCap3MonthsLow} hasFeedback>
                {getFieldDecorator('ApprovedAmountCap3MonthsLow', {
                  rules: [{required: true, message: preInput + fieldLabels.ApprovedAmountCap3MonthsLow}],
                })(
                  <NumericInput style={{width: '100%'}} placeholder={placeholderMsg.input} maxLength="18"/>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className={styles.inset}></div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className={styles.margin_bottom_10}><h2>Duplicate check</h2></div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem>
                {getFieldDecorator('chkSAIC', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox className={styles.check_margin} onChange={(e) => this.onChange(e)}>Company SAIC
                    registration</Checkbox>
                )}
              </FormItem>
              <br/>
              <FormItem>
                {getFieldDecorator('chkOfficial', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox className={styles.check_margin} onChange={(e) => this.onChange(e)}>Company official
                    name registration</Checkbox>
                )}
              </FormItem><br/>
              <FormItem>
                {getFieldDecorator('chkEmail', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox className={styles.check_margin} onChange={(e) => this.onChange(e)}>Email
                    domain namer egistration</Checkbox>
                )}
              </FormItem>
            </Col>
            <Col span={12} offset={8}/>
          </Row>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    white: store.white
  };
}

export default connect(mapStateToProps)(Form.create()(whitecreate));
