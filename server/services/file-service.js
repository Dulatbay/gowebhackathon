const uuid = require('uuid')
const ApiError = require("../exceptions/api-error");
const path = require("path");

class FileService {
    async saveFiles(files) {
        try {
            if(!files) return [];
            const res = [];
            for (const e of files) {
                res.push((await this.saveFile(e)));
            }
            return res;
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    async saveFile(file) {
        try {
            if(!file) return '';
            const mime = file.mimetype.split('/')
            if (mime[0] !== 'image') throw ApiError.BadRequest('Its not image!')
            const fileFormat = mime[1];

            const fileName = uuid.v4() + `.${fileFormat}`;
            const filePath = path.resolve('static', fileName)
            file.mv(filePath)
            return fileName
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getImages(images){
        let resultUris = []
        if(Array.isArray(images)) resultUris = await this.saveFiles(images)
        else if(images) resultUris.push(await this.saveFile(images))

        return resultUris;
    }
}

module.exports = new FileService()