import classNames from "classnames";
import { timeHours } from "d3";
import portalRoot from "portalRoot";
import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import "./assets/Dialog.scss";

interface Props {
  isOpen?: boolean;
  children: ReactNode;
  overflow?: string;
  title?: string | ReactNode;
  defaultX: number;
  defaultY: number;
  className?: string;
  close: () => void;
  resizeAble?: boolean;
}

class Dialog extends React.Component<Props> {
  el: HTMLDivElement;
  mainRef: React.RefObject<HTMLInputElement>;
  isMouseDown: boolean = false;
  startX: number = 0;
  startY: number = 0;
  state = {};

  constructor(props: Props) {
    super(props);
    this.el = document.createElement("div");
    this.toggle = this.toggle.bind(this);
    this.mainRef = React.createRef();
    this.isMouseDown = false;
  }

  componentWillMount() {
    portalRoot.append(this.el);
  }

  componentDidMount() {
    window.addEventListener("pointermove", this.windowMouseMove);
  }

  componentWillUnmount() {
    portalRoot.removeChild(this.el);
    window.removeEventListener("pointermove", this.windowMouseMove);
  }

  onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    document.body.style.userSelect = "none";
    const rect = e.currentTarget.getBoundingClientRect();
    const left: number = rect.left;
    const top: number = rect.top;
    this.startX = e.pageX - left;
    this.startY = e.pageY - top;
    this.isMouseDown = true;
  };

  onMouseUp = (e: React.MouseEvent) => {
    document.body.style.userSelect = "text";
    this.isMouseDown = false;
  };

  windowMouseMove = (e: MouseEvent) => {
    if (this.mainRef.current && this.isMouseDown) {
      this.mainRef.current.style.left = `${e.pageX - this.startX}px`;
      this.mainRef.current.style.top = `${e.pageY - this.startY}px`;
    }
  };

  toggle() {
    this.props.close();
  }

  render() {
    const {
      title,
      children,
      isOpen,
      overflow,
      defaultX = 0,
      defaultY = 0,
      resizeAble = false,
    } = this.props;


    return ReactDOM.createPortal(
      <div
        ref={this.mainRef}
        style={{
          left: defaultX,
          top: defaultY,
          zIndex: 11,
        }}
        onMouseDown={() => {
          if (this.mainRef.current) {
            this.mainRef.current.style.zIndex =
              Math.floor(Date.now() / 1000) + "";
          }
        }}
        className={classNames(
          { "d-none": !isOpen },
          "position-fixed",
          this.props.className
        )}>
        <div
          className={classNames(this.props.className, "dialog")}
          style={{
            resize: resizeAble ? "inline" : "none",
            overflow: overflow ? overflow : "hidden",
            direction: "ltr",
          }}>
          <div
            className="dialog-header d-flex"
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}>
            <div className="title flex-grow-1">{title}</div>
            <div className="close cursor-pointer" onClick={() => this.toggle()}>
              <i className="online-icon-close"></i>
            </div>
          </div>
          <div className="dialog-body">{children}</div>
        </div>
      </div>,
      this.el
    );
  }
}

export default Dialog;
