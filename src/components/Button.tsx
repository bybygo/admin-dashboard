import React from 'react';

interface ButtonProps {
  icon?: React.ReactElement;
  color: string;
  bgColor?: string;
  bgHoverColor?: string;
  size?: string;
  text?: string;
  borderRadius: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  color,
  bgColor,
  bgHoverColor,
  size = 'md',
  text,
  borderRadius,
  width = 'auto',
}) => {
  return (
    <button
      type="button"
      style={{
        backgroundColor: bgColor,
        color,
        borderRadius,
        width,
      }}
      className={`text-${size} p-3 hover:${bgHoverColor ? bgHoverColor : 'drop-shadow-xl'}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
