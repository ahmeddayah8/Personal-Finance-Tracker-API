import express from "express";

import {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  getMonthlySummary,
} from "../controllers/transactionControllers.js";

import { protect } from "../middlewares/auth.js";

import { validate } from "../middlewares/validate.js";

import { transactionSchema } from "../schema/transactionSchema.js";

const router = express.Router();

/**
 * @swagger
 * /transactions:
 *   post:
 *     tags:
 *       - Transactions
 *     summary: Create a transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - type
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: Groceries
 *               amount:
 *                 type: number
 *                 example: 50
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *                 example: expense
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-09-18
 *     responses:
 *       201:
 *         description: Transaction created
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, validate(transactionSchema), createTransaction);

/**
 * @swagger
 * /transactions:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get user's transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getTransactions);

/**
 * @swagger
 * /transactions/monthly-summary:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get monthly financial summary
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *         example: 2026-09
 *     responses:
 *       200:
 *         description: Monthly summary
 *       400:
 *         description: Invalid month
 *       401:
 *         description: Unauthorized
 */
router.get("/monthly-summary", protect, getMonthlySummary);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get one transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction found
 *       404:
 *         description: Transaction not found
 */
router.get("/:id", protect, getTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     tags:
 *       - Transactions
 *     summary: Update a transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum:
 *                   - income
 *                   - expense
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Transaction updated
 *       404:
 *         description: Transaction not found
 */
router.put("/:id", protect, validate(transactionSchema), updateTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     tags:
 *       - Transactions
 *     summary: Delete a transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 *       404:
 *         description: Transaction not found
 */
router.delete("/:id", protect, deleteTransaction);

export default router;
