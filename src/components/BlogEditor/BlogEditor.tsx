import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaEye,
  FaEyeSlash,
  FaHeading,
  FaHighlighter,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaPalette,
  FaParagraph,
  FaRedo,
  FaStrikethrough,
  FaUndo,
  FaUnlink,
} from 'react-icons/fa';
import './editor-styles.scss';

type BlogEditorProps = {
  content?: string;
  onSave: (content: string) => void;
};

const COLORS = [
  '#000000', // Black
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#800000', // Maroon
  '#008000', // Dark Green
  '#000080', // Navy Blue
  '#808000', // Olive
  '#800080', // Purple
  '#008080', // Teal
  '#808080', // Grey
  '#C0C0C0', // Silver
  '#FFFFFF', // White
];

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

const ColorPicker = ({ editor }: { editor: Editor | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close the color picker when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!editor) return null;

  return (
    <div className='color-picker-container' ref={pickerRef}>
      <ToolbarButton onClick={() => setIsOpen(!isOpen)} icon={<FaPalette />} label='Kolor tekstu' />
      {isOpen && (
        <div className='color-picker'>
          {COLORS.map((color) => (
            <button
              key={color}
              className='color-swatch'
              style={{ backgroundColor: color }}
              onClick={() => {
                editor.chain().focus().setColor(color).run();
                setIsOpen(false);
              }}
              title={color}
              type='button'
            />
          ))}
        </div>
      )}
    </div>
  );
};

const MenuBar = ({
  editor,
  togglePreview,
  isPreviewMode,
}: {
  editor: Editor | null;
  togglePreview: () => void;
  isPreviewMode: boolean;
}) => {
  if (!editor) return null;

  return (
    <div className='editor-toolbar'>
      <div className='toolbar-group'>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          icon={<FaHeading />}
          label='Nagłówek 1'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          icon={<FaHeading style={{ fontSize: '0.9em' }} />}
          label='Nagłówek 2'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          icon={<FaHeading style={{ fontSize: '0.8em' }} />}
          label='Nagłówek 3'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          active={editor.isActive('paragraph')}
          icon={<FaParagraph />}
          label='Akapit'
        />
      </div>

      <div className='toolbar-group'>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          icon={<FaBold />}
          label='Pogrubienie'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          icon={<FaItalic />}
          label='Kursywa'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          icon={<FaStrikethrough />}
          label='Przekreślenie'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive('highlight')}
          icon={<FaHighlighter />}
          label='Podświetlenie'
        />
        <ColorPicker editor={editor} />
      </div>

      <div className='toolbar-group'>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          icon={<FaListUl />}
          label='Lista punktowana'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          icon={<FaListOl />}
          label='Lista numerowana'
        />
      </div>

      <div className='toolbar-group'>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
          icon={<FaAlignLeft />}
          label='Wyrównaj do lewej'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
          icon={<FaAlignCenter />}
          label='Wyśrodkuj'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
          icon={<FaAlignRight />}
          label='Wyrównaj do prawej'
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          active={editor.isActive({ textAlign: 'justify' })}
          icon={<FaAlignJustify />}
          label='Wyjustuj'
        />
      </div>

      <div className='toolbar-group'>
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={<FaUndo />} label='Cofnij' />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={<FaRedo />} label='Ponów' />
      </div>

      <div className='toolbar-group'>
        <ToolbarButton
          onClick={() => {
            const url = prompt('Wprowadź adres URL');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          active={editor.isActive('link')}
          icon={<FaLink />}
          label='Wstaw link'
        />
        <ToolbarButton onClick={() => editor.chain().focus().unsetLink().run()} icon={<FaUnlink />} label='Usuń link' />
      </div>

      <div className='toolbar-group preview-toggle'>
        <ToolbarButton
          onClick={togglePreview}
          icon={isPreviewMode ? <FaEyeSlash /> : <FaEye />}
          label={isPreviewMode ? 'Ukryj podgląd' : 'Pokaż podgląd'}
          active={isPreviewMode}
        />
      </div>
    </div>
  );
};

const Preview = ({ content }: { content: string }) => {
  return (
    <div className='article-preview'>
      <div className='article-header'>
        <h3>Podgląd</h3>
      </div>
      <div className='article-content' dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export const EnhancedBlogEditor = ({ onSave, content }: BlogEditorProps) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editorContent, setEditorContent] = useState(content || '');

  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
        bulletList: false, // Disable default bulletList to use our configured one
        orderedList: false, // Disable default orderedList to use our configured one
      }),
      Bold,
      Italic,
      History,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'ordered-list',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'list-item',
        },
      }),
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
      const html = editor.getHTML();
      setEditorContent(html);
      onSave(html);
    },
  });

  // Initialize with content if provided
  useEffect(() => {
    if (content && editor && !editor.isEmpty) {
      setEditorContent(content);
    }
  }, [content, editor]);

  return (
    <div className='blog-editor-container'>
      <div className='blog-editor'>
        <MenuBar editor={editor} togglePreview={togglePreview} isPreviewMode={isPreviewMode} />
        <div className={`editor-wrapper ${isPreviewMode ? 'with-preview' : ''}`}>
          <div className={`editor-area ${isPreviewMode ? 'half-width' : 'full-width'}`}>
            <EditorContent editor={editor} />
          </div>
          {isPreviewMode && <Preview content={editorContent} />}
        </div>
      </div>
    </div>
  );
};
