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
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState); // Основной стейт.
	const handleApply = (e: FormEvent) => {
		e.preventDefault();
		updateState(formState);
	};
	const handleReset = () => {
		updateState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const handleFormState = (selected: OptionType, property: string) => {
	// 	setFormState({ ...formState, [property]: selected });
	// };

	const handleFont = (selected: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: selected });
	};
	const handleColor = (selected: OptionType) => {
		setFormState({ ...formState, fontColor: selected });
	};
	const handleBackgroundColors = (selected: OptionType) => {
		setFormState({ ...formState, backgroundColor: selected });
	};
	const handleWidthAr = (selected: OptionType) => {
		setFormState({ ...formState, contentWidth: selected });
	};
	const handleFontSize = (selected: OptionType) => {
		setFormState({ ...formState, fontSizeOption: selected });
	};

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: asideRef,
		onClose: () => setIsFormOpen(false),
		onChange: setIsFormOpen,
	});
	// рендер боковой панели
	return (
		<>
			<ArrowButton
				open={isFormOpen}
				onClick={() => setIsFormOpen(!isFormOpen)}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleApply}>
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
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
