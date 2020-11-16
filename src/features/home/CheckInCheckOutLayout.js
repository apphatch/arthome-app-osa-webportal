import React from 'react';
import moment from 'moment-timezone';

import { Row, Col, Card, Table, Typography, Input, Image, Space } from 'antd';

import { connect } from 'react-redux';
import { homeActions } from './redux/actions';
const url = process.env.REACT_APP_API_URL;

const { Text } = Typography;
const { Search } = Input;

const CheckInCheckOutLayout = ({ dispatch, home }) => {
  const { listCheckInCheckOut } = home;

  React.useEffect(() => {
    dispatch(homeActions.getCheckInCheckOut());
  }, [dispatch]);

  const onSearch = value => {
    console.log(value);
  };

  return (
    <Row>
      <Col span={24}>
        <Card title="Check In / Check Out" bordered={false} style={{ width: '100%' }}>
          <Row gutter={[0, 20]}>
            <Col span={24}>
              <Search placeholder="Search..." onSearch={onSearch} enterButton />
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
                    render: u => {
                      return <Text>{u.name}</Text>;
                    },
                    filters:
                      listCheckInCheckOut &&
                      listCheckInCheckOut.length > 0 &&
                      listCheckInCheckOut.map(value => {
                        return {
                          text: value.user.name,
                          value: value.user.name,
                        };
                      }),
                    onFilter: (value, record) => {
                      return record.user.name === value;
                    },
                  },
                  {
                    title: 'Shop',
                    dataIndex: 'shop',
                    key: 'shop',
                    render: data => {
                      return (
                        <Space direction="vertical">
                          <Text>{data.name}</Text>
                          <Text>{data.importing_id}</Text>
                        </Space>
                      );
                    },
                    filters:
                      listCheckInCheckOut &&
                      listCheckInCheckOut.length > 0 &&
                      listCheckInCheckOut.map(value => {
                        return {
                          text: value.shop.name,
                          value: value.shop.name,
                        };
                      }),
                    onFilter: (value, record) => {
                      return record.shop.name === value;
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
                      listCheckInCheckOut.map(value => {
                        return {
                          text: moment
                            .utc(value.created_at)
                            .tz(moment.tz.guess(true))
                            .format('DD-MM-YYYY HH:mm:ss'),
                          value: moment
                            .utc(value.created_at)
                            .tz(moment.tz.guess(true))
                            .format('DD-MM-YYYY HH:mm:ss'),
                        };
                      }),
                    onFilter: (value, record) => {
                      const checkin = moment
                        .utc(record.created_at)
                        .tz(moment.tz.guess(true))
                        .format('DD-MM-YYYY HH:mm:ss');
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
                  expandedRowRender: record => {
                    return (
                      <Row gutter={[10, 10]}>
                        {record.shop_checkout_photos !== null &&
                          record.shop_checkout_photos.length > 0 &&
                          record.shop_checkout_photos.map(
                            photo =>
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
                  rowExpandable: record =>
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

const mapStateToProps = state => {
  return {
    home: state.home,
  };
};
export default connect(mapStateToProps)(CheckInCheckOutLayout);
