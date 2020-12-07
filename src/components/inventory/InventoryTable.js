import React, { Component } from "react";
import { Table } from "antd";

// import "./main.scss"; // webpack must be configured to do this
import "../../App.css";

class InventoryTable extends Component {
  render() {
    const { inventory } = this.props;

    const inventoryTable = inventory.map(book => {
      return {
        key: book.id,
        book: book.book,
        author: book.author,
        location: book.location,
        count: book.count
      }
    })

    const tableColumns = [
      {
        title: 'Book',
        dataIndex: 'book',
        key: 'book'
      },
      {
        title: 'Author',
        dataIndex: 'author',
        key: 'author'
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location'
      },
      {
        title: 'Inventory',
        dataIndex: 'count',
        key: 'count'
      },
    ]

    let table;
    table = (inventory || []).map(book => {
      return (
        <tr>
          <td className="text-center">{book.book}</td>
          <td className="text-center">{book.author}</td>
          <td className="text-center">
            {book.location}
          </td>
          <td className="text-center">{book.count}</td>
        </tr>
      );
    });

    return (
      <Table
        dataSource={inventoryTable}
        columns={tableColumns}
        bordered
      />

    );
  }
}
export default InventoryTable;
