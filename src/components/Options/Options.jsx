import PropTypes from 'prop-types';
import css from './Options.module.css';

const Options = ({ updateFeedback, resetFeedback, totalFeedback }) => {
  return (
    <ul className={css.optionbtn}>
      <li><button onClick={() => updateFeedback('good')}>Good</button></li>
      <li><button onClick={() => updateFeedback('neutral')}>Neutral</button></li>
      <li><button onClick={() => updateFeedback('bad')}>Bad</button></li>
      {totalFeedback > 0 && <li><button onClick={resetFeedback}>Reset</button></li>}
    </ul>
  )
}

Options.propTypes = {
  updateFeedback: PropTypes.func.isRequired,
  resetFeedback: PropTypes.func.isRequired,
  totalFeedback: PropTypes.number.isRequired,
}

export default Options;
