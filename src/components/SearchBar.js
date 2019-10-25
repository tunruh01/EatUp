import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { fetchEvents } from "../actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SearchBar extends Component {
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `input-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          placeholder="Location"
          className="form-control"
          type="text"
          {...field.input}
        />
        <span class="input-group-btn">
          <button type="submit" className="btn btn-primary submit-btn">
            Submit
          </button>
        </span>
        {/*<div className="text-help">{touched ? error : ""}</div>*/}
      </div>
    );
  }

  onSubmit(values) {
    this.props.fetchEvents(values.title);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="search-bar">
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="title" component={this.renderField} />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents }, dispatch);
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a location";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

const postNewPost = reduxForm({
  validate: validate,
  form: "postNew"
})(SearchBar);

export default connect(
  null,
  mapDispatchToProps
)(postNewPost);
