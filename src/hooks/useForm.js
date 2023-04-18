import React, { useContext, useMemo } from 'react'
import { FormContext } from '../form-context/FormContext';

export const useForm = () => {
    const formData = useContext(FormContext);
    const { formState, formDispatch } = formData;
    
    const forms = useMemo(() => {
        return formState.forms;
      }, [formState.forms]);

    return {
        forms,
        formState,
        formDispatch
      };
}
