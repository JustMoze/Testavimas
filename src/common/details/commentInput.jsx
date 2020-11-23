import React from 'react';
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
const Input = styled.div`
	display: block;
	position: relative;
	textarea {
		width: 100%;
		height: 80px;
		position: relative;
		background-color: $ReflixLighterGrey;
		padding: 10px;
		resize: none;
		border-radius: 15px;
		background: linear-gradient(to bottom right, #ffffff, #0e0e0e);
	}
	textarea:focus {
		border: none;
		outline: none;
	}
`;
const Submit = styled.div`
	position: absolute;
	right: 7px;
	bottom: 15px;
	width: 5%;
	text-align: end;
	cursor: pointer;
	svg {
		color: #e50914;
	}

	@media (max-width: 700px) {
		right: 6%;
		bottom: 11%;
	}
`;

function CommentInput({ handleSubmit, comment, handleOnChange }) {
	return (
		<form>
			<Input>
				<textarea
					value={comment}
					onChange={handleOnChange}
					rows="3"
					type="text"
					placeholder="Leave your comment here: "
					required
				/>
				<Submit>
					<SendIcon onClick={() => handleSubmit()} />
				</Submit>
			</Input>
		</form>
	);
}

export default CommentInput;
