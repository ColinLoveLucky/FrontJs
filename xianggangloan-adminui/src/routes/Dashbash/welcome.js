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

import {Form, Row, Col, Input, Button, Icon, DatePicker, Upload, Modal, Progress} from 'antd';

import {queryUsr} from '../../services/whiteapi';

const FormItem = Form.Item;
import styles from './welcome.css';


class AdvancedSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      url: "",
      visible: false,
      fileUpIsShow: "block",
      progress: 10,
      progressIsShow: "none",
      exceptionIsShow: "none",
      buttonToggle:true,
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

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    let ts;
    ts = setInterval((state) => {
      if (state.state.progress <= 90) {
        state.setState({
          fileUpIsShow: 'none',
          progressIsShow: 'block',
          progress: state.state.progress + 10,
        });
      }
    }, 1000, this);
    let state = this;
    const queryData = queryUsr();
    console.log(queryData);
    queryUsr().then(function (res) {
      if (res.data.result == "success") {
        clearInterval(ts);
        state.setState({
          fileUpIsShow: 'none',
          progressIsShow: 'block',
          progress: 100,
        })
      }
      else {
        clearInterval(ts);
        state.setState({
          fileUpIsShow: 'none',
          progressIsShow: 'none',
          exceptionIsShow: 'block',
        })
      }
    })
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19},
    };
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <div>
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
        </div>
        <div>
          <Button type="primary" onClick={this.showModal}>Open</Button>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel}
            footer={[
              this.state.visible ? <Button key="Up" onClick={this.handleOk.bind(this)}>UpFile</Button> :
                <Button key="submit">Submit</Button>,
            ]}
          >
            <div style={{display: this.state.fileUpIsShow}}>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </div>
            <div style={{display: this.state.progressIsShow}}>
              <Progress percent={this.state.progress}/>
            </div>
            <div style={{display: this.state.exceptionIsShow}}>
              <Progress percent={this.state.progress} size="small" status="exception"/>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const
  WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm
