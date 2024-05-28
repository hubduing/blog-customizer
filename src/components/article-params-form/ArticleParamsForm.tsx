// https://github.com/hubduing/blog-customizer/pull/1

// куча импортов
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState, useCallback, FormEvent } from 'react';
// import { useRef, useState, useEffect, useCallback, FormEvent } from 'react';
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
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
// тип пропсов
type ArticleParamsFormType = {
	tempState: ArticleStateType;
	apply: (e: FormEvent) => void;
	reset: () => void;
	handleFont: (selected: OptionType) => void;
	handleColor: (selected: OptionType) => void;
	handleBackgroundColors: (selected: OptionType) => void;
	handleWidthAr: (selected: OptionType) => void;
	handleFontSize: (selected: OptionType) => void;
};
// функциональный компонент
export const ArticleParamsForm: React.FC<ArticleParamsFormType> = ({
	tempState,
	apply,
	reset,
	handleFont,
	handleColor,
	handleBackgroundColors,
	handleWidthAr,
	handleFontSize,
}) => {
	// хуки
	const asideRef = useRef<HTMLDivElement | null>(null);
	const [open, setOpen] = useState(false);

	// открытие закрытие боковой панели
	const arrowButtonHandler = useCallback(() => {
		setOpen(!open);
	}, [open]);

	useOutsideClickClose({
		isOpen: open,
		rootRef: asideRef,
		onClose: arrowButtonHandler,
		onChange: setOpen,
	});
	// рендер боковой панели
	return (
		<>
			<ArrowButton callBack={arrowButtonHandler} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, open && styles.container_open)}>
				<form className={styles.form} onSubmit={apply}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={tempState.fontFamilyOption}
						title='Шрифт'
						onChange={handleFont}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={tempState.fontSizeOption}
						onChange={handleFontSize}
					/>
					<Select
						options={fontColors}
						selected={tempState.fontColor}
						title='Цвет шрифта'
						onChange={handleColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={tempState.backgroundColor}
						title='Цвет фона'
						onChange={handleBackgroundColors}
					/>
					<Select
						options={contentWidthArr}
						selected={tempState.contentWidth}
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
