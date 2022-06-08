import { useForm, ValidationError } from "@formspree/react";
import Success from "../success/Success";
import { FormButton } from "../UI/Button";
import { useState } from "react";
import {
  FormContainer,
  FormGroup,
  FormLabel,
  FormInput,
  FormArea,
} from "./Form.style";

const Form = function () {
  const [state, handleSubmit] = useForm("mdobywvr");
  const [modalIsHidden, setModalIsHidden] = useState(false);

  const hideModal = function (e) {
    setModalIsHidden(true);
  };

  return (
    <FormContainer method='POST' action='' onSubmit={handleSubmit}>
      <FormGroup>
        <FormLabel htmlFor='name'>Your Name*</FormLabel>
        <FormInput required id='name' name='name' type='text' />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor='email'>Your Email*</FormLabel>
        <FormInput required id='email' name='email' type='email' />
        <ValidationError prefix='Email' field='email' errors={state.errors} />
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
        <ValidationError
          prefix='Message'
          field='message'
          errors={state.errors}
        />
      </FormGroup>
      <FormGroup>
        <FormButton type='submit' disabled={state.submitting}>
          {!state.submitting && "Submit"}
          {state.submitting && "Loading..."}
        </FormButton>
      </FormGroup>
      {state.succeeded && (
        <Success
          display='flex'
          modalIsHidden={modalIsHidden}
          hideModal={hideModal}
        />
      )}
    </FormContainer>
  );
};

export default Form;
