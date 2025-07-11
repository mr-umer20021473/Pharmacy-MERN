import Products from "../models/Products.js";
import Sales from "../models/Sales.js";

import mongoose from 'mongoose';

export const getStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const totalProducts = await Products.countDocuments({ user: userId });
    const totalSales = await Sales.countDocuments({ user: userId });

    const totalRevenueAgg = await Sales.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const totalRevenue = totalRevenueAgg.length > 0 ? totalRevenueAgg[0].total : 0;

    res.json({
      totalProducts,
      totalSales,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

