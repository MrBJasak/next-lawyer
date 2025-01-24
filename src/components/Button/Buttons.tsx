import styles from './Buttons.styles.module.scss';

export interface ButtonProps {
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  children?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = ({
  children,
  className,
  disabled,
  onClick,
  variant = 'primary',
  type = 'button',
}: ButtonProps) => {
  const buttonClasses = [styles.button, styles[variant], className].filter(Boolean).join(' ');
  return (
    <button disabled={disabled} className={buttonClasses} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
