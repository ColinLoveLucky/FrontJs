import React from 'react';
import {connect} from 'dva';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;
const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
         type: 'user/login', payload: values
        });
      }
    });
  },
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div style={{
        width: '400px',
        margin: "0 auto",
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-150px',
        marginLeft: '-200px'
      }}>
        <Form onSubmit={this.handleSubmit} style={{maxWidth: '400px'}}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(
              <Input addonBefore={<Icon type="user"/>} placeholder="Username"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
              <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="Password"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a style={{float: 'right'}}>Forgot password</a>
            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
              Log in
            </Button>
            Or <a href="#/Register">register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  },
}));
export default connect()(NormalLoginForm);
