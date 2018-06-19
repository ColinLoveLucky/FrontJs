// import React, {Component} from 'react';
// import {connect} from 'dva';
// import styles from './welcome.css';
//
// class welcome extends Component {
//   render() {
//     return (
//       <div className={styles.normal}>
//         Hi,Welcome!
//       </div>
//     );
//   }
// }
//
//
// function mapStateToProps() {
//   return {};
// }
//
// export default connect(mapStateToProps)(welcome);

import {Form, Row, Col, Input, Button, Icon, DatePicker, Upload} from 'antd';

import {queryUsr} from '../../services/whiteapi';

const FormItem = Form.Item;
import styles from './welcome.css';

class AdvancedSearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
      expand: false,
      url:"",
    }
  }


  handleSearch = (e) => {
    const dataVal = queryUsr();
    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   var debug = {hello: "world"};
    //   var blob = new Blob([JSON.stringify(debug, null, 2)],
    //     {type: 'application/json'});
    //     const url= (window.URL || window.webkitURL).createObjectURL(blob);
    //     this.setState({url:url});
    // });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const {expand} = this.state;
    this.setState({expand: !expand});
  }

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 15 : 10;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19},
    };
    const children = [];
    for (let i = 0; i < 15; i++) {
      children.push(
        <Col span={8} key={i} style={{display: i < count ? 'block' : 'none'}}>
          <FormItem {...formItemLayout} label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`)(
              <Input placeholder="placeholder"/>
            )}
          </FormItem>
        </Col>
      );
    }
    return children;
  }



  render() {
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19},
    };
    const {getFieldDecorator} = this.props.form;
    return (
      <Form
        className={styles.ant}
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          <Col span={8} key="22">
            <FormItem label="Company" {...formItemLayout}>
              {getFieldDecorator('CompanyName2')(
                <Input placeholder="hiii"/>
              )}
            </FormItem>
          </Col>
          <Col span={8} key="42">
            <FormItem label="hihi" {...formItemLayout}>
              {getFieldDecorator('CompanyName21')(
                <Input placeholder="hiii"/>
              )}
            </FormItem>
          </Col>
          <Col span={8} key="51">
            <FormItem label="12" {...formItemLayout}>
              {getFieldDecorator('CompanyName31')(
                <Input placeholder="hiii"/>
              )}
            </FormItem>
          </Col>
          <Col span={8} key="61">
            <FormItem label="Comww" {...formItemLayout}>
              {getFieldDecorator('CompanyName14')(
                <Input placeholder="hiii"/>
              )}
            </FormItem>
          </Col>
          <Col span={8} key="6134324234234">
            <FormItem label="Comww21321311" {...formItemLayout}>
              {getFieldDecorator('CompanyName124')(
                <Input placeholder="hiii"/>
              )}
            </FormItem>
          </Col>
          <Col span={8} key="61343242344">
            <FormItem label="file" {...formItemLayout}>
              {getFieldDecorator('fileName')(
                <Upload>
                  <Button>
                    <Icon type="upload"/> Upload
                  </Button>
                </Upload>
              )}
            </FormItem>
          </Col>
          <Col span={8} key="61342344">
            <FormItem label="aaa" {...formItemLayout}>
              {getFieldDecorator('ainput')(
               <a href={this.state.url} download>I'm Href</a>
              )}
            </FormItem>
          </Col>
          <Col span={8} key="61343242314">
            <FormItem label="btnSubmit" {...formItemLayout}>
              <Button onClick={this.handleSearch}>Submit</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm
