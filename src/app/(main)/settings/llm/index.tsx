'use client';

import { Flexbox } from 'react-layout-kit';

import OpenAI from './OpenAI';
import Footer from './components/Footer';

const Page = () => {
  return (
    <Flexbox gap={24} width={'100%'}>
      <OpenAI />
      <Footer />
    </Flexbox>
  );
};

Page.displayName = 'LlmSetting';

export default Page;
