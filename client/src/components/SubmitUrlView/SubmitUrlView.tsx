import React from 'react';
import { useInput } from '../../hooks/useInput';

function SubmitUrlView() {
  const [url, handleUrl] = useInput();
  return (
    <>
      <h3>Submit a link!</h3>
      <input
        name="url"
        type="text"
        placeholder="Enter a url to shorten"
        value={url}
        onChange={handleUrl}
      />
      <button>Shorten!</button>
    </>
  );
}

export default SubmitUrlView;