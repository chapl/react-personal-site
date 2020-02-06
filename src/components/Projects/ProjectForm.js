import React, { useState } from 'react';
import firebase from "firebase";
import FileUploader from 'react-firebase-file-uploader';

import config from '../../firebase/firebase';
import { updateObject } from '../../shared/utility';
import { checkValidity } from '../../shared/utility';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button';
import classes from './ProjectForm.module.css';

firebase.initializeApp(config);

const ProjectForm = React.memo(props => {
  const formElementsArray = [];
  const [imgUrl, setImgUrl] = useState('');
  const [projectForm, setProjectForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          placeholder: 'Project name'
      },
      value: '',
      validation: {
          required: true,
          minLength: 5
      },
      valid: false,
      touched: false
    },
    link: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          placeholder: 'Project link'
      },
      value: '',
      validation: {
          required: true,
          minLength: 5
      },
      valid: false,
      touched: false
    },
    stack: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          placeholder: 'Development stack'
      },
      value: '',
      validation: {
          required: true,
          minLength: 4
      },
      valid: false,
      touched: false
    },
    stackDescription: {
      elementType: 'textarea',
      elementConfig: {
          type: 'text',
          placeholder: 'Project Details'
      },
      value: '',
      validation: {
          required: true,
          minLength: 5
      },
      valid: false,
      touched: false
    },
    challenges: {
      elementType: 'textarea',
      elementConfig: {
          type: 'text',
          placeholder: 'Challenges or interesting points'
      },
      value: '',
      validation: {
          required: true,
          minLength: 5
      },
      valid: false,
      touched: false
    }    
  });

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(projectForm, {
        [controlName]: updateObject(projectForm[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, projectForm[controlName].validation),
            touched: true
        })           
    });
    setProjectForm(updatedControls)
  }

  const submitHandler = event => {
    let canSubmit = true
    event.preventDefault();
    for (let key in projectForm){
      if (!projectForm[key].valid){
        canSubmit = false
      }
    }
    if (canSubmit){
      props.onAddProject({ 
        title: projectForm.name.value, 
        link: projectForm.link.value, 
        stack: projectForm.stack.value, 
        stackDesc: projectForm.stackDescription.value,
        challenges: projectForm.challenges.value, 
        URL: imgUrl
      });
    }
  };

  const handleUploadError = error => {
    console.error(error);
  };

  const handleUploadSuccess = (filename, authContext) => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => setImgUrl(url)
      );      
  };

  for (let key in projectForm) {
      formElementsArray.push({
          id: key,
          config: projectForm[key]
      })
  }
  let form = formElementsArray.map(formElement => (
      <Input
          key={formElement.id}
          elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangedHandler(event, formElement.id)}/>
  ))

  return (
    <section  className={classes.ProjectForm}>
      <Card>
        <form onSubmit={submitHandler}>
          {form}
          <div className={classes.FormControl}>
            <FileUploader
              className={classes.File}
              accept="image/*"
              name="img"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadError={handleUploadError}
              onUploadSuccess={handleUploadSuccess}
          />
          </div>
          <div className={classes.Submit}>
            <Button>SUBMIT</Button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default ProjectForm;
