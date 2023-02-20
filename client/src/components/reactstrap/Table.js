import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { mapToCssModules, tagPropType } from "./utils";

const propTypes = {
  className: PropTypes.string,
  cssModule: PropTypes.object,
  size: PropTypes.number,
  bordered: PropTypes.bool,
  borderless: PropTypes.bool,
  striped: PropTypes.bool,
  dark: PropTypes.bool,
  empty: PropTypes.bool,
  emptyContent: PropTypes.any,
  hover: PropTypes.bool,
  responsive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: tagPropType,
  responsiveTag: tagPropType,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.object,
  ]),
};

const defaultProps = {
  tag: "table",
  responsiveTag: "div",
};

const Table = (props) => {
  const {
    className,
    cssModule,
    size,
    bordered,
    borderless,
    striped,
    dark,
    hover,
    responsive,
    empty,
    tag: Tag,
    responsiveTag: ResponsiveTag,
    innerRef,
    children,
    emptyContent,
    t,
    // ...attributes
  } = props;

  const classes = mapToCssModules(
    classNames(
      className,
      "table",
      size ? "table-" + size : false,
      bordered ? "table-bordered" : false,
      borderless ? "table-borderless" : false,
      striped ? "table-striped" : false,
      dark ? "table-dark" : false,
      hover ? "table-hover" : false
    ),
    cssModule
  );

  const table = empty ? (
    <div className="table-empty">
      <div>{emptyContent || t("nothing_to_see_here")}</div>
    </div>
  ) : (
    <Tag ref={innerRef} className={classes} style={{'minWidth':size}}>
      {children}
    </Tag>
  );

  if (responsive) {
    const responsiveClassName = mapToCssModules(
      responsive === true
        ? "table-responsive"
        : `table-responsive-${responsive}`,
      cssModule
    );

    return (
      <ResponsiveTag className={responsiveClassName}>{table}</ResponsiveTag>
    );
  }

  return table;
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
