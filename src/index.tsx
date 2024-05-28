import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, FormEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import './styles/index.scss';
import styles from './styles/index.module.scss';
import { OptionType, defaultArticleState } from './constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formState, setFormState] = useState(defaultArticleState); // Основной стейт.
	const [tempState, setTempState] = useState(formState); // Временный стейт, что бы опции сразу не применялись.

	const apply = (e: FormEvent) => {
		e.preventDefault();
		setFormState(tempState);
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

	const generalProps = {
		tempState,
		apply,
		reset,
		handleFont,
		handleColor,
		handleBackgroundColors,
		handleWidthAr,
		handleFontSize,
	};
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': formState.fontFamilyOption.value,
					'--font-size': formState.fontSizeOption.value,
					'--font-color': formState.fontColor.value,
					'--container-width': formState.contentWidth.value,
					'--bg-color': formState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm {...generalProps} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
