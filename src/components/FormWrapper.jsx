import React, { useState } from 'react'
import { Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from '../hooks/useForm.js';
import { formAction } from '../store/formAction.js';
import { Form } from './Form.jsx';
import { useStyles } from './FormWrapper.style.js';

export const FormWrapper = () => {
  const classes = useStyles();
  const { formDispatch, formState, forms } = useForm();
  const [childFormOpen, setChildFormOpen] = useState(false);

  const generateParent = () => {
    formDispatch({ type: formAction.GENERATE_PARENT, payload: {} });
  }

  const generateChild = (singleForm) => {
    if(singleForm.fieldTypeDropdown==="object"){
      const parentId = singleForm?.fieldId;
      formDispatch({ type: formAction.GENERATE_CHILD, payload: { parentId } });
      setChildFormOpen(true);
    } 
  }

  const deleteParent = (singleForm) => {
    const parentId = singleForm?.fieldId;
    formDispatch({ type: formAction.DELETE_PARENT, payload: { parentId } });
  }

  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.titleHeader}>

        <Grid item xs={12} className={classes.innerBackground}>
          <Grid item xs={12} className={classes.content}>
            <Grid item xs={6} sx={{ m: "8px" }}>
              Field name and type
            </Grid>
            <Grid item xs={6} sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>

              <IconButton onClick={generateParent}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Form
            generateChild={generateChild}
            deleteParent={deleteParent}
            forms={forms}
            formDispatch={formDispatch}
            setChildFormOpen={setChildFormOpen}
            childFormOpen={childFormOpen} />

        </Grid>
      </Grid>
    </Grid>
  )
}

