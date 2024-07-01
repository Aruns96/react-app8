
import classes from './StartingPageContent.module.css';
import { useEffect } from 'react';

const StartingPageContent = () => {
  
  
  useEffect(()=>{
    setTimeout(()=>{localStorage.removeItem("token")},300000)
})
  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  );
};

export default StartingPageContent;
