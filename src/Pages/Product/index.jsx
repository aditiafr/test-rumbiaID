import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, message, Popconfirm, Table } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

const Product = () => {

    const dataProduct = JSON.parse(localStorage.getItem('DataProduct') || '[]');

    const handleDelete = (ProductCode) => {
        const existingData = JSON.parse(localStorage.getItem('DataProduct') || '[]');
        const updatedData = existingData.filter(item => item.ProductCode !== ProductCode);
        localStorage.setItem('DataProduct', JSON.stringify(updatedData));
        window.location.reload();
        message.success('Success Delete Data!');
    };


    const columns = [
        {
            title: 'Product Code',
            dataIndex: 'ProductCode',
            key: 'ProductCode',
        },
        {
            title: 'Product Name',
            dataIndex: 'ProductName',
            key: 'ProductName',
        },
        {
            title: 'Product Price',
            dataIndex: 'ProductPrice',
            key: 'ProductPrice',
        },
        {
            title: 'SKU',
            dataIndex: 'SKU',
            key: 'SKU',
        },
        {
            title: 'Brand',
            dataIndex: 'Brand',
            key: 'Brand',
        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'Description',
            render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
        },
        {
            title: 'Actions',
            key: 'Actions',
            fixed: 'right',
            width: 100,
            render: (_, record) => {
                return (
                    <div>
                        <Link to={`form/${record.ProductCode}`}>
                            <Button icon={<EditFilled />} type="text" />
                        </Link>
                        <Popconfirm
                            title="Delete the data"
                            description="Are you sure to delete this data?"
                            onConfirm={() => handleDelete(record.ProductCode)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                icon={<DeleteFilled />}
                                type="text"
                            />
                        </Popconfirm>
                    </div>
                )
            }
        },
    ];


    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">All Data Products</h3>
                <Link to="form">
                    <Button type="primary">
                        + Add Data
                    </Button>
                </Link>
            </div>
            <Table
                columns={columns}
                dataSource={dataProduct}
                scroll={{ x: 1000 }}
            />
        </div>
    )
}

export default Product