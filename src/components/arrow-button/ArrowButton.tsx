import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { useEffect, useRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = {
	callBack: () => void;
};
export const ArrowButton: React.FC<OnClick> = ({ callBack }) => {
	const arrowButtonRef = useRef<HTMLDivElement | null>(null);
	const arrowImgRef = useRef<HTMLImageElement | null>(null);
	useEffect(() => {
		arrowButtonRef.current?.classList.toggle(styles.container_open);
		arrowImgRef.current?.classList.toggle(styles.arrow_open);
	}, [callBack]);
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			ref={arrowButtonRef}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={styles.container}
			onClick={callBack}>
			<img
				ref={arrowImgRef}
				src={arrow}
				alt='иконка стрелочки'
				className={styles.arrow}
			/>
		</div>
	);
};
