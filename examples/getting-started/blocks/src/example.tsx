import * as React from 'react';

interface Attributes {
  'new-field': string;
}

interface ExampleProps {
  attrs: Attributes;
  attributes: Attributes;
}

/**
 * An example block component.
 *
 * Feel free to rename this and replace it with your own.
 * The fields from Genesis Custom Blocks are in blockAttributes.
 * For example, if you added a field with the name (slug) of 'example-field',
 * it will be in blockAttributes['example-field].
 */
function Example(props: ExampleProps): React.ReactElement {
  const { attrs, attributes } = props;
  const blockAttributes = attrs || attributes;

  return (
    <div>
      <p>This is the React component</p>
      <p>{blockAttributes['new-field']}</p>
    </div>
  );
}

export default Example;
