"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attemptsRouter = void 0;
const express_1 = require("express");
const parseIdParam_1 = require("../lib/parseIdParam");
const prisma_1 = require("../lib/prisma");
exports.attemptsRouter = (0, express_1.Router)();
exports.attemptsRouter.get('/:id', async (req, res) => {
    const id = (0, parseIdParam_1.parseIdParam)(req.params.id);
    if (id === null) {
        return res.status(400).json({ error: 'Invalid attempt id' });
    }
    const attempt = await prisma_1.prisma.attempt.findUnique({
        where: { id },
        include: {
            quiz: {
                select: { title: true },
            },
        },
    });
    if (!attempt) {
        return res.status(404).json({ error: 'Attempt not found' });
    }
    res.json(attempt);
});
