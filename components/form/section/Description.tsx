import FieldLabel from '../FieldLabel';
import {useState} from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import 'react-quill/dist/quill.snow.css';

const DescriptionEditor = () => {
  const [value, setValue] = useState('');
  return (
    <ReactQuill
      value={value}
      onChange={setValue}
    />
  );
};
const Description = () => {
  return (
    <>
      <FieldLabel>
      Description
      </FieldLabel>
      <div>
        <DescriptionEditor />
      </div>
    </>
  );
};

export default Description;
