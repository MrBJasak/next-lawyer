import BulletList from '@tiptap/extension-bullet-list';
import Highlight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from '@tiptap/extension-text-align';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaHeading,
  FaHighlighter,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaParagraph,
  FaRedo,
  FaStrikethrough,
  FaUndo,
  FaUnlink,
} from 'react-icons/fa';
import './styles.scss';

type BlogEditorProps = {
  content?: string;
  onSave: (content: string) => void;
};

const ToolbarButton = ({
  onClick,
  active,
  icon,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  icon: React.ReactNode;
  label: string;
}) => (
  <button className={`toolbar-button ${active ? 'active' : ''}`} onClick={onClick} title={label} type='button'>
    {icon}
  </button>
);

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className='editor-toolbar'>
      <div className='toolbar-group'>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          icon={<FaHeading />}
          label='Heading 1'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          icon={<FaHeading style={{ fontSize: '0.9em' }} />}
          label='Heading 2'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          icon={<FaHeading style={{ fontSize: '0.8em' }} />}
          label='Heading 3'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive('paragraph')}
          icon={<FaParagraph />}
          label='Paragraph'
        />
      </div>

      <div className='toolbar-group'>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          icon={<FaBold />}
          label='Bold'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          icon={<FaItalic />}
          label='Italic'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          icon={<FaStrikethrough />}
          label='Strikethrough'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive('highlight')}
          icon={<FaHighlighter />}
          label='Highlight'
        />
      </div>

      <div className='toolbar-group'>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          icon={<FaListUl />}
          label='Bullet List'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          icon={<FaListOl />}
          label='Ordered List'
        />
      </div>

      <div className='toolbar-group'>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
          icon={<FaAlignLeft />}
          label='Align Left'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
          icon={<FaAlignCenter />}
          label='Align Center'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
          icon={<FaAlignRight />}
          label='Align Right'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          active={editor.isActive({ textAlign: 'justify' })}
          icon={<FaAlignJustify />}
          label='Justify'
        />
      </div>

      <div className='toolbar-group'>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={<FaUndo />} label='Undo' />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={<FaRedo />} label='Redo' />
      </div>

      <div className='toolbar-group'>
        <ToolbarButton
          onClick={() => {
            const url = prompt('Enter a URL');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          active={editor.isActive('link')}
          icon={<FaLink />}
          label='Insert Link'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          icon={<FaUnlink />}
          label='Remove Link'
        />
      </div>
    </div>
  );
};

export const BlogEditor = ({ onSave, content }: BlogEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      History,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      BulletList,
      OrderedList,
      ListItem,
      Link.configure({
        openOnClick: true,
        autolink: false,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'editor-content',
      },
    },
    onUpdate: ({ editor }) => {
      onSave(editor.getHTML());
    },
  });

  return (
    <div className='blog-editor'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
