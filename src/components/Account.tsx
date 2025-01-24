import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Table, Modal, Button, Form, Input, Select } from 'antd';

const Account = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddTransaction = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: any) => {
    console.log('New Transaction Details:', values);
    setIsModalVisible(false);
  };

  const transactionData = [
    {
      key: '1',
      reference: 'TXN12345',
      type: 'Withdrawal',
      status: 'Completed',
      amount: '₦5,000',
      date: '2025-01-23',
    },
    {
      key: '2',
      reference: 'TXN12346',
      type: 'Purchase',
      status: 'Pending',
      amount: '₦10,000',
      date: '2025-01-24',
    },
    // Add more transactions as necessary
  ];

  const columns = [
    { title: 'Transaction Reference', dataIndex: 'reference', key: 'reference' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="link">View Details</Button>,
    },
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
          <h1 className="text-2xl font-bold mb-6">Account Transactions</h1>
          <p className="text-gray-600 mb-4">Manage your account transactions below.</p>

          <Button type="primary" onClick={handleAddTransaction}>
            Add Transaction
          </Button>

          {/* Scrollable Table */}
          <div className="mt-6 overflow-x-auto">
            <Table
              columns={columns}
              dataSource={transactionData}
              pagination={false}
              scroll={{ x: 800 }} // This enables horizontal scrolling
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Modal for adding transaction */}
      <Modal
        title="Add New Transaction"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Transaction Reference"
            name="reference"
            rules={[{ required: true, message: 'Please input the transaction reference!' }]}
          >
            <Input placeholder="Enter reference" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select the transaction type!' }]}
          >
            <Select placeholder="Select type">
              <Select.Option value="Withdrawal">Withdrawal</Select.Option>
              <Select.Option value="Purchase">Purchase</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the transaction status!' }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
              <Select.Option value="Failed">Failed</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input the transaction amount!' }]}
          >
            <Input placeholder="Enter amount" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please input the transaction date!' }]}
          >
            <Input placeholder="Enter date" />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add Transaction
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Account;
