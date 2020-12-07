import React, { Component } from "react";
import { Table } from "antd";

// import "./main.scss"; // webpack must be configured to do this
import "../../App.css";

class SalesTable extends Component {
    render() {
        const { sales } = this.props;
        const salesTable = sales.map(sale => {
            return {
                key: sale.id,
                book: sale.book,
                location: sale.location,
                sale_date: sale.sale_date,
                amount: sale.amount,
                quantity: sale.quantity,
                total_amount: sale.total_amount
            }
        })

        const tableColumns = [
            {
                title: 'Book',
                dataIndex: 'book',
                key: 'book'
            },
            {
                title: 'Location',
                dataIndex: 'location',
                key: 'location'
            },
            {
                title: 'Sale Date',
                dataIndex: 'sale_date',
                key: 'sale_date'
            },
            {
                title: 'Price/unit',
                dataIndex: 'amount',
                key: 'amount'
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity'
            },
            {
                title: 'Total',
                dataIndex: 'total_amount',
                key: 'total_amount'
            },
        ]


        let table;
        table = (sales || []).map(sale => {
            return (
                <tr>
                    <td className="text-center">{sale.book}</td>
                    <td className="text-center">
                        {sale.location}
                    </td>
                    <td className="text-center">{sale.sale_date}</td>
                    <td className="text-center">${sale.amount}</td>
                    <td className="text-center">{sale.quantity}</td>
                    <td className="text-center">${sale.total_amount}</td>
                </tr>
            );
        });
        return (
            <Table
                dataSource={salesTable}
                columns={tableColumns}
                bordered
            />
        );
    }
}
export default SalesTable;
