import {
  FormContainer,
  FormGroup,
  FormLabel,
  FormInput,
  FormArea,
} from "./Form.style";

const Form = function () {
  return (
    <FormContainer method='POST' action=''>
      <FormGroup>
        <FormLabel htmlFor='name'>Your Name*</FormLabel>
        <FormInput required id='name' name='name' type='text' />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor='email'>Your Email*</FormLabel>
        <FormInput required id='email' name='email' type='email' />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor='message'>Your Message*</FormLabel>
        <FormArea
          required
          id='message'
          name='message'
          type='email'
          rows={10}
          minLength='30'
        />
      </FormGroup>
    </FormContainer>
  );
};

export default Form;
