const HistoryModel = require('../models/history-model');

class HistoryService {
    async createHistory(historyData) {
        return (await HistoryModel.create(historyData));
    }

    async getHistoryById(id) {
        const history = await HistoryModel.findById(id)

        return history;
    }

    async getPopularHistories() {
        const histories = await HistoryModel.find()
            .sort({likes: -1})
        return histories;
    }

    async getAllHistories() {
        const histories = await HistoryModel.find()
        return histories;
    }

    async getMostViewedHistories() {
        const histories = await HistoryModel.find()
            .sort({views: -1})
        return histories;
    }

    async getNewestHistories() {
        const histories = await HistoryModel.find()
            .sort({createdAt: -1})
        return histories;
    }

    async getUserHistories(userId) {
        const histories = await HistoryModel.find({author: userId})
        return histories;
    }

    async updateHistory(historyId, historyData) {
        const history = await HistoryModel.findByIdAndUpdate(
            historyId,
            {$set: historyData},
            {new: true}
        );
        return history;
    }

    async deleteHistory(historyId) {
        const history = await HistoryModel.findByIdAndDelete(historyId);
        return history;
    }
}

module.exports = new HistoryService();
