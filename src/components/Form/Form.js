import { useForm, ValidationError } from "@formspree/react";
import { FormButton } from "../UI/Button";
import {
  FormContainer,
  FormGroup,
  FormLabel,
  FormInput,
  FormArea,
} from "./Form.style";

const Form = function () {
  const [state, handleSubmit] = useForm("mdobywvr");

  if (state.succeeded) {
    return <p>Success!!!</p>;
  }

  return (
    <FormContainer method='POST' action='' onSubmit={handleSubmit}>
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
      <FormGroup>
        <FormButton>Submit</FormButton>
      </FormGroup>
    </FormContainer>
  );
};

export default Form;
