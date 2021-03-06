import React, { Component } from "react";
import { connect } from "react-redux";
import Day from "components/Day";
import "./style.css";

class DayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      loaded: false
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.initial !== this.state.selected && !this.state.loaded) {
      this.setState({
        selected: this.props.initial,
        loaded: true
      });
    }
  }

  handleSelect(e) {
    const { selected } = this.state;
    const { days } = this.props;
    let tempSelected = Object.assign({}, selected);
    tempSelected[e.target.getAttribute("value")] = !selected[
      e.target.getAttribute("value")
    ];
    this.setState({
      selected: tempSelected,
      loaded: true
    });
    days(tempSelected);
  }

  render() {
    const { selected } = this.state;
    const { handleSelect } = this;
    return (
      <div className="day-picker">
        <Day value="sun" selected={selected["sun"]} onClick={handleSelect}>
          S
        </Day>
        <Day value="mon" selected={selected["mon"]} onClick={handleSelect}>
          M
        </Day>
        <Day value="tue" selected={selected["tue"]} onClick={handleSelect}>
          T
        </Day>
        <Day value="wed" selected={selected["wed"]} onClick={handleSelect}>
          W
        </Day>
        <Day value="thu" selected={selected["thu"]} onClick={handleSelect}>
          T
        </Day>
        <Day value="fri" selected={selected["fri"]} onClick={handleSelect}>
          F
        </Day>
        <Day value="sat" selected={selected["sat"]} onClick={handleSelect}>
          S
        </Day>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayPicker);
