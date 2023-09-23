import React, { ReactNode } from "react";

type ButtonProps = {
    small?: boolean;
    children: ReactNode;
    className?: string;
    color?: "primary" | "secondary" | "basic";
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const Button = ({
    small = false,
    children: children,
    className = "",
    color = "primary",
    ...props
}: ButtonProps) => {
    const sizeClasses = small ? "px-2 py-1" : "px-4 py-2";
    const colorClasses =
        color == "primary"
            ? "rounded-sm bg-primary-500 hover:bg-primary-600"
            : color == "secondary"
            ? "rounded-sm bg-secondary-600 hover:bg-secondary-700"
            : "rounded-sm bg-basic-700 hover:bg-basic-800 text-basic-50";
    return (
        <button
            {...props}
            className={`${colorClasses} ${sizeClasses} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
