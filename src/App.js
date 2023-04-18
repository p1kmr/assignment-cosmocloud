import logo from './logo.svg';
import './App.css';
import { FormContext, boxReducer, initialFormState } from './form-context/FormContext';
import { FormWrapper } from './components/FormWrapper';
import { useMemo, useReducer } from 'react';

function App() {
  const [formState, formDispatch] = useReducer(boxReducer, initialFormState);
  const formContextValue = useMemo(() => {
    return {
      formState,
      formDispatch,
    };
  }, [formState]);
  
  return (
  
      <FormContext.Provider value={formContextValue}>
        <FormWrapper/>
      </FormContext.Provider>
       
   
  );
}

export default App;
