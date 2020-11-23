import React, { useState, useEffect, Fragment, useContext } from 'react';
import styled from 'styled-components';
import Comment from './comment';
import Title from './containerTitle';
import CommentInput from './commentInput';
import UserContext from '../../userContext';
import { app } from '../../utils/firebaseInit';
import { saveData, deleteReview } from '../../services/commentService';
import { toast, ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';

const Container = styled.div`
	padding: 10px 15px;
	margin: 5px 0px 20px;
	height: 100%;
	background-color: #0e0e0e;
	width: 95%;
	height: 350px;
	margin-left: 2.5%;
	margin-bottom: 3%;
	border-radius: 15px;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;
const LoaderContainer = styled.div`
	svg {
		margin-left: 47%;
		margin-top: 10%;
		width: 50px !important;
		height: 50px !important;
	}
`;
function CommentField(props) {
	const { movieId } = props;
	const appUser = useContext(UserContext);
	const [ comments, setComments ] = useState([]);
	const [ comment, setComment ] = useState('');
	const [ commentsLoading, setCommentsLoading ] = useState(true);
	const ref = app.database().ref().child('reviews');
	useEffect(() => {
		ref.on('value', (snap) => {
			let allComments = [];
			snap.forEach((element) => {
				allComments.push({
					key: element.key,
					username: element.val().username,
					comment: element.val().comment,
					movieID: element.val().movieID,
					userID: element.val().userID
				});
			});
			setComments(allComments.filter((comment) => comment.movieID === movieId));
			setCommentsLoading(false);
		});
		ref.on('child_added', (snap) => {
			let allComments = [ ...comments ];
			allComments.push({
				key: snap.key,
				username: snap.val().username,
				comment: snap.val().comment,
				movieID: snap.val().movieID,
				userID: snap.val().userID
			});
			setComments(allComments.filter((comment) => comment.movieID === movieId));
		});
		ref.on('child_removed', (snap) => {
			let allComments = [ ...comments ];
			allComments = allComments.filter((com) => com.key !== snap.key);
			setComments(allComments);
		});
	}, []);
	function handleCommentDelete(id) {
		try {
			deleteReview(id);
			toast.dark('Comment was successfully deleted');
		} catch (ex) {
			toast.error(ex);
		}
	}
	function handleCommentSubmit() {
		try {
			let review = {
				comment: comment,
				username: appUser.username,
				movieID: movieId
			};
			saveData(review, appUser.id);
			setComment('');
		} catch (ex) {
			toast.error(ex);
		}
	}
	function handleCommentChange(e) {
		setComment(e.target.value);
	}
	return (
		<Fragment>
			<ToastContainer />
			<Title title="Comments:" paddingLeft="2.5" color="#ffffff" />
			<Container>
				<CommentInput
					handleSubmit={handleCommentSubmit}
					handleOnChange={handleCommentChange}
					comment={comment}
				/>
				{commentsLoading ? (
					<LoaderContainer>
						<Loader type="TailSpin" color="#e50914" height={100} width={100} />
					</LoaderContainer>
				) : (
					<Fragment>
						{comments.map((comment, index) => (
							<Fragment key={index}>
								<Comment
									handleClick={handleCommentDelete}
									snap={comment}
									keyValue={comment.key}
									removeIcon={comment.userID === appUser.id ? true : false}
								/>
							</Fragment>
						))}
					</Fragment>
				)}
			</Container>
		</Fragment>
	);
}
export default CommentField;
