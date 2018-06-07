import React from "react";
import PropTypes from "prop-types";

const ErrorModal = props => {
  this.onOK = event => {
    let errModal = document.getElementById("error-modal");
    if (errModal) {
      errModal.style.display = "none";
      props.onErrorOK();
    }
  };

  return (
    <div id="error-modal" aria-label="error popup">
      <div className="error-content">
        <div className="error-header">
          <h4>Something went wrong!</h4>
        </div>
        <div className="error-body">
          {props.error.code && (
            <p>
              <strong>Error code: </strong>
              <span>{props.error.code}</span>
            </p>
          )}
          {props.error.message && (
            <p>
              <strong>Message: </strong>
              <span>{props.error.message}</span>
            </p>
          )}
          {props.error.extra && (
            <p>
              <strong>Extra: </strong>
              <span>{props.error.extra}</span>
            </p>
          )}
        </div>
        <div className="error-footer">
          <div>
            <p>Hint: call IT guy!</p>
          </div>
          <button
            id="error-ok-btn"
            aria-label="dismiss"
            type="submit"
            onClick={this.onOK}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

ErrorModal.propTypes = {
  error: PropTypes.object,
  onErrorOK: PropTypes.func
};
export default ErrorModal;
