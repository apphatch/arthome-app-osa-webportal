import React from 'react';
import moment from 'moment';

import { Row, Col, Card, Table, Tag, Typography, Input, Image } from 'antd';

import { connect } from 'react-redux';
import homeActions from './redux/actions';
const url = process.env.REACT_APP_API_URL;

const { Text } = Typography;
const { Search } = Input;

const CheckInCheckOutLayout = ({ dispatch, home }) => {
  const { listCheckInCheckOut } = home;

  console.log(listCheckInCheckOut);

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
                    title: '#',
                    dataIndex: 'id',
                    key: 'id',
                  },
                  {
                    title: 'User',
                    dataIndex: 'user',
                    key: 'user',
                    render: u => {
                      return <Text>{u.name}</Text>;
                    },
                  },
                  {
                    title: 'Status',
                    dataIndex: 'is_checkin',
                    key: 'status',
                    render: item => {
                      if (item) {
                        return <Tag color="green">Checkin</Tag>;
                      } else {
                        return <Tag color="red">Checkout</Tag>;
                      }
                    },
                  },
                  {
                    title: 'Time',
                    dataIndex: 'time',
                    key: 'time',
                    render: v => {
                      const time = moment(v).format('DD/MM/YYYY');
                      return <Text>{time}</Text>;
                    },
                  },
                  {
                    title: 'Photos',
                    dataIndex: 'photos',
                    key: 'photos',
                    render: item => {
                      return <Image src={`${url}${item[0].image}`} height={90} width={60} preview={true}/>;
                    },
                  },
                ]}
                dataSource={listCheckInCheckOut}
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
