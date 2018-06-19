import React, {Component} from 'react';
// import {connect} from 'dva';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';

const FormItem = Form.Item;


class login extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/loginin', payload: values
        });
        // if (this.props.loginStatus) {
        //   message.error('Login failed');
        // }
      }
    });
  }

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
        <Form onSubmit={this.handleSubmit.bind(this)} style={{maxWidth: '400px'}}>
          <FormItem>
            {getFieldDecorator('userName', {
              initialValue: 'supper1',
              rules: [{required: true, message: 'Please input your username!'}],
            })(
              <Input addonBefore={<Icon type="user"/>} placeholder="Username"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              initialValue: 'supper1',
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
  }
}

export default Form.create()(login);
