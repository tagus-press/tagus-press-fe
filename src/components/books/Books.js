import React, {Component} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Papa from "papaparse";
import saveAs from "../../utils/save-as";


import { getAllBooks } from "../../actions/booksActions";
import Spinner from "../common/Spinner";
import BooksTable from "./BooksTable";
import { Container } from "react-bootstrap";
import { Button, Row, Col, Input, notification } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

class Books extends Component {

  constructor() {
    super();
    this.state = {
      search: "",
      exporting: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getAllBooks();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ search: e.target.value });
  }

  exportData = (filteredBooks) => {
    this.setState({exporting: true})
    let downloadBooks = filteredBooks.map(b => {
      return {
        "Book": b.name,
        "Author": b.author,
        "ISBN": b.isbn.toString(),
        "Book Series": b.series || ""
      }
    })
    let csv = Papa.unparse(downloadBooks, {
      delimiter: ",",
      header: true,
      newline: "\r\n"
    });

    let csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(csvData);
    let fileName = "Book List.csv";
    saveAs(url, fileName);
    notification.success({
      message: "File downloaded",
      description: "Please open the file downloaded",
      placement: "topRight"
    });
    this.setState({ exporting: false });
  }

  render() {
    console.log("Search", this.state.search);
    const {search, exporting} = this.state;
    const {books} = this.props;
    let filteredBooks = (books.books || []).filter((book) => {
      return (book.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || book.series.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
    });
    const { errors } = this.state;
    let booksContent;

    if (books.loading) {
      booksContent = <Spinner />;
    }

    booksContent = (
      <div>
        <Container>
          <Row className="pt-2 pb-0 mb-4">
            <Col>
                <h2 className="text-dark">
                  Book List
                </h2>
            </Col>
          </Row>
          <Row 
            justify="space-between"
            className="mb-4"
          >
            <Col>
              <Input
                placeholder="Search - Book or Series"
                size="large"
                name="search"
                type="text"
                style={{ width: 400, align: "center" }}
                value={this.state.search}
                onChange={this.onChange}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                shape="round"
                loading={exporting}
                disabled={filteredBooks.length === 0}
                onClick={() => this.exportData(filteredBooks)}>
                  Export
              </Button>
            </Col>
          </Row>
          <BooksTable books={filteredBooks} />
        </Container>
      </div>
    );

    return <div className="dashboard">{booksContent}</div>;
  }
}

Books.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired,
  getAllBooks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  books: state.books,
  auth: state.auth,
  search: state.search
});

export default connect(mapStateToProps, {
  getAllBooks
})(Books);
