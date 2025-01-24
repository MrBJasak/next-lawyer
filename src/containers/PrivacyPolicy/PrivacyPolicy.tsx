import { AnimatedTitle } from '../../components/AnimatedTitle/AnimatedTitle';
import { PrivacyPolicyData, SectionContent } from './privacyPolicy.types';
import './styles.scss';

type Props = {
  privacyPolicyData: PrivacyPolicyData;
};

export const PrivacyPolicy = ({ privacyPolicyData }: Props) => {
  const renderContent = (content: SectionContent) => {
    switch (content.type) {
      case 'paragraph':
        return <p>{content.text}</p>;

      case 'ordered':
        return (
          <ol>
            {content.items.map((item, index) => (
              <li key={index}>
                {typeof item === 'string' ? (
                  item
                ) : (
                  <>
                    {item.text}
                    {item.subItems && (
                      <ul>
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>{subItem}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ol>
        );

      case 'complex':
        return (
          <>
            <p>{content.intro}</p>
            <ul>
              {content.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p>{content.summary}</p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className='privacy'>
      <AnimatedTitle>{privacyPolicyData.title}</AnimatedTitle>

      {privacyPolicyData.sections.map((section, index) => (
        <section key={index} className='privacy__section'>
          <h2>{section.title}</h2>
          {renderContent(section.content)}
        </section>
      ))}
    </div>
  );
};
