import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EmptySection = styled.section`
	div {
		text-align: center;
		height: 50vh;
		line-height: 50vh;
		font-size: 1.75rem;
		color: #595959;
	}
`;
const Close = styled.div`
	text-align: end !important;
	height: auto !important;
	line-height: normal !important;
	padding: 20px 5px;
	color: #e50914 !important;
	cursor: pointer;
`;

const Empty = ({ message, handleClick }) => (
	<EmptySection>
		<Close onClick={handleClick}>
			<i className="fas fa-times" />
		</Close>
		<div>{message}</div>
	</EmptySection>
);

Empty.propTypes = {
	message: PropTypes.string
};

export default Empty;
