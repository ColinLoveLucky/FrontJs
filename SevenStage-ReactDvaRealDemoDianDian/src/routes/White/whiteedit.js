import React, {Component} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import styles from './whiteedit.css';
import {Card, Button, Select, Popconfirm, Checkbox, Form, Input, Row, Col, DatePicker, InputNumber,message} from 'antd';

const placeholderMsg = {
  input: 'Pleae enter',
  select: 'Please enter',
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

class whiteedit extends Component {
  state = {
    checkbox: [],
    oneCheckbox: [],
    stateCheckbox: [],
  }

  onChange(val) {
    if (val.length === 1) {
      this.setState({oneCheckbox: val});
    }
    this.setState({checkbox: val});
    this.state.stateCheckbox = val;
    if (val.length < 1) {
      this.setState({checkbox: this.state.oneCheckbox});
    }
  }

  getFieldValue = (name) => {
    return this.props.form.getFieldValue(name);
  }

  /**保存数据**/
  handleSave = (e) => {
    e.preventDefault();

    let id = this.props.white.dataEdit.data.content.id;
    let checkPoint = this.getCheckboxState();
    let params = {
      "approvedAmount1Month": this.getFieldValue('ApprovedAmountCap1MonthsLow'),
      "approvedAmount2Month": this.getFieldValue('ApprovedAmountCap2MonthsLow'),
      "approvedAmount3Month": this.getFieldValue('ApprovedAmountCap3MonthsLow'),
      "approvedAmount7Days": this.getFieldValue('ApprovedAmountCap7DaysLow'),
      "bookingVol1Month": this.getFieldValue('BookingVolumeCap1MonthLow'),
      "bookingVol2Month": this.getFieldValue('BookingVolumeCap2MonthsLow'),
      "bookingVol3Month": this.getFieldValue('BookingVolumeCap3MonthsLow'),
      "bookingVol7Days": this.getFieldValue('BookingVolumeCap7DaysLow'),
      //"=campaignName": this.getFieldValue('ApprovedAmountCap7DaysLow'),
      "checkPoint": checkPoint,
      "companyType": this.getFieldValue('CompanyType'),
      "emailDomain": this.getFieldValue('CompanyPrivateEmailDomain'),
      "employeesSum": this.getFieldValue('ScaleOfEmployees'),
      "establishedDate": this.getFieldValue('CompanyEstablishedTime')._i,
      "id": id,
      "industry": this.getFieldValue('IndustryBusinessNature'),
      "isPublicly": this.getFieldValue('IsTheCompanyPubliclyListed') === 'true',
      "isScbApprovedCompany": this.getFieldValue('IsTheCompanyInSCBApprovedCompanyList') === 'true',
      "isScbSubcompany": this.getFieldValue('IsTheCompanyPartOfSCB') === 'true',
      //"mode": this.getFieldValue('ApprovedAmountCap7DaysLow'),
      "officialName": this.getFieldValue('CompanyOfficialName'),
      "officialWebsite": this.getFieldValue('CompanyOfficialWebsite'),
      "paidCapital": this.getFieldValue('ActualPaidCapital'),
      "phoneNumber": this.getFieldValue('CompanyRegisteredPhoneNumber'),
      "registNumber": this.getFieldValue('CompanySAICRegistrationNumber'),
      "registeredAddress": this.getFieldValue('CompanyRegisteredAddress'),
      "registeredCapital": this.getFieldValue('CompanyRegisteredCapital'),
      "status": this.getFieldValue('WhitelistStatus'),
      "stockCode": this.getFieldValue('StockCode'),
      "totalArea": this.getFieldValue('TotalAreaUsedForBusinessOperation')
    };

    this.props.dispatch({
      type: 'white/fetchEdit', payload: {
        params: params
      }
    });
  }

  componentWillMount = () => { 
    let company = this.props.white.dataEdit.data.content;
    let checks = company.checkPoint;
    this.setCheckboxState(checks);
  }

  /**设置checkbox中的值**/
  setCheckboxState = (checkState) => {
    let list = checkState.split('');
    let chks = ['A', 'B', 'C'];
    for (var i = 0; i < list.length; i++) {
      if ((i == 0 || i == 1 || i == 2) && list[i] == "1") {
        this.state.checkbox.push(chks[i]);
      }
    }
    this.setState({checkbox: this.state.checkbox});
  }

  getCheckboxState = () => {
    let chks = ['A', 'B', 'C'];
    let checkPoint = "";
    if (this.state.stateCheckbox.length == 0) {
      let company = this.props.white.dataEdit.data.content;
      checkPoint = company.checkPoint;
    } else {
      for (var i = 0; i < chks.length; i++) {
        if (this.state.stateCheckbox.indexOf(chks[i]) >= 0) {
          checkPoint += "1";
        } else {
          checkPoint += "0";
        }
      }
    }
    return checkPoint;
  }

  render() {
    this.state.obj = this.props.white;
    let company = this.props.white.dataEdit.data.content;
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSave} layout="inline">
          <Row>
            <Col span={4} offset={21}>
              <Button type="primary" htmlType="submit">Submit</Button>
              <span className={styles.margin_5}/>
              <Button>Cancel</Button>
            </Col>
          </Row>

          <Row>
            <Col span={5}>
              <div className={styles.margin_bottom_10}><h2>Basic information</h2></div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyOfficialName} hasFeedback>
                {getFieldDecorator('CompanyOfficialName', {
                  initialValue: company.officialName,
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.CompanyOfficialName}],
                })(
                  <Input placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyPrivateEmailDomain} hasFeedback>
                {getFieldDecorator('CompanyPrivateEmailDomain', {
                  initialValue: company.emailDomain,
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.CompanyPrivateEmailDomain}],
                })(
                  <Input placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyOfficialWebsite} hasFeedback>
                {getFieldDecorator('CompanyOfficialWebsite', {
                  initialValue: company.officialWebsite,
                  rules: [{required: false, message: placeholderMsg.input+fieldLabels.CompanyOfficialWebsite}],
                })(
                  <Input placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyRegisteredAddress} hasFeedback>
                {getFieldDecorator('CompanyRegisteredAddress', {
                  initialValue: company.registeredAddress,
                  rules: [{required: true, message:placeholderMsg.input+fieldLabels.CompanyRegisteredAddress}],
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
                  initialValue: company.phoneNumber,
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.CompanyRegisteredPhoneNumber}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanySAICRegistrationNumber} hasFeedback>
                {getFieldDecorator('CompanySAICRegistrationNumber', {
                  initialValue: company.registNumber,
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.CompanySAICRegistrationNumber}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyType} wrapperCol={{span: 19}} hasFeedback>
                {getFieldDecorator('CompanyType', {
                  initialValue: company.companyType,
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.CompanyType}],
                })(
                  <Select placeholder={placeholderMsg.input} style={{width: '155px'}}>
                    <Select.Option value="B">私企</Select.Option>
                    <Select.Option value="C">外企</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.IndustryBusinessNature} wrapperCol={{span: 15}} hasFeedback>
                {getFieldDecorator('IndustryBusinessNature', {
                  initialValue: company.industry,
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.IndustryBusinessNature}],
                })(
                  <Select placeholder={placeholderMsg.input} style={{width: '155px'}}>
                    <Select.Option value="B">制造业</Select.Option>
                    <Select.Option value="C">金融</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyEstablishedTime} hasFeedback>
                {getFieldDecorator('CompanyEstablishedTime', {
                  initialValue: moment(company.establishedDate, 'YYYY-MM-DD'),
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.CompanyEstablishedTime}],
                })(
                  <DatePicker placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.CompanyRegisteredCapital} hasFeedback>
                {getFieldDecorator('CompanyRegisteredCapital', {
                  initialValue: company.registeredCapital,
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.CompanyRegisteredCapital}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={5} md={12} sm={24}>
              <FormItem label={fieldLabels.ActualPaidCapital} hasFeedback>
                {getFieldDecorator('ActualPaidCapital', {
                  initialValue: company.paidCapital,
                  rules: [{required: true, message:placeholderMsg.input+fieldLabels.ActualPaidCapital}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={{span: 5, offset: 1}} md={12} sm={24}>
              <FormItem label={fieldLabels.ScaleOfEmployees} hasFeedback>
                {getFieldDecorator('ScaleOfEmployees', {
                  initialValue: company.employeesSum,
                  rules: [{required: true, message:placeholderMsg.input+fieldLabels.ScaleOfEmployees}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.TotalAreaUsedForBusinessOperation} hasFeedback>
                {getFieldDecorator('TotalAreaUsedForBusinessOperation', {
                  initialValue: company.totalArea,
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.TotalAreaUsedForBusinessOperation}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.IsTheCompanyPubliclyListed} hasFeedback>
                {getFieldDecorator('IsTheCompanyPubliclyListed', {
                  initialValue: company.isPublicly.toString(),
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.IsTheCompanyPubliclyListed}],
                })(
                  <Select placeholder={placeholderMsg.input} style={{width: '155px'}}>
                    <Select.Option value="true">YES</Select.Option>
                    <Select.Option value="false">NO</Select.Option>
                  </Select>
                )}
              </FormItem>


            </Col>

            <Col xl={{span: 4}} lg={{span: 4}} md={{span: 12}} sm={24}>
              <Form.Item label={fieldLabels.StockCode}>
                {getFieldDecorator('StockCode', {
                  initialValue: company.stockCode,
                  rules: [{required: false, message: placeholderMsg.input+fieldLabels.stockCode}],
                })(
                  <Input placeholder={placeholderMsg.input}/>,
                )}
              </Form.Item>
            </Col>

            <Col lg={{span: 6, offset: 2}} md={12} sm={24}>
              <FormItem label={fieldLabels.IsTheCompanyPartOfSCB} labelCol={{span: 14}} hasFeedback>
                {getFieldDecorator('IsTheCompanyPartOfSCB', {
                  initialValue: company.isScbSubcompany.toString(),
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.IsTheCompanyPartOfSCB}],
                })(
                  <Select placeholder={placeholderMsg.input} style={{width: '155px'}}>
                    <Select.Option value="true">YES</Select.Option>
                    <Select.Option value="false">NO</Select.Option>
                  </Select>
                )}
              </FormItem>


            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.IsTheCompanyInSCBApprovedCompanyList} wrapperCol={{span: 14}} hasFeedback>
                {getFieldDecorator('IsTheCompanyInSCBApprovedCompanyList', {
                  initialValue: company.isScbApprovedCompany.toString(),
                  rules: [{required: true, message:  placeholderMsg.input+fieldLabels.IsTheCompanyInSCBApprovedCompanyList}],
                })(
                  <Select placeholder={placeholderMsg.input} style={{width: '155px'}}>
                    <Select.Option value="true">YES</Select.Option>
                    <Select.Option value="false">NO</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col lg={5} md={12} sm={24}>
              <FormItem label={fieldLabels.WhitelistStatus} hasFeedback>
                {getFieldDecorator('WhitelistStatus', {
                  initialValue: company.status,
                  rules: [{required: true, message:  placeholderMsg.input+fieldLabels.WhitelistStatus}],
                })(
                  <Select placeholder={placeholderMsg.input} style={{width: '155px'}}>
                    <Select.Option value="ACTIVE">Active</Select.Option>
                    <Select.Option value="INACTIVE">Inactive</Select.Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col lg={{span: 6, offset: 1}} md={12} sm={24}>
              <FormItem label={fieldLabels.BookingVolumeCap7DaysLow} hasFeedback>
                {getFieldDecorator('BookingVolumeCap7DaysLow', {
                  initialValue: company.bookingVol7Days,
                  rules: [{required: true, message:  placeholderMsg.input+fieldLabels.BookingVolumeCap7DaysLow}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.BookingVolumeCap1MonthLow} hasFeedback>
                {getFieldDecorator('BookingVolumeCap1MonthLow', {
                  initialValue: company.bookingVol1Month,
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.BookingVolumeCap1MonthLow}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.BookingVolumeCap2MonthsLow} hasFeedback>
                {getFieldDecorator('BookingVolumeCap2MonthsLow', {
                  initialValue: company.bookingVol2Month,
                  rules: [{required: true, message:  placeholderMsg.input+fieldLabels.BookingVolumeCap2MonthsLow}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.BookingVolumeCap3MonthsLow} hasFeedback>
                {getFieldDecorator('BookingVolumeCap3MonthsLow', {
                  initialValue: company.bookingVol3Month,
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.BookingVolumeCap3MonthsLow}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.ApprovedAmountCap7DaysLow} hasFeedback>
                {getFieldDecorator('ApprovedAmountCap7DaysLow', {
                  initialValue: company.approvedAmount7Days,
                  rules: [{required: true, message:placeholderMsg.input+fieldLabels.ApprovedAmountCap7DaysLow}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.ApprovedAmountCap1MonthsLow} hasFeedback>
                {getFieldDecorator('ApprovedAmountCap1MonthsLow', {
                  initialValue: company.approvedAmount1Month,
                  rules: [{required: true, message:placeholderMsg.input+fieldLabels.ApprovedAmountCap1MonthsLow}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.ApprovedAmountCap2MonthsLow} hasFeedback>
                {getFieldDecorator('ApprovedAmountCap2MonthsLow', {
                  initialValue: company.approvedAmount2Month,
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.ApprovedAmountCap2MonthsLow}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <FormItem label={fieldLabels.ApprovedAmountCap3MonthsLow} hasFeedback>
                {getFieldDecorator('ApprovedAmountCap3MonthsLow', {
                  initialValue: company.approvedAmount3Month,
                  rules: [{required: true, message: placeholderMsg.input+fieldLabels.ApprovedAmountCap3MonthsLow}],
                })(
                  <InputNumber placeholder={placeholderMsg.input} style={{width: '100%'}}/>,
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col span={24}>
            <div className={styles.inset }></div>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <div className={styles.margin_bottom_10}><h2>Duplicate check</h2></div>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Checkbox.Group value={this.state.checkbox} onChange={value => this.onChange(value)}>
              <Checkbox className={styles.check_margin} value="A">Company SAIC registration
                number</Checkbox><br />
              <Checkbox className={styles.check_margin} value="B">Company official nameregistration
                number</Checkbox><br />
              <Checkbox className={styles.check_margin} value="C">Email domainnameregistration
                number</Checkbox>
            </Checkbox.Group>

          </Col>
          <Col span={12} offset={8}/>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {white: store.white};
}

export default connect(mapStateToProps)(Form.create()(whiteedit));
