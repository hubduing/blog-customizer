import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
export type PropsArrowButton = {
	open: boolean;
	onClick: () => void;
};
export const ArrowButton: React.FC<PropsArrowButton> = ({ open, onClick }) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, open && styles.container_open)}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, open && styles.arrow_open)}
			/>
		</div>
	);
};
