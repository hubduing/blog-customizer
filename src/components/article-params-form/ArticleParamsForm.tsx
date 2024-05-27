import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState, useEffect, useCallback } from 'react';

export const ArticleParamsForm: React.FC = () => {
	const asideRef = useRef<HTMLElement | null>(null);
	const [open, setOpen] = useState(false);

	const arrowButtonHandler = useCallback(() => {
		setOpen(!open);
	}, [open]);

	useEffect(() => {
		if (!open) {
			console.log('CLOSE', asideRef.current);
			asideRef.current?.classList.remove(styles.container_open);
		} else {
			console.log('OPEN', asideRef.current);
			asideRef.current?.classList.add(styles.container_open);
		}
	}, [open]);
	return (
		<>
			<ArrowButton callBack={arrowButtonHandler} />
			<aside ref={asideRef} className={styles.container}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
