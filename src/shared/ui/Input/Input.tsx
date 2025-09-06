import type { FC, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

type InputVariant = 'primary' | 'secondary'
type InputSize = 'small' | 'medium' | 'large'

interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	variant?: InputVariant
	inputSize?: InputSize
	label?: string
}

export const Input: FC<InputProps> = ({
	variant = 'primary',
	inputSize = 'medium',
	label,
	...props
}) => {
	return (
		<div className={styles.wrapper}>
			{label && <label className={styles.label}>{label}</label>}
			<input
				className={[styles.input, styles[variant], styles[inputSize]].join(' ')}
				{...props}
			/>
		</div>
	)
}
