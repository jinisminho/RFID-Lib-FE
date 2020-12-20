import React from "react";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components

import { SearchResultTbl } from "components/Tables/SearchResultTbl";
import { COLUMNS_2 } from 'components/Tables/columnsSearchResult'
import MUIDataTable from "mui-datatables";

const options = {
  filterType: 'checkbox',
  selectableRowsHideCheckboxes: true,
  print: false,
  download: false,
  jumpToPage: true,
  rowsPerPageOptions: [5, 10, 15, 100],
  search: false
};

class SearchResult extends React.Component {
  render() {
    return (
      <>
        {/* Page content */}
        <Container>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                {/* <CardHeader className="border-0">
                  <h3 className="mb-0">Result</h3>
                </CardHeader> */}

                {/* <SearchResultTbl data={this.props.data}></SearchResultTbl> */}

                <MUIDataTable
                  title={"Result"}
                  data={this.props.data}
                  columns={COLUMNS_2}
                  options={options}
                />


                {/* <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter> */}

              </Card>
            </div>
          </Row>
        </Container>

      </>
    );
  }
}

export default SearchResult