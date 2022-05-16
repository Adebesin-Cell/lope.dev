import styledComponents from "styled-components";

export const FormContainer = styledComponents.form`
    display: block;
`;

export const FormGroup = styledComponents.div`
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

export const FormLabel = styledComponents.label`
    font-family: var(--Inter);
    font-size: calc(var(--size-m) + 2px);
    font-weight: var(--weight-sm);
    line-height: 25px;
    color: ${({ theme }) => theme.active};
`;

export const FormInput = styledComponents.input`
    font-family: var(--Inter);
    font-size: var(--size-m);
    font-weight: var(--weight-sm);
    line-height: 23px;
    text-align: left;
    color: ${({ theme }) => theme.formInput};
    display: block;
    border: 1px solid transparent;
    outline: none;
    background: ${({ theme }) => theme.formInputBg};
    padding: var(--span-xs) var(--span-m);
    height: 55px;
    appearance: none;

    &:-webkit-autofill {
        color: ${({ theme }) => theme.formInput};
        box-shadow: 0 0 0px 1000px ${({ theme }) =>
          theme.formInputBg} inset !important;
        -webkit-text-fill-color: ${({ theme }) => theme.formInput} !important;
        font-family: var(--Inter);
        font-size: var(--size-m);
        font-weight: var(--weight-sm);
        line-height: 23px;
        text-align: left;
        border: 1px solid transparent !important;
        outline: none !important;
    }
`;

export const FormArea = styledComponents.textarea`
    font-family: var(--Inter);
    font-size: var(--size-m);
    font-weight: var(--weight-sm);
    line-height: 23px;
    text-align: left;
    color: ${({ theme }) => theme.formInput};
    display: block;
    border: 1px solid transparent;
    outline: none;
    background: ${({ theme }) => theme.formInputBg};
    padding: var(--span-xs) var(--span-m);
    appearance: none;
    resize: none;

    &:-webkit-autofill {
        color: ${({ theme }) => theme.formInput};
        box-shadow: 0 0 0px 1000px ${({ theme }) =>
          theme.formInputBg} inset !important;
        -webkit-text-fill-color: ${({ theme }) => theme.formInput} !important;
        font-family: var(--Inter);
        font-size: var(--size-m);
        font-weight: var(--weight-sm);
        line-height: 23px;
        text-align: left;
        border: 1px solid transparent !important;
        outline: none !important;
    }
`;
