import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import _ from "lodash";

class SearchDetail extends Component {
  render() {
    const { event, filters } = this.props;

    if (!event) {
      return <div>Loading...</div>;
    }

    let highlightedText = event.description;

    //replace any instace of our page filter with a span that highlights the word and makes it huge
    _.forEach([...filters, "free"], function(value) {
      var regex = new RegExp("\\b" + value + "\\b", "gi");
      highlightedText = highlightedText.replace(regex, function(matched) {
        return '<span class="important-term">' + matched + "</span>";
      });
    });

    return (
      <div>
        <Link to="/">Back To Events Page</Link>
        <h3>
          <a href={event.link} target="_blank">
            {event.name}
          </a>
        </h3>
        <h5 style={{ color: "yellow" }}>
          Date: {moment(event.local_date).format("MMMM Do YYYY")} Time:{" "}
          {moment(event.local_time, "HH:mm:ss").format("h:mm A")}
        </h5>
        {/* doing this so that html from meetup is rendered nicely */}
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        ></div>
      </div>
    );
  }
}

//set event to the id that matches the url
function mapStateToProps({ events, filters }, ownProps) {
  return {
    event: events.find(e => e.id === ownProps.match.params.id),
    filters
  };
}

export default connect(
  mapStateToProps,
  null
)(SearchDetail);
