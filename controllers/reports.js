const router = require('express').Router();
const Reports = require('../models/Reports');

router.get('/', async (req, res) => {
	try {
		const reports = await Reports.find();
		const message = 'The reports were found in the database.';
		res.status(200).json({ message, reports });
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while retrieving the list of reports'
		});

		throw new Error(error);
	}
});

router.get('/user/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const reports = await Reports.findByUserId(id);
		if (reports.length === 0) {
			const message =
				'No reports by that user were found in the database';
			res.status(404).json({ message });
		} else {
			const message =
				'The reports were found in the database.';
			res.status(200).json({ message, reports });
		}
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while retrieving the list of reports'
		});

		//sentry call
		throw new Error(error);
	}
});

router.delete('/:reportId', async (req, res) => {
	const { reportId } = req.params;
	console.log(reportId);
	try {
		const reports = await Reports.remove(reportId);
		if (!reports) {
			const message = "This report doesn't exist.";
			res.status(404).json({ message });
		} else {
			const message = 'The report was successfully deleted.';
			res.status(202).json({ message, id });
		}
	} catch (error) {
		res.status(500).json({
			message:
				'Sorry, something went wrong while deleting the report'
		});
	}
});

module.exports = router;
