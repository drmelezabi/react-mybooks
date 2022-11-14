export const ErrorHandling = (errorCode: number): string => {
  switch (errorCode) {
    case 500:
      throw new Error("not found");
    case 403:
      throw new Error("Unauthorized");
    default:
      throw new Error("unknown Error");
  }
};
