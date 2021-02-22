import React, { Component } from 'react';
import classNames from 'classnames';
export default class LazyRenderBox extends Component {
    shouldComponentUpdate(nextProps) {
        return !!nextProps.hiddenClassName || !nextProps.hidden;
    }
    render() {
        const { hiddenClassName, hidden, className, ...otherProps } = this.props;
        const classString = classNames(className, {
            [hiddenClassName]: hiddenClassName && hidden,
        });
        return React.createElement("div", Object.assign({ className: classString }, otherProps));
    }
}
