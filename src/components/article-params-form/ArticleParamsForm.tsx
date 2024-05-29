// https://github.com/hubduing/blog-customizer/pull/1

// куча импортов
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState, FormEvent } from 'react';
import { Select } from '../select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from '../text';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

// Тип колбэка
type ArticleParamsFormType = {
	updateState: (tempState: ArticleStateType) => void;
};
// функциональный компонент
export const ArticleParamsForm: React.FC<ArticleParamsFormType> = ({
	updateState,
}) => {
	// хуки
	const asideRef = useRef<HTMLDivElement | null>(null);
	const [open, setOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState); // Основной стейт.
	const [tempState, setTempState] = useState(formState); // Временный стейт, что бы опции сразу не применялись.
	const apply = (e: FormEvent) => {
		e.preventDefault();
		setFormState(tempState);
		updateState(tempState);
	};
	const reset = () => {
		setFormState(defaultArticleState);
		setTempState(defaultArticleState);
	};
	const handleFont = (selected: OptionType) => {
		setTempState({ ...tempState, fontFamilyOption: selected });
	};
	const handleColor = (selected: OptionType) => {
		setTempState({ ...tempState, fontColor: selected });
	};
	const handleBackgroundColors = (selected: OptionType) => {
		setTempState({ ...tempState, backgroundColor: selected });
	};
	const handleWidthAr = (selected: OptionType) => {
		setTempState({ ...tempState, contentWidth: selected });
	};
	const handleFontSize = (selected: OptionType) => {
		setTempState({ ...tempState, fontSizeOption: selected });
	};

	const callBack = () => {
		setOpen(!open);
	};

	useOutsideClickClose({
		isOpen: open,
		rootRef: asideRef,
		onClose: callBack,
		onChange: setOpen,
	});
	// рендер боковой панели
	return (
		<>
			<ArrowButton open={open} callBack={callBack} />
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
