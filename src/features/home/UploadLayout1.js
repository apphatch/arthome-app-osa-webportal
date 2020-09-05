import React from 'react';
import _ from 'lodash';

import { Row, Col, Card, Form, Select, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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

const UploadLayout = ({ dispatch }) => {
  const formRef = React.createRef();

  // const normFile = e => {
  //   console.log('Upload event:', e);
  //   return e;
  // };

  const onFinish = values => {
    console.log(values);
    const formData = new FormData();
    // stockList.forEach(file => {
    //   formData.append('files[]', file);
    // });
    // dispatch(homeActions.uploadStocks(formData));
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
        <Card title="Upload" bordered={false} style={{ width: '100%' }}>
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
              <Select placeholder="Select a option you want to upload data" allowClear>
                <Option value="checklists">Checklists</Option>
                <Option value="checklist-item">Checklist Items</Option>
                <Option value="photos">Photos</Option>
                <Option value="stocks">Stocks</Option>
                <Option value="shops">Shops</Option>
                <Option value="users">Users</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="files"
              label="Upload"
              // valuePropName="file"
              // getValueFromEvent={normFile}
              extra="longgggggggggggggggggggggggggggggggggg"
            >
              <Upload name="logo" listType="picture" className="upload-list-inline">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
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
export default connect(mapStateToProps)(UploadLayout);
