import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Table, Modal, Button, Form, Input, notification } from 'antd';

// Utility to generate random phone numbers
const generatePhoneNumber = () => {
  const phonePrefix = '080'; // Nigerian phone number prefix
  const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
  return phonePrefix + randomDigits.toString();
};

// Utility to generate random code (e.g., alphanumeric)
const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const Account = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [benfeksData, setBenfeksData] = useState<any[]>([
    {
      key: '1',
      code: generateRandomCode(),
      name: 'Chinonso Okafor',
      phone: generatePhoneNumber(),
    },
    {
      key: '2',
      code: generateRandomCode(),
      name: 'Adebayo Adeyemi',
      phone: generatePhoneNumber(),
    },
    {
      key: '3',
      code: generateRandomCode(),
      name: 'Ngozi Ikenna',
      phone: generatePhoneNumber(),
    },
    {
      key: '4',
      code: generateRandomCode(),
      name: 'Emeka Obi',
      phone: generatePhoneNumber(),
    },
    {
      key: '5',
      code: generateRandomCode(),
      name: 'Tolulope Adebayo',
      phone: generatePhoneNumber(),
    },
  ]);

  const handleAddAccount = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: any) => {
    // Create a new "Benfek" with random data for code and phone
    const newBenfek = {
      key: benfeksData.length + 1,
      code: generateRandomCode(),
      name: values.name,
      phone: generatePhoneNumber(),
    };

    setBenfeksData([...benfeksData, newBenfek]);

    // Show success notification
    notification.success({ message: 'Benfek added successfully!' });

    // Reset form and close modal
    form.resetFields();
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'Code', dataIndex: 'code', key: 'code' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Phone Number', dataIndex: 'phone', key: 'phone' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">Benfeks</h1>
          <p className="text-gray-600 mb-4">Manage your Benfeks accounts below.</p>

          <Button type="primary" onClick={handleAddAccount}>
            Add Benfek
          </Button>

          <Table
            columns={columns}
            dataSource={benfeksData}
            pagination={false}
            className="mt-6"
            scroll={{ x: 800 }} // Enables horizontal scrolling
          />
        </div>
      </div>

      {/* Modal for adding new Benfek */}
      <Modal
        title="Add New Benfek"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the Benfek name!' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add Benfek
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Account;
