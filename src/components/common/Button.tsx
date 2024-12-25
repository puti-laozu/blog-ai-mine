import { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({
  children,
  isLoading,
  variant = 'primary',
  ...props
}) => {
  return (
    <button
      className={`btn ${variant} ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
      {...props}
    >
      {children}
    </button>
  );
}; 