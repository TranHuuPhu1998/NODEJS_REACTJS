import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules, tagPropType } from './utils';

const propTypes = {
  active: PropTypes.bool,
  'aria-label': PropTypes.string,
  block: PropTypes.bool,
  rounded: PropTypes.bool,
  isAdd: PropTypes.bool,
  isUpload: PropTypes.bool,
  loading: PropTypes.bool,
  color: PropTypes.string,
  iconClass: PropTypes.string,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  tag: tagPropType,
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string
  ]),
  onClick: PropTypes.func,
  size: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  close: PropTypes.bool
};

const defaultProps = {
  color: 'secondary',
  tag: 'button'
};

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.onClick) {
      return this.props.onClick(e);
    }
  }

  render() {
    let {
      active,
      'aria-label': ariaLabel,
      block,
      className,
      close,
      cssModule,
      color,
      isAdd,
      isUpload,
      loading,
      outline,
      size,
      iconClass,
      tag: Tag,
      innerRef,
      rounded,
      children,
      ...attributes
    } = this.props;

    if (close && typeof attributes.children === 'undefined') {
      attributes.children = <span aria-hidden>×</span>;
    }

    const btnOutlineColor = `btn${outline ? '-outline' : ''}-${color}`;

    const classes = mapToCssModules(
      classNames(
        className,
        { close },
        isAdd && 'btn-add',
        isUpload && 'btn-upload',
        loading && 'loading',
        close || 'btn',
        close || btnOutlineColor,
        size ? `btn-${size}` : false,
        block ? 'btn-block' : false,
        rounded ? 'rounded-pill' : false,
        { active, disabled: this.props.disabled }
      ),
      cssModule
    );

    if (attributes.href && Tag === 'button') {
      Tag = 'a';
    }

    const defaultAriaLabel = close ? 'Close' : null;

    return (
      <Tag
        type={Tag === 'button' && attributes.onClick ? 'button' : undefined}
        {...attributes}
        className={classes}
        ref={innerRef}
        onClick={this.onClick}
        aria-label={ariaLabel || defaultAriaLabel}
      >
        {iconClass ? (
          <>
            <span className={'ficon ' + iconClass} />
            {children}
          </>
        ) : (
          children
        )}
      </Tag>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
