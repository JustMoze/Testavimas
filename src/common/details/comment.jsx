import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import UserIcon from '../../assets/person.png';

const CommentContainer = styled.div`
	display: flex;
	align-items: flex-start;
	margin: 10px 0px;
`;
const Icon = styled.div`
	width: 50px;
	height: 50px;
	padding-top: 1.2%;
	padding-top: 20px;
	img {
		width: 50px;
		height: 50px;
		display: inline-block;
	}
`;
const CommentBlock = styled.div`
	position: relative;
	width: 95%;
	margin-left: 1%;
`;
const Username = styled.div`
	display: inline-block;
	color: #ffffff;
	font-style: italic;
	font-size: 0.87rem;
`;
const CommentField = styled.div`
	position: relative;
	min-height: 50px;
	height: auto;
	background-color: #595959;
	padding: 5px;
	padding: 5px 15px;
	color: #ffffff;
	border-radius: 15px;
	div {
		position: absolute;
		width: 0;
		height: 0;
		border-top: 15px solid transparent;
		border-right: 30px solid #595959;
		border-bottom: 15px solid transparent;
		left: -20px;
		z-index: 0;
		top: 6px;
	}
`;
const RemoveContainer = styled.div`
	position: absolute;
	top: 25px;
	right: 5px;
	cursor: pointer;
	color: #e50914;
	svg {
		width: 20px !important;
		height: 20px !important;
	}
`;
function Comment({ keyValue, snap, removeIcon, handleClick }) {
	return (
		<CommentContainer>
			<Icon>
				<img src={UserIcon} alt="Commentator" />
			</Icon>
			<CommentBlock>
				<Username>{snap.username}</Username>
				<CommentField>
					<div />
					{snap.comment}
				</CommentField>
				{removeIcon && (
					<RemoveContainer onClick={() => handleClick(keyValue)}>
						<CloseIcon color="error" />
					</RemoveContainer>
				)}
			</CommentBlock>
		</CommentContainer>
	);
}
export default Comment;
