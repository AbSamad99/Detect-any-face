import React from 'react';

function Rank({name,entries}){
  return(
    <div>
      <div className='f3 white'>
        {`${name}, Your total entry count is...`}
      </div>
      <div className='f1 white'>
        {entries}
      </div>
    </div>
  )
}

export default Rank;
