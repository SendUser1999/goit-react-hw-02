import { useState, useEffect } from 'react';
import './App.css';
import Feedback from './Feedback/Feedback';
import Options from './Options/Options';
import Description from './Description/Description';
import Notification from './Notification/Notification';

function App() {
  const [ feedbackStates, setFeedbackStates ] = useState(() => {
    const savedFeedback = window.localStorage.getItem("feedback-states");
    if (savedFeedback !== null) {
      return JSON.parse(savedFeedback);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0
    }
  });

  const [resetClicked, setResetClicked] = useState(false);

  const totalFeedback = feedbackStates.good + feedbackStates.neutral + feedbackStates.bad;
  const positiveFeedback = totalFeedback > 0 ? Math.round(((feedbackStates.good + feedbackStates.neutral) / totalFeedback) * 100) : 0;

  useEffect(() => {
    window.localStorage.setItem("feedback-states", JSON.stringify(feedbackStates));
  }, [feedbackStates]);

  const updateFeedback = feedbackType => {
    setFeedbackStates({
      ...feedbackStates,
      [feedbackType]: feedbackStates[feedbackType] + 1,
    });
    setResetClicked(false); 
  }

  const resetFeedback = () => {
    setFeedbackStates({
      good: 0,
      neutral: 0,
      bad: 0,
    });
    setResetClicked(true); 
  }

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} resetFeedback={resetFeedback} totalFeedback={totalFeedback} resetClicked={resetClicked} />
      {totalFeedback > 0 ? (
        <Feedback states={feedbackStates} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback} />
      ) : (
        <Notification />
      )}
    </>
  )
}

export default App;

