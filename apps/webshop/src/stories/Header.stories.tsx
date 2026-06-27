import { storiesOf } from '@storybook/react';

import { Header } from '../components/widgets/header/Header';

storiesOf('Header', module)
  .add('default', () => <Header />)
  .add('with items', () => <Header />);
