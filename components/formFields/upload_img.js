import React, { Component } from 'react';

class ThumbImg extends Component {
  state = {
    loading: false,
    thumb: undefined,
  };
  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { thumb } = this.state;
    return (
      <img
        src={
          thumb
            ? thumb
            : this.props.image !== ''
            ? this.props.image
            : '/images/avatar.svg'
        }
        className="img-thumbnail"
      />
    );
  }
}

export default ThumbImg;
