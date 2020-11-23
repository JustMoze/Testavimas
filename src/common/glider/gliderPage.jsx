import React, { Fragment } from 'react';
import Glider from './glider';
import GliderTitle from './gliderTitle';

export default function GliderPage(props) {
	let { categoryArr, onClick } = props;
	return (
		<Fragment>
			{categoryArr.map((category, index) => (
				<Fragment key={index}>
					<GliderTitle
						showReflixTitle={category.reflixTitle!== '' ? true : false}
						content={category.content}
						reflixTitle={category.reflixTitle}
					/>
					<Glider genre={category.name} onClick={onClick} />
				</Fragment>
			))}
		</Fragment>
	);
}
