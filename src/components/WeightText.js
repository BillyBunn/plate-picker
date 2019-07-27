import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Application } from '../App';

const WeightText = () => {
  const { state } = React.useContext(Application);
  const currentWeight = state.currentWeight;
  const units = state.currentUnits.slice(0, -1);
  const { plates, bar, targetWeight, remainder } = currentWeight;

  return (
    <>
      {plates.length > 0 ? <Typography variant="h5" gutterBottom>
        Put{' '}
        {plates.map(({ weight, qty }, idx, arr) => {
          const last = idx === arr.length - 1;
          const plural = qty > 1;
          return (
            <span key={idx}>
              {arr.length > 1 && last && 'and '}
              <strong>{qty}</strong>{' '}
              <em>
                {weight}
                {plural && "'s"}
              </em>
              {!last ? ', ' : ` ${units} plates `}
            </span>
          );
        })}{' '}
        on each side of the <em>{bar}</em> {units} bar.
      </Typography> : <Typography variant="h5" gutterBottom>Just lift the <em>{bar}</em> {units} bar.</Typography>}
      {remainder > 0 && (
        <Typography>
          You're short of {targetWeight} by {remainder} {units}. Smaller plates
          needed to reach an exact match.
        </Typography>
      )}
    </>
  );
};

export default WeightText;
