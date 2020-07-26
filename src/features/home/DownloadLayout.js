import React from 'react';
import _ from 'lodash';

import { Row, Col, Card, Form, Select, Button, DatePicker } from 'antd';

import { connect } from 'react-redux';
import homeActions from './redux/actions';

const { Option } = Select;

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

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

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
                <Option value="stock">Stock</Option>
                <Option value="checklist">Check list</Option>
                <Option value="users">Users</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="date"
              label="Date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} onChange={onChange} />
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
                <Option value="yearweek">Yearweek</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" style={{marginRight: "10px"}}>
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
