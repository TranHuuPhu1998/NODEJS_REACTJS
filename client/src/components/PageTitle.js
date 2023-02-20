import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from './reactstrap/utils';

const propTypes = {
  tag: tagPropType,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func
  ])
};

const defaultProps = {
  tag: 'h3'
};

const PageTitle = (props) => {
  const { className, cssModule, innerRef, tag: Tag, ...attributes } = props;
  const classes = mapToCssModules(
    classNames(className, 'page-title text-capitalize'),
    cssModule
  );

  return <Tag {...attributes} className={classes} ref={innerRef} />;
};

PageTitle.propTypes = propTypes;
PageTitle.defaultProps = defaultProps;

export default PageTitle;
