import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./index.less";

interface ModalProps {
  modalRoot: React.RefObject<HTMLDivElement>;
}

class Modal extends Component<ModalProps> {
  // ths parent of the children from the props of Modal
  modalContainer: HTMLElement;

  constructor(props: ModalProps) {
    super(props);
    this.modalContainer = document.createElement("div");
  }

  componentDidMount() {
    // append the container to the root dom of the modal
    // provided by the parent
    this.props.modalRoot.current!.append(this.modalContainer);
  }

  //   componentWillUnmount() {
  //     this.props.modalRoot.current!.removeChild(this.modalContainer);
  //   }

  render() {
    // append the children from props
    // to the container
    // see the type of the params of createPortal...
    // then you know what it is for
    return ReactDOM.createPortal(this.props.children, this.modalContainer);
  }
}

function ModalChild() {
  return <div>i am a kid</div>;
}

export default class PortalDemo extends Component {
  modalRoot = React.createRef<HTMLDivElement>();

  state = {
    showModal: false,
  };

  handleShowModal = () => {
    const { showModal } = this.state;

    this.setState({
      showModal: !showModal,
    });
  };

  render() {
    const { showModal } = this.state;

    return (
      <div className="portal-box">
        <div
          className="modal-root"
          ref={this.modalRoot}
          style={showModal ? { display: "block" } : { display: "none" }}
        ></div>
        <button onClick={this.handleShowModal}>{`${
          showModal ? "close" : "show"
        } modal`}</button>
        <Modal modalRoot={this.modalRoot}>
          <ModalChild />
        </Modal>
      </div>
    );
  }
}
