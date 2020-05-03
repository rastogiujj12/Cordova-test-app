import React, { useState } from 'react';
import { PageHeader, Button, Menu, Drawer, Form, Col, Row, Input, Select, DatePicker } from 'antd';
import QRCode from 'qrcode'
import './App.css';
import 'antd/dist/antd.css';
import { PlusOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Option } = Select;

function App() {
  const [form] = Form.useForm();
  const [drawer, setdrawer] = useState(false);

  const onFinish = values => {
    console.log('Finish:', values);
    QRCode.toCanvas(document.getElementById('canvas'),
      JSON.stringify(values), { toSJISFunc: QRCode.toSJIS }, function (error) {
      if (error) console.error(error);
      console.log('success!');
    });
    setdrawer(false);
  };

  return (
    <div>
        <Drawer
          title="Generate new QR"
          width={720}
          onClose={() => setdrawer(false)}
          visible={drawer}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                onClick={() => setdrawer(false)}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark id="forminput" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Product Name"
                  rules={[{ required: true, message: 'Please enter product name' }]}
                >
                  <Input placeholder="Please enter product name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tl"
                  label="Team leader"
                  rules={[{ required: true, message: 'Please select a Team leader' }]}
                >
                  <Select placeholder="Please select a Team Leader">
                    <Option value="Mihai">Mihai</Option>
                    <Option value="Ancorman">Ancorman</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'please enter product description',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter product description" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >
                  Generate QR
                </Button>
              )}
                {/* <Button type="primary" htmlType="submit" className="login-form-button">
                  Generate QR
                </Button> */}
              </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
        <PageHeader
            className="site-page-header"
            style={{background: "aqua"}}
            title="Tracsys"
            subTitle="Inventory management"
            ghost={true}
            extra={[
              <Button key="3">Logout</Button>,
            ]}
            avatar={{ src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png' }}
        >
        </PageHeader>

        <div style={{textAlign: "center", marginTop: "10%"}}>
          <Button type="primary" onClick={() => setdrawer(true)}>
            <PlusOutlined /> New QR code
          </Button>
        </div>
        <div style={{textAlign: "center", marginTop: "10%"}}>
          <canvas id="canvas"></canvas>
        </div>
    </div>
  );
}

export default App;
