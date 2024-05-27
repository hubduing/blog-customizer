import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState, useEffect, useCallback, FormEvent } from 'react';
import { Select } from '../select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from '../text';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';

type ArticleParamsFormType = {
	formState: ArticleStateType;
	apply: (e: FormEvent) => void;
	reset: () => void;
	handleFont: (selected: OptionType) => void;
	handleColor: (selected: OptionType) => void;
	handleBackgroundColors: (selected: OptionType) => void;
	handleWidthAr: (selected: OptionType) => void;
	handleFontSize: (selected: OptionType) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormType> = ({
	formState,
	apply,
	reset,
	handleFont,
	handleColor,
	handleBackgroundColors,
	handleWidthAr,
	handleFontSize,
}) => {
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
				<form className={styles.form} onSubmit={apply}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						title='Шрифт'
						onChange={handleFont}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSize}
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						title='Цвет шрифта'
						onChange={handleColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='Цвет фона'
						onChange={handleBackgroundColors}
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='Ширина контента'
						onChange={handleWidthAr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={reset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
