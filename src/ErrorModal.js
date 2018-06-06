import React from "react";
import PropTypes from "prop-types";

const ErrorModal = props => {
  this.onOK = event => {
    const { onErrorOK } = this.props;
    let errModal = document.getElementById("error-modal");
    if (errModal) {
      errModal.style.display = "none";
      onErrorOK();
    }
  };
  const { error } = props;

  return (
    <div id="error-modal" className="error-info">
      <div className="error-content">
        <div className="error-header">
          <h4>Something went wrong!</h4>
        </div>
        <div className="error-body">
          {error.id && (
            <p>
              <strong>ID: </strong>
              <span>{props.error.id}</span>
            </p>
          )}
          {error.info && (
            <p>
              <strong>Info: </strong>
              <span>{props.error.info}</span>
            </p>
          )}
          {error.extra && (
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
            aria-label="ok"
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
