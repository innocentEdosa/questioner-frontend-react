
const authFormValidator = (fieldName, formInputs) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/g;
  const fieldValue = formInputs[fieldName].trim();
  const error = formInputs.formError || {};

  if (!fieldValue) {
    error[fieldName] = `${fieldName} is required`;
    return error;
  }
  if (error[fieldName]) {
    delete error[fieldName];
  }

  switch (fieldName) {
    case 'username':
      if (symbolRegex.test(fieldValue)) {
        error[
          fieldName
        ] = `${fieldName} should not contain symbols`;
        return error;
      }
      if (fieldValue.length < 3) {
        error[
          fieldName
        ] = `Your ${fieldName} is too short. ${fieldName} should be more than 2 characters.`;
        return error;
      }
      break;

    case 'email':
      if (!emailRegex.test(fieldValue)) {
        error[
          fieldName
        ] = 'Please provide a valid email';
        return error;
      }
      break;

    case 'password':
      if (fieldValue.length < 5) {
        error[
          fieldName
        ] = `${fieldName} should be up to 5 characters.`;
        return error;
      }
      break;

    case 'password confirmation':
      if (!(fieldValue === formInputs.password)) {
        error[
          fieldName
        ] = 'Your password fields does not match';
        return error;
      }
      break;

    case 'title':
      if (symbolRegex.test(fieldValue)) {
        error[
          fieldName
        ] = `${fieldName} should not contain symbols`;
        return error;
      }
      if (fieldValue.length < 3) {
        error[
          fieldName
        ] = `Your ${fieldName} is too short. ${fieldName} should be more than 2 characters.`;
        return error;
      }
      break;

    case 'location':
      if (fieldValue.length < 15) {
        error[
          fieldName
        ] = `Your ${fieldName} is too short. ${fieldName} should be more than 15 characters.`;
        return error;
      }
      break;

    case 'description':
      if (fieldValue.length < 30) {
        error[
          fieldName
        ] = `Your ${fieldName} is too short. ${fieldName} should be more than 30 characters.`;
        return error;
      }
      break;
    case 'question':
      if (fieldValue.length < 3) {
        error[
          fieldName
        ] = `Your ${fieldName} is too short. ${fieldName} should be more than 3 characters.`;
        return error;
      }
      break;
    case 'comment':
      if (fieldValue.length < 3) {
        error[
          fieldName
        ] = `Your ${fieldName} is too short. ${fieldName} should be more than 3 characters.`;
        return error;
      }
      break;
    default:
      return error;
  }
};

export default authFormValidator;
