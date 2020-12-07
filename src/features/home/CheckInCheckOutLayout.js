import React, { useState } from 'react';
import moment from 'moment-timezone';
import _ from 'lodash';

import {
  Row,
  Col,
  Card,
  Table,
  Typography,
  Input,
  Image,
  Space,
  Form,
  Button,
  DatePicker,
} from 'antd';

import { connect } from 'react-redux';
import { homeActions } from './redux/actions';
const url = process.env.REACT_APP_API_URL;

const { Text } = Typography;
const { RangePicker } = DatePicker;

const CheckInCheckOutLayout = ({ dispatch, home }) => {
  const { listCheckInCheckOut } = home;
  const [form] = Form.useForm();

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  React.useEffect(() => {
    dispatch(homeActions.getCheckInCheckOut(dateFrom, dateTo));
  }, [dispatch, dateFrom, dateTo]);

  const filters = (arr) => {
    return _.uniqBy(arr, 'text');
  };

  const onFinish = (values) => {
    const { date } = values;
    if (date && date.length > 0) {
      const date_from = moment.utc(date[0]).tz(moment.tz.guess(true)).format('DD-MM-YYYY');
      setDateFrom(date_from);
    }
    if (date && date.length > 1) {
      const date_to = moment.utc(date[1]).tz(moment.tz.guess(true)).format('DD-MM-YYYY');
      setDateTo(date_to);
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Card title="Check In / Check Out" bordered={false} style={{ width: '100%' }}>
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Form form={form} name="filter" layout="inline" onFinish={onFinish}>
                <Form.Item title="Date" name="date" rules={[{ type: 'array', required: false }]}>
                  <RangePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                columns={[
                  {
                    title: 'User',
                    dataIndex: 'user',
                    key: 'user',
                    render: (u) => {
                      return <Text>{u.name}</Text>;
                    },
                    filters:
                      listCheckInCheckOut &&
                      listCheckInCheckOut.length > 0 &&
                      filters(
                        listCheckInCheckOut.map((value) => {
                          return {
                            text: value.user.name,
                            value: value.user.name,
                          };
                        }),
                      ),
                    onFilter: (value, record) => {
                      return record.user.name === value;
                    },
                  },
                  {
                    title: 'Shop',
                    dataIndex: 'shop',
                    key: 'shop',
                    render: (v, record) => {
                      const shopName = record.shop !== null ? record.shop.name : "";
                      return (
                        <Space direction="vertical">
                          <Text>{shopName}</Text>
                        </Space>
                      );
                    },
                  },
                  {
                    title: 'Note',
                    dataIndex: 'note',
                    key: 'note',
                    render: (v, record) => {
                      const noteCheckIn = record.note !== "undefined" ? record.note : "";
                      const noteCheckOut = record.user_checkout != null && record.user_checkout.note !== "undefined" ? record.user_checkout.note : "";
                      return (
                        <Space direction="vertical">
                          <Text>{noteCheckIn}</Text>
                          <Text>{noteCheckOut}</Text>
                        </Space>
                      );
                    },
                  },
                  {
                    title: 'Time',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    render: (v, record) => {
                      const timeCheckin = moment
                        .utc(v)
                        .tz(moment.tz.guess(true))
                        .format('DD-MM-YYYY HH:mm:ss');
                      const timeCheckout =
                        record.user_checkout !== null && record.user_checkout.created_at !== null
                          ? moment
                              .utc(record.user_checkout.created_at)
                              .tz(moment.tz.guess(true))
                              .format('DD-MM-YYYY HH:mm:ss')
                          : '';
                      return (
                        <Space direction="vertical">
                          <Text>{`Checkin: ${timeCheckin}`}</Text>
                          <Text>{`Checkout: ${timeCheckout}`}</Text>
                        </Space>
                      );
                    },
                    filters:
                      listCheckInCheckOut &&
                      listCheckInCheckOut.length > 0 &&
                      filters(
                        listCheckInCheckOut.map((value) => {
                          return {
                            text: moment
                              .utc(value.created_at)
                              .tz(moment.tz.guess(true))
                              .format('DD-MM-YYYY'),
                            value: moment
                              .utc(value.created_at)
                              .tz(moment.tz.guess(true))
                              .format('DD-MM-YYYY'),
                          };
                        }),
                      ),
                    onFilter: (value, record) => {
                      const checkin = moment
                        .utc(record.created_at)
                        .tz(moment.tz.guess(true))
                        .format('DD-MM-YYYY');
                      return checkin === value;
                    },
                  },
                  {
                    title: 'Photos',
                    dataIndex: 'photos',
                    key: 'photos',
                    render: (photo, record) => {
                      return (
                        <Space>
                          {photo.length > 0 && (
                            <Image
                              src={`${url}${photo[0].image}`}
                              height={90}
                              width={60}
                              preview={true}
                            />
                          )}

                          {record.user_checkout.photos &&
                            record.user_checkout.photos.length > 0 && (
                              <Image
                                src={`${url}${record.user_checkout.photos[0].image}`}
                                height={90}
                                width={60}
                                preview={true}
                              />
                            )}
                        </Space>
                      );
                    },
                  },
                ]}
                expandable={{
                  expandedRowRender: (record) => {
                    return (
                      <Row gutter={[10, 10]}>
                        {record.shop_checkout_photos !== null &&
                          record.shop_checkout_photos.length > 0 &&
                          record.shop_checkout_photos.map(
                            (photo) =>
                              photo.path !== null && (
                                <Col key={photo.id} span={4}>
                                  <Image
                                    alt="example"
                                    src={`${url}${photo.image}`}
                                    preview={true}
                                  />
                                </Col>
                              ),
                          )}
                      </Row>
                    );
                  },
                  rowExpandable: (record) =>
                    record.shop_checkout_photos !== null && record.shop_checkout_photos.length > 0,
                }}
                dataSource={listCheckInCheckOut || []}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    home: state.home,
  };
};
export default connect(mapStateToProps)(CheckInCheckOutLayout);
