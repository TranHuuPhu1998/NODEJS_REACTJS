import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from './reactstrap/utils';
import Pagination from './reactstrap/Pagination';
import PaginationItem from './reactstrap/PaginationItem';
import PaginationLink from './reactstrap/PaginationLink';

const propTypes = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  totalPages: PropTypes.array,
  currentPage: PropTypes.number,
  onChangePage: PropTypes.func,
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func
  ])
};

const defaultProps = {
  tag: Pagination
};

const PaginationBar = (props) => {
  const {
    totalItems,
    className,
    cssModule,
    innerRef,
    onChangePage,
    itemsPerPage,
    currentPage,
    tag: Tag,
    ...attributes
  } = props;
  const totalPages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    totalPages.push(i);
  }

  const classes = mapToCssModules(
    classNames(className, 'justify-content-center', 'd-flex'),
    cssModule
  );

  const onChange = (number, e) => {
    e.preventDefault();
    onChangePage(Number(number));
  };

  return (
    (
      <Tag {...attributes} className={classes} ref={innerRef}>
        {currentPage > 1 ? (
          <PaginationItem>
            <PaginationLink
              previous
              href='#'
              onClick={(e) => {
                onChange(currentPage - 1, e);
              }}
            >
              <span>&laquo;</span>
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem disabled>
            <PaginationLink previous href='#' ><span>&lt;</span></PaginationLink>
          </PaginationItem>
        )}
        {totalPages.map((number, i) => (
          <PaginationItem key={i} active={currentPage === number}>
            <PaginationLink
              onClick={(e) => {
                onChange(number, e);
              }}
              href='#'
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage !== totalPages.length ? (
          <PaginationItem>
            <PaginationLink
              next
              href='#'
              onClick={(e) => {
                onChange(currentPage + 1, e);
              }}
            >
              <span>&raquo;</span>
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem disabled>
            <PaginationLink next href='#' ><span>&gt;</span></PaginationLink>
          </PaginationItem>
        )}
      </Tag>
    )
  );
};

PaginationBar.propTypes = propTypes;
PaginationBar.defaultProps = defaultProps;

export default PaginationBar;
