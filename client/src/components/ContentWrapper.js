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
  tag: 'div'
};

const ContentWrapper = (props) => {
  const { className, cssModule, innerRef, tag: Tag, ...attributes } = props;
  const classes = mapToCssModules(
    classNames(className, 'content-wrapper'),
    cssModule
  );

  return <Tag {...attributes} className={classes} ref={innerRef} />;
};

ContentWrapper.propTypes = propTypes;
ContentWrapper.defaultProps = defaultProps;

export default ContentWrapper;
