import React from 'react';
import _ from 'lodash';

import { Row, Col, Card, Form, Select, Button, DatePicker } from 'antd';

import { connect } from 'react-redux';
import homeActions from './redux/actions';

const { Option } = Select;
const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const DownloadLayout = ({ dispatch, home }) => {
  const { listCheckInCheckOut } = home;

  const formRef = React.createRef();

  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    formRef.current.resetFields();
  };

  React.useEffect(() => {
    // dispatch(homeActions.getCheckInCheckOut());
  }, [dispatch]);

  return (
    <Row>
      <Col span={24}>
        <Card title="Download" bordered={false} style={{ width: '100%' }}>
          <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
            <Form.Item
              name="option"
              label="Option"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select a option you want to download" allowClear>
                <Option value="oos">oos</Option>
                <Option value="sos">sos</Option>
                <Option value="osa">osa</Option>
                <Option value="weekend">weekend</Option>
                <Option value="promotions">promotions</Option>
                <Option value="rental">rental</Option>
                <Option value="npd">npd</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="date"
              label="Date"
              rules={[{ type: 'array', required: true, message: 'Please select time!' }]}
            >
              <RangePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select a category" allowClear>
                <Option value="oos">oos</Option>
                <Option value="sos">sos</Option>
                <Option value="osa">osa</Option>
                <Option value="weekend">weekend</Option>
                <Option value="promotions">promotions</Option>
                <Option value="rental">rental</Option>
                <Option value="npd">npd</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => {
  return {
    home: state.home,
  };
};
export default connect(mapStateToProps)(DownloadLayout);
