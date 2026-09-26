import Transaction from "../models/Transaction.js";

// CREATE TRANSACTION
export const createTransaction = async (req, res, next) => {
    
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

// GET MY TRANSACTIONS
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    });

    res.json({ transactions });
  } catch (error) {
    next(error);
  }
};

// GET ONE TRANSACTION
export const getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json({
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE TRANSACTION
export const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      { new: true },
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json({
      message: "Transaction updated successfully",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE TRANSACTION
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


// MONTHLY SUMMARY
export const getMonthlySummary = async (req, res, next) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({
        message: "Please provide month in YYYY-MM format",
      });
    }

    const [year, monthNumber] = month.split("-").map(Number);

    if (
      !year ||
      !monthNumber ||
      monthNumber < 1 ||
      monthNumber > 12
    ) {
      return res.status(400).json({
        message: "Invalid month format. Use YYYY-MM",
      });
    }

    const startDate = new Date(year, monthNumber - 1, 1);

    const endDate = new Date(year, monthNumber, 1);

    const summary = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },

      {
        $group: {
          _id: "$type",
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpenses = 0;

    summary.forEach((item) => {
      if (item._id === "income") {
        totalIncome = item.total;
      }

      if (item._id === "expense") {
        totalExpenses = item.total;
      }
    });

    const categorySummary = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          type: "expense",
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },

      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount",
          },
        },
      },

      {
        $sort: {
          total: -1,
        },
      },
    ]);

    res.json({
      month,

      totalIncome,

      totalExpenses,

      balance: totalIncome - totalExpenses,

      categories: categorySummary,
    });
  } catch (error) {
    next(error);
  }
};