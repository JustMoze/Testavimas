import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Category = styled.div`
    color: #ffffff;
	padding: 1% 2%;
	font-size: 1.25rem;
	display: flex;
	align-items: center;
`;
const ReflixTitle = styled.h1`
    color: #e50914;
    padding-bottom: 5px;
	font-size: 2.5rem;
	line-height: 2.5rem;
	padding-left: 10px;
`;
const GliderTitle = ({ showReflixTitle, content, reflixTitle }) => (
	<Category>
		{content} {showReflixTitle === true && <ReflixTitle>{reflixTitle}</ReflixTitle>}
	</Category>
);

GliderTitle.propTypes = {
    showReflixTitle: PropTypes.bool,
    content: PropTypes.string,
    reflixTitle: PropTypes.string
}

export default GliderTitle;
