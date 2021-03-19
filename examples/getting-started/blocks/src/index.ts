import Example from './example';
import EmailOptIn from './email-opt-in';

const namespace = 'genesis-custom-blocks';

// The GCB block slugs follow the namespace, like 'example' and 'email-opt-in'.
const blockComponents = {
  [`${namespace}/example`]: Example,
  [`${namespace}/email-opt-in`]: EmailOptIn,
};

export default blockComponents;
