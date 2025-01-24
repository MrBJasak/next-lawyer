type ParagraphContent = {
  type: 'paragraph';
  text: string;
};

type OrderedListItem =
  | string
  | {
      text: string;
      subItems?: string[];
    };

type OrderedContent = {
  type: 'ordered';
  items: OrderedListItem[];
};

type ComplexContent = {
  type: 'complex';
  intro: string;
  items: string[];
  summary: string;
};

export type SectionContent = ParagraphContent | OrderedContent | ComplexContent;

export type Section = {
  title: string;
  content: SectionContent;
};

export type PrivacyPolicyData = {
  title: string;
  sections: Section[];
};
