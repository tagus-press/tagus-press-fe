import React, { Component } from "react";
import { Table } from "antd";

class BooksTable extends Component {
    render() {
        const { books } = this.props;

        const booksTable = books.map(book => {
            return {
                key: book.id,
                name: book.name,
                author: book.author,
                isbn: book.isbn,
                series: book.series || ""
            }
        })

        const tableColumns = [
            {
                title: 'Book',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author'
            },
            {
                title: 'ISBN',
                dataIndex: 'isbn',
                key: 'isbn'
            },
            {
                title: 'Series',
                dataIndex: 'series',
                key: 'series'
            },
        ]

        return (
            <Table
                dataSource={booksTable}
                columns={tableColumns}
                bordered
            />
        );
    }
}

export default BooksTable;
