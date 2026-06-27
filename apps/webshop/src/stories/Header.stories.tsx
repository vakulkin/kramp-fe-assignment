import { storiesOf } from '@storybook/react';

import { Header } from '../components/widgets/header/Header';

storiesOf('Header', module)
  .add('default', () => (
    <Header
      query=""
      setQuery={() => {}}
      results={[]}
      isOpen={false}
      setIsOpen={() => {}}
    />
  ))
  .add('with items', () => (
    <Header
      query=""
      setQuery={() => {}}
      results={[]}
      isOpen={false}
      setIsOpen={() => {}}
    />
  ));

