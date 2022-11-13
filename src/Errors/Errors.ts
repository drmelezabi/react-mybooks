export const Errorhandeling = (errorCode: number) => {
  switch (errorCode) {
    case 500:
      throw "not found";
    case 403:
      throw "Unauthorized";
    default:
      throw "unknown Error";
  }
};
