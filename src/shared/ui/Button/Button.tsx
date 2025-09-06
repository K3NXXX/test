import type { FC, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss'

type ButtonVariant = 'primary' | 'secondary' | 'danger'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	size?: ButtonSize
	disabled?: boolean
}

export const Button: FC<ButtonProps> = ({
	children,
	variant = 'primary',
	size = 'medium',
	disabled = false,
	...props
}) => {
	const classNames = [
		styles.button,
		styles[variant],
		styles[size],
		disabled ? styles.disabled : '',
	].join(' ')

	return (
		<button className={classNames} disabled={disabled} {...props}>
			{children}
		</button>
	)
}
