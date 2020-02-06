import React from 'react';

import Card from '../UI/Card/Card';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import classes from './ProjectList.module.css';
import Button from '../UI/Button/Button';

const ProjectList = props => {

  const lF = [
    {
      title: "JS",
      body: "vanilla JS, Node, Angular and React"
    },
    {
      title: "PHP",
      body: "vanilla PHP, Laravel"
    },    
    {
      title: "Python",
      body: "scraping and automation scripts, Kivy and Tkinter"
    },
    {
      title: "Databases",
      body: "MYSQL, MongoDB, SQLite"
    },
    {
      title: "Other",
      body: "Docker, Git version control, Nginx, Certbot, SSL CLI (digital ocean droplets)"
    },
    {
      title: "Projects for others",
      body: "Projects for other companies are not shown here and can be made available on request."
    }
  ]

  const linkHandler = (link) => {
    window.open(link)
  }

  return (
    <Aux>
      <Card>
        <h2>Languages and Frameworks</h2>
        <table>
          <tbody>
          {lF.map(topic =>(
            <tr className={classes.Row} key={topic.title}>
              <td className={classes.Title}>{topic.title}</td>
              <td className={classes.Body}>{topic.body}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </Card>
      <ul className={classes.List}>
        {props.projects.map(proj => (
          <Card key={proj.id} >
            <h2 className={classes.ProjTitle}>{proj.title}</h2>
            {props.authStatus && <Button clicked={props.onRemoveItem.bind(this, proj.id)}>Remove {proj.title}</Button>}
            <div className={classes.Content}>
              <div className={classes.Details}>
                <Button clicked={() => linkHandler(proj.link)}>link</Button>
                <p className={classes.Stack}>{proj.stack}</p>
              </div>              
              <p>{proj.stackDesc}</p>
              <img className={classes.Image} src={proj.imgUrl} alt={proj.title}></img>
              <p>{proj.challenges}</p> 
            </div>
          </Card>
        ))}
      </ul>
    </Aux>
  );
};

export default ProjectList;
