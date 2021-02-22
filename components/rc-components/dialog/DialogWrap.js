import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dialog from './Dialog';
import ContainerRender from '../util/ContainerRender';
import Portal from '../util/Portal';
const IS_REACT_16 = 'createPortal' in ReactDOM;
class DialogWrap extends Component {
    constructor() {
        super(...arguments);
        this.saveDialog = (node) => {
            this._component = node;
        };
        this.getComponent = (extra = {}) => {
            return React.createElement(Dialog, Object.assign({ ref: this.saveDialog }, this.props, extra, { key: "dialog" }));
        };
        this.getContainer = () => {
            const { getContainer } = this.props;
            if (getContainer) {
                return getContainer(this);
            }
            const container = document.createElement('div');
            document.body.appendChild(container);
            return container;
        };
    }
    shouldComponentUpdate({ visible }) {
        const { props } = this;
        return !!(props.visible || visible);
    }
    componentWillUnmount() {
        if (IS_REACT_16) {
            return;
        }
        const { visible } = this.props;
        if (visible) {
            this.renderComponent({
                afterClose: this.removeContainer,
                onClose() { },
                visible: false,
            });
        }
        else {
            this.removeContainer();
        }
    }
    render() {
        const { visible } = this.props;
        let portal = null;
        if (!IS_REACT_16) {
            const container = ({ renderComponent, removeContainer, }) => {
                this.renderComponent = renderComponent;
                this.removeContainer = removeContainer;
                return null;
            };
            return (React.createElement(ContainerRender, { parent: this, visible: visible, autoDestroy: false, getComponent: this.getComponent, getContainer: this.getContainer }, container));
        }
        if (visible || this._component) {
            portal = React.createElement(Portal, { getContainer: this.getContainer }, this.getComponent());
        }
        return portal;
    }
}
DialogWrap.defaultProps = {
    visible: false,
};
export default DialogWrap;
