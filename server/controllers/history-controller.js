const historyService = require('../services/history-service');
const fileService = require('../services/file-service');
const ApiError = require("../exceptions/api-error");

class HistoryController {
    async createHistory(req, res, next) {
        try {
            if (!req.headers['content-type'].startsWith('multipart/form-data')) next(ApiError.BadRequest('Its not form-data'))
            const images = req.files?.images;

            const arrPathImages = await fileService.getImages(images);

            const historyData = {...req.body, author: req.user.id, images: arrPathImages};
            const history = await historyService.createHistory(historyData);


            return res.json(history);
        } catch (error) {
            next(error);
        }
    }

    async getHistoryById(req, res, next) {
        try {
            const {id} = req.params;
            const history = await historyService.getHistoryById(id);
            return res.json(history);
        } catch (error) {
            next(error);
        }
    }
    async getAllHistories(req, res, next) {
        try {
            const histories = await historyService.getAllHistories();
            return res.json(histories);
        } catch (error) {
            next(error);
        }
    }

    async getPopularHistories(req, res, next) {
        try {
            const histories = await historyService.getPopularHistories();
            return res.json(histories);
        } catch (error) {
            next(error);
        }
    }

    async getMostViewedHistories(req, res, next) {
        try {
            const histories = await historyService.getMostViewedHistories();
            return res.json(histories);
        } catch (error) {
            next(error);
        }
    }

    async getNewestHistories(req, res, next) {
        try {
            const histories = await historyService.getNewestHistories();
            return res.json(histories);
        } catch (error) {
            next(error);
        }
    }
    async getUserHistories(req, res, next) {
        try {
            const userId = req.params.userId;
            const histories = await historyService.getUserHistories({userId});
            return res.json(histories);
        } catch (error) {
            next(error);
        }
    }

    async updateHistory(req, res, next) {
        try {
            if (!req.headers['content-type'].startsWith('multipart/form-data')) next(ApiError.BadRequest('Its not form-data'))
            const historyId = req.params.id;
            const histories = await historyService.updateHistory({historyId});
            return res.json(histories);
        } catch (error) {
            next(error);
        }
    }

    async deleteHistory(req, res, next) {
        try {
            const historyId = req.params.id;
            const histories = await historyService.deleteHistory({historyId});
            return res.json(histories);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new HistoryController();