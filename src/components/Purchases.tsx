import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Table, Button, Modal, Form, Input, InputNumber, notification } from 'antd';

// Sample data for the purchases
const initialPurchases = [
  {
    key: '1',
    drugName: 'Paracetamol',
    quantity: 100,
    price: 1500,
    purchaseDate: '2025-01-01',
  },
  {
    key: '2',
    drugName: 'Aspirin',
    quantity: 200,
    price: 2000,
    purchaseDate: '2025-01-10',
  },
  {
    key: '3',
    drugName: 'Amoxicillin',
    quantity: 150,
    price: 3000,
    purchaseDate: '2025-01-12',
  },
];

const Purchases = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [purchases, setPurchases] = useState(initialPurchases);

  const handleAddPurchase = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: any) => {
    const newPurchase = {
      key: purchases.length + 1,
      drugName: values.drugName,
      quantity: values.quantity,
      price: values.price,
      purchaseDate: values.purchaseDate,
    };

    setPurchases([...purchases, newPurchase]);

    notification.success({ message: 'Purchase added successfully!' });

    form.resetFields();
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'Drug Name', dataIndex: 'drugName', key: 'drugName' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Price (₦)', dataIndex: 'price', key: 'price' },
    { title: 'Purchase Date', dataIndex: 'purchaseDate', key: 'purchaseDate' },
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
          <h1 className="text-2xl font-bold mb-6">Purchases</h1>
          <p className="text-gray-600 mb-4">Manage pharmacy purchases below.</p>

          <Button type="primary" onClick={handleAddPurchase}>
            Add Purchase
          </Button>

          <Table
            columns={columns}
            dataSource={purchases}
            pagination={false}
            className="mt-6"
            scroll={{ x: 800 }} // Enables horizontal scrolling
          />
        </div>
      </div>

      {/* Modal for adding new purchase */}
      <Modal
        title="Add New Purchase"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Drug Name"
            name="drugName"
            rules={[{ required: true, message: 'Please input the drug name!' }]}
          >
            <Input placeholder="Enter drug name" />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input the quantity!' }]}
          >
            <InputNumber placeholder="Enter quantity" min={1} />
          </Form.Item>

          <Form.Item
            label="Price (₦)"
            name="price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <InputNumber placeholder="Enter price" min={1} />
          </Form.Item>

          <Form.Item
            label="Purchase Date"
            name="purchaseDate"
            rules={[{ required: true, message: 'Please select the purchase date!' }]}
          >
            <Input placeholder="Enter purchase date" />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Add Purchase
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Purchases;
