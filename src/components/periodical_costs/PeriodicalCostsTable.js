import React, { Component } from "react";
import { Table } from "antd";

class PeriodicalCostsTable extends Component {
    render() {
        const { periodicalCosts } = this.props;

        const periodicalCostsTable = periodicalCosts.map(periodicalCost => {
            return {
                key: periodicalCost.id,
                book: periodicalCost.name,
                first_edition: periodicalCost.first_edition,
                published: periodicalCost.published,
                royalty: periodicalCost.royalty,
                author_translator_literary: periodicalCost.author_translator_literary,

            }
        })

        const tableColumns = [
            {
                title: 'Book',
                dataIndex: 'book',
                key: 'book'
            },
            {
                title: 'First Edition',
                dataIndex: 'first_edition',
                key: 'first_edition'
            },
            {
                title: 'Published Price',
                dataIndex: 'published',
                key: 'published'
            },
            {
                title: 'Author/Translator/Literary',
                dataIndex: 'author_translator_literary',
                key: 'author_translator_literary'
            },
        ]
        
        return (
            <Table
                dataSource={periodicalCostsTable}
                columns={tableColumns}
                bordered
            />
        );
    }
}

export default PeriodicalCostsTable;
