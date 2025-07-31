import express from "express";
import { getAnalyticsData } from "../controllers/analytics.controller.js";
import { authorizeRoles, protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/admin", protectRoute,authorizeRoles('admin'), async (req, res) => {
	try {
		const analyticsData = await getAnalyticsData();

		res.json({analyticsData});
	} catch (error) {
		console.log("Error in analytics route", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
});

export default router;