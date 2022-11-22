const sentry = window.Sentry;

const logToSentry = (error, errorInfo) => {
  if (!sentry) {
    console.error(error);
    return;
  }
  sentry.withScope(function (scope) {
    if (errorInfo) {
      scope.setExtra("errorInfo", JSON.stringify(errorInfo));
    }
    sentry.captureException(error);
  });
};

export default logToSentry;
