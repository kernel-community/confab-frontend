import FieldLabel from './StrongText';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({
  handleChange,
}: {
  handleChange:any
}) => {
  return (
    <ReactQuill
      value={''}
      onChange={(content, delta, source, editor) => handleChange(content, editor.getText())}
    />
  );
};
const RichText = ({
  handleChange,
}: {
  handleChange:any
}) => {
  return (
    <>
      <FieldLabel>
        Description
      </FieldLabel>
      <div>
        <RichTextEditor handleChange={handleChange}/>
      </div>
    </>
  );
};

export default RichText;
