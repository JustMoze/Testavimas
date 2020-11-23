import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Grid } from '@material-ui/core';
import './style.scss';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(1, 1, 1),
		width: '80%',
		height: '50%',
    },
    grid: {
		backgroundSize: 'cover',
        width: '100%',
        height: '100%',
        margin: 0,
        color: '#ffffff',
        fontSize: '1.25rem',
		overflow: 'scroll',
		overflowX: 'hidden',
		overflowY: 'hidden'	
    }
}));

export default function DetailsModal(props) {
	let { open, handleClose, image, description } = props;
	const classes = useStyles();
	return (
		<ClickAwayListener onClickAway={() => handleClose()}>
			<Modal
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<Grid container spacing={3} className={classes.grid} style={{backgroundImage: `linear-gradient(to bottom left, transparent 0%, black 100%),  linear-gradient(to top left, transparent 0%, black 100%), url('${image}')`}}>
							<Grid item xs={12} md={6}>
                            <div>{description}</div>
                            </Grid>
							<Grid item xs={false} md={6}>
								
							</Grid>
						</Grid>
					</div>
				</Fade>
			</Modal>
		</ClickAwayListener>
	);
}
