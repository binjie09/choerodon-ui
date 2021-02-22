import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import LazyRenderBox from './LazyRenderBox';
import Icon from '../../icon';
import Animate from '../../animate';
import getScrollBarSize from '../util/getScrollBarSize';
import KeyCode from '../../_util/KeyCode';
import addEventListener from '../../_util/addEventListener';
let uuid = 0;
let openCount = 0;
/* eslint react/no-is-mounted:0 */
function getScroll(w, top) {
    let ret = w[`page${top ? 'Y' : 'X'}Offset`];
    const method = `scroll${top ? 'Top' : 'Left'}`;
    if (typeof ret !== 'number') {
        const d = w.document;
        ret = d.documentElement[method];
        if (typeof ret !== 'number') {
            ret = d.body[method];
        }
    }
    return ret;
}
function setTransformOrigin(node, value) {
    const style = node.style;
    ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix) => {
        style[`${prefix}TransformOrigin`] = value;
    });
    style.transformOrigin = value;
}
function offset(el) {
    const rect = el.getBoundingClientRect();
    const pos = {
        left: rect.left,
        top: rect.top,
    };
    const doc = el.ownerDocument;
    const w = doc.defaultView || doc.parentWindow;
    pos.left += getScroll(w);
    pos.top += getScroll(w, true);
    return pos;
}
export default class Dialog extends Component {
    constructor() {
        super(...arguments);
        this.center = () => {
            const { center } = this.props;
            const dialogNode = findDOMNode(this.dialog);
            if (center && dialogNode && typeof window !== 'undefined') {
                const { clientWidth: docWidth, clientHeight: docHeight } = window.document.documentElement;
                const { offsetWidth: width, offsetHeight: height, style } = dialogNode;
                style.left = `${Math.max((docWidth - width) / 2, 0)}px`;
                style.top = `${Math.max((docHeight - height) / 2, 0)}px`;
            }
        };
        this.onEventListener = () => {
            if (typeof window !== 'undefined') {
                this.resizeEvent = addEventListener(window, 'resize', this.center);
            }
        };
        this.removeEventListener = () => {
            if (typeof window !== 'undefined') {
                this.resizeEvent.remove();
            }
        };
        this.onAnimateLeave = () => {
            const { afterClose } = this.props;
            // need demo?
            // https://github.com/react-component/dialog/pull/28
            if (this.wrap) {
                this.wrap.style.display = 'none';
            }
            this.inTransition = false;
            this.removeScrollingEffect();
            if (afterClose) {
                afterClose();
            }
        };
        this.onAnimateEnd = () => {
            const { animationEnd } = this.props;
            if (animationEnd) {
                animationEnd();
            }
        };
        this.onMaskClick = e => {
            // android trigger click on open (fastclick??)
            if (Date.now() - this.openTime < 300) {
                return;
            }
            if (e.target === e.currentTarget) {
                this.close(e);
            }
        };
        this.onKeyDown = (e) => {
            const props = this.props;
            if (props.keyboard && e.keyCode === KeyCode.ESC) {
                this.close(e);
            }
            // keep focus inside dialog
            if (props.visible) {
                if (e.keyCode === KeyCode.TAB) {
                    const activeElement = document.activeElement;
                    const dialogRoot = this.wrap;
                    if (e.shiftKey) {
                        if (activeElement === dialogRoot) {
                            this.sentinel.focus();
                        }
                    }
                    else if (activeElement === this.sentinel) {
                        dialogRoot.focus();
                    }
                }
            }
        };
        this.getDialogElement = () => {
            const props = this.props;
            const closable = props.closable;
            const prefixCls = props.prefixCls;
            const dest = {};
            if (props.width !== undefined) {
                dest.width = props.width;
            }
            if (props.height !== undefined) {
                dest.height = props.height;
            }
            let footer;
            if (props.footer) {
                footer = React.createElement("div", { className: `${prefixCls}-footer` }, props.footer);
            }
            let header;
            if (props.title) {
                header = (React.createElement("div", { className: `${prefixCls}-header` },
                    React.createElement("div", { className: `${prefixCls}-title`, id: this.titleId }, props.title)));
            }
            let closer;
            if (closable) {
                closer = (React.createElement("button", { type: "button", onClick: this.close, "aria-label": "Close", className: `${prefixCls}-close` },
                    React.createElement(Icon, { className: `${prefixCls}-close-x`, type: "close" })));
            }
            const style = { ...props.style, ...dest };
            const transitionName = this.getTransitionName();
            const dialogElement = (React.createElement(LazyRenderBox, { key: "dialog-element", role: "document", ref: this.saveRef('dialog'), style: style, className: `${prefixCls} ${props.className || ''}`, hidden: !props.visible },
                React.createElement("div", { className: `${prefixCls}-content` },
                    closer,
                    header,
                    React.createElement("div", Object.assign({ className: `${prefixCls}-body`, style: props.bodyStyle }, props.bodyProps), props.children),
                    footer),
                React.createElement("div", { tabIndex: 0, ref: this.saveRef('sentinel'), style: { width: 0, height: 0, overflow: 'hidden' } }, "sentinel")));
            return (React.createElement(Animate, { key: "dialog", hiddenProp: "hidden", onEnd: this.onAnimateEnd, onLeave: this.onAnimateLeave, transitionName: transitionName, component: "", transitionAppear: true }, props.visible || !props.destroyOnClose ? dialogElement : null));
        };
        this.getZIndexStyle = () => {
            const style = {};
            const props = this.props;
            if (props.zIndex !== undefined) {
                style.zIndex = props.zIndex;
            }
            return style;
        };
        this.getWrapStyle = () => {
            const { wrapStyle } = this.props;
            return { ...this.getZIndexStyle(), ...wrapStyle };
        };
        this.getMaskStyle = () => {
            const { maskStyle } = this.props;
            return { ...this.getZIndexStyle(), ...maskStyle };
        };
        this.getMaskElement = () => {
            const props = this.props;
            let maskElement;
            if (props.mask) {
                const maskTransition = this.getMaskTransitionName();
                maskElement = (React.createElement(LazyRenderBox, Object.assign({ style: this.getMaskStyle(), key: "mask", className: `${props.prefixCls}-mask`, hiddenClassName: `${props.prefixCls}-mask-hidden`, hidden: !props.visible }, props.maskProps)));
                if (maskTransition) {
                    maskElement = (React.createElement(Animate, { key: "mask", hiddenProp: "hidden", transitionAppear: true, component: "", transitionName: maskTransition }, maskElement));
                }
            }
            return maskElement;
        };
        this.getMaskTransitionName = () => {
            const props = this.props;
            let transitionName = props.maskTransitionName;
            const animation = props.maskAnimation;
            if (!transitionName && animation) {
                transitionName = `${props.prefixCls}-${animation}`;
            }
            return transitionName;
        };
        this.getTransitionName = () => {
            const props = this.props;
            let transitionName = props.transitionName;
            const animation = props.animation;
            if (!transitionName && animation) {
                transitionName = `${props.prefixCls}-${animation}`;
            }
            return transitionName;
        };
        this.setScrollbar = () => {
            if (this.bodyIsOverflowing && this.scrollbarWidth !== undefined) {
                document.body.style.paddingRight = `${this.scrollbarWidth}px`;
            }
        };
        this.addScrollingEffect = () => {
            openCount++;
            if (openCount !== 1) {
                return;
            }
            this.checkScrollbar();
            this.setScrollbar();
            document.body.style.overflow = 'hidden';
            // this.adjustDialog();
        };
        this.removeScrollingEffect = () => {
            openCount--;
            if (openCount !== 0) {
                return;
            }
            document.body.style.overflow = '';
            this.resetScrollbar();
            // this.resetAdjustments();
        };
        this.close = (e) => {
            const { onClose } = this.props;
            if (onClose) {
                onClose(e);
            }
        };
        this.checkScrollbar = () => {
            let fullWindowWidth = window.innerWidth;
            if (!fullWindowWidth) {
                // workaround for missing window.innerWidth in IE8
                const documentElementRect = document.documentElement.getBoundingClientRect();
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
            }
            this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
            if (this.bodyIsOverflowing) {
                this.scrollbarWidth = getScrollBarSize();
            }
        };
        this.resetScrollbar = () => {
            document.body.style.paddingRight = '';
        };
        this.adjustDialog = () => {
            const { wrap } = this;
            if (wrap && this.scrollbarWidth !== undefined) {
                const modalIsOverflowing = wrap.scrollHeight > document.documentElement.clientHeight;
                wrap.style.paddingLeft = `${!this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : ''}px`;
                wrap.style.paddingRight = `${this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''}px`;
            }
        };
        this.resetAdjustments = () => {
            const { wrap } = this;
            if (wrap) {
                const { style } = wrap;
                style.paddingLeft = '';
                style.paddingRight = '';
            }
        };
        this.saveRef = (name) => (node) => {
            this[name] = node;
        };
    }
    componentWillMount() {
        this.inTransition = false;
        this.titleId = `rcDialogTitle${uuid++}`;
    }
    componentDidMount() {
        const { center } = this.props;
        const dialogNode = findDOMNode(this.dialog);
        if (center && dialogNode) {
            const { style } = dialogNode;
            this.center();
            style.margin = '0';
            style.padding = '0';
            this.onEventListener();
        }
        this.componentDidUpdate({});
    }
    componentDidUpdate(prevProps) {
        const { mousePosition, visible, mask } = this.props;
        if (visible) {
            // first show
            if (!prevProps.visible) {
                this.center();
                this.openTime = Date.now();
                this.lastOutSideFocusNode = document.activeElement;
                this.addScrollingEffect();
                this.wrap.focus();
                const dialogNode = findDOMNode(this.dialog);
                if (mousePosition) {
                    const elOffset = offset(dialogNode);
                    setTransformOrigin(dialogNode, `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`);
                }
                else {
                    setTransformOrigin(dialogNode, '');
                }
            }
        }
        else if (prevProps.visible) {
            this.inTransition = true;
            if (mask && this.lastOutSideFocusNode) {
                try {
                    this.lastOutSideFocusNode.focus();
                }
                catch (e) {
                    this.lastOutSideFocusNode = null;
                }
                this.lastOutSideFocusNode = null;
            }
        }
    }
    componentWillUnmount() {
        const { visible, center } = this.props;
        if (visible || this.inTransition) {
            this.removeScrollingEffect();
        }
        if (center) {
            this.removeEventListener();
        }
    }
    render() {
        const { props } = this;
        const { prefixCls, maskClosable } = props;
        const style = this.getWrapStyle();
        // clear hide display
        // and only set display after async anim, not here for hide
        if (props.visible) {
            style.display = null;
        }
        return (React.createElement("div", null,
            this.getMaskElement(),
            React.createElement("div", Object.assign({ tabIndex: -1, onKeyDown: this.onKeyDown, className: `${prefixCls}-wrap ${props.wrapClassName || ''}`, ref: this.saveRef('wrap'), onClick: maskClosable ? this.onMaskClick : undefined, role: "dialog", "aria-labelledby": props.title ? this.titleId : null, style: style }, props.wrapProps), this.getDialogElement())));
    }
}
Dialog.defaultProps = {
    className: '',
    mask: true,
    visible: false,
    keyboard: true,
    closable: true,
    maskClosable: true,
    destroyOnClose: false,
    prefixCls: 'rc-dialog',
    center: false,
};
