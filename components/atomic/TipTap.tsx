import {useEditor, EditorContent} from '@tiptap/react';
import Link from '@tiptap/extension-link';
import Code from '@tiptap/extension-code';
import Text from '@tiptap/extension-text';
import Paragraph from '@tiptap/extension-paragraph';
import Document from '@tiptap/extension-document';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';

import {useCallback} from 'react';
export const TipTap = ({
  handleChange,
}: {
  handleChange: any
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Code,
      Bold,
      Italic,
      Link.configure({
        openOnClick: false,
      }),
      Heading.configure({
        levels: [2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: `
      <p>
        Try to add some text here. Use the buttons above for basic styling.
      </p>
    `,
    editorProps: {
      attributes: {
        class: `prose focus:outline-none prose-stone leading-0.5`,
      },
    },
    onUpdate: handleChange,
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink()
          .run();

      return;
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({href: url})
        .run();
  }, [editor]);
  return (
    <div className='rounded-lg ring-gray-300 border-gray-800 bg-white p-3'>
      <div className='mb-3'>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({level: 2}).run()}
          className={
            `${editor?.isActive('heading', {level: 2}) ? 'is-active' : ''}` + ` ` + `border-2 border-primary rounded-lg mx-1 px-2 text-gray-800`
          }
        >
          h1
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({level: 3}).run()}
          className={
            `${editor?.isActive('heading', {level: 3}) ? 'is-active' : ''}` + ` ` + `border-2 border-primary rounded-lg mx-1 px-2 text-gray-800`
          }
        >
          h2
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={
            `${editor?.isActive('bold') ? 'is-active' : ''}` +
          ` ` +
          `border-2 border-primary rounded-lg mx-1 px-2 text-gray-800`
          }
        >
          bold
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={
            `${editor?.isActive('italic') ? 'is-active' : ''}` +
          ` ` +
          `border-2 border-primary rounded-lg mx-1 px-2 text-gray-800`
          }
        >
          italic
        </button>
        <button
          onClick={setLink}
          className={
            `${editor?.isActive('italic') ? 'is-active' : ''}` +
          ` ` +
          `border-2 border-primary rounded-lg mx-1 px-2 text-gray-800`
          }
        >
          set link
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
