import * as React from 'react';

interface Attributes {
  heading: string;
  'submission-message': string;
  'main-copy': string;
  'button-text': string;
}

interface EmailOptInProps {
  attrs: Attributes;
  attributes: Attributes;
}

/**
 * An example interactive block component.
 *
 * Feel free to rename this and replace it with your own.
 * The fields from Genesis Custom Blocks are in blockAttributes.
 */
function EmailOptIn(props: EmailOptInProps): React.ReactElement {
  const { attrs, attributes } = props;
  const blockAttributes = attrs || attributes;
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  return (
    <div>
      <h3>{blockAttributes.heading}</h3>
      {isSubmitted ? (
        <div>
          {isSuccess ? (
            <p>{blockAttributes['submission-message']}</p>
          ) : (
            <div>Sending!</div>
          )}
        </div>
      ) : (
        <div>
          <p>{blockAttributes['main-copy']}</p>
          <input placeholder="First name" type="text" />
          <input placeholder="Your email" type="text" />
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(!isSubmitted);
              setTimeout(() => setIsSuccess(!isSuccess), 2000);
            }}>
            {blockAttributes['button-text']}
          </button>
        </div>
      )}
    </div>
  );
}

export default EmailOptIn;
