const HistoryModel = require('../models/history-model');

class HistoryService {
    async createHistory(historyData) {
        return (await HistoryModel.create(historyData));
    }

    async getHistoryById(id) {
        const history = await HistoryModel.findById(id)
            .populate('author', '-password')
            .populate({
                path: 'comments',
                populate: {path: 'author', select: '-password'},
            })
            .populate('likes', '-password')
            .populate('brandLikes', '-password')
            .populate('saves', '-password')
            .populate('shares', '-password')
            .populate('views', '-password');
        return history;
    }

    async getPopularHistories() {
        const histories = await HistoryModel.find()
            .sort({likes: -1})
            .populate('author', '-password')
            .limit(10);
        return histories;
    }

    async getAllHistories() {
        const histories = await HistoryModel.find()
        return histories;
    }

    async getMostViewedHistories() {
        const histories = await HistoryModel.find()
            .sort({views: -1})
            .populate('author', '-password')
            .limit(10);
        return histories;
    }

    async getNewestHistories() {
        const histories = await HistoryModel.find()
            .sort({createdAt: -1})
            .populate('author', '-password')
            .limit(10);
        return histories;
    }

    async getUserHistories(userId) {
        const histories = await HistoryModel.find({author: userId})
            .populate('author', '-password')
            .populate({
                path: 'comments',
                populate: {path: 'author', select: '-password'},
            })
            .populate('likes', '-password')
            .populate('brandLikes', '-password')
            .populate('saves', '-password')
            .populate('shares', '-password')
            .populate('views', '-password');
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
