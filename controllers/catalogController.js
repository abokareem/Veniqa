import catalogService from "../services/catalogService";

export default {
    async searchCatalog(req, res, next) {
        let response;
        try {
            response = await catalogService.searchCatalog(req.body.searchFilters, req.body.pagingOptions);
            if (response.code) {
                return res.status(400).send({mongoErrorCode: response.code, mongoErrorMsg: response.errmsg});
            }
            return res.status(200).send(response);
        }
        catch(err) {
            console.log("[ERROR]: Catalog search failed => ", err);
            return res.status(500).send({ errorCode: "server error", errorMsg: err});
        }
    },

    async getProductDetails(req, res, next) {
        let response;
        try {
            response = await catalogService.getProductDetails(req.query.productId);
            if (response.errorDetails) {
                return res.status(400).send(response);
            }
            return res.status(200).send(response);
        }
        catch(err) {
            console.log("[ERROR]: Get products failed => ", err);
            return res.status(500).send({ status: "failed", errorDetails: err});
        }
    },

    async updateProduct(req, res, next) {
        let response;
        try {
            response = await catalogService.updateProduct(req.body);
            if (response.code) {
                return res.status(400).send({mongoErrorCode: response.code, mongoErrorMsg: response.errmsg});
            }
            return res.status(200).send(response);
        }
        catch(err) {
            console.log("[ERROR]: Product update failed => ", err);
            return res.status(500).send({ errorCode: "server error", errorMsg: err});
        }
    },

    async getPresignedUrlsForCatalogImageUploads(req, res, next) {
        let response;
        try {
            response = await catalogService.getPresignedUrlsForCatalogImageUploads(req.query.numberOfThumbnails, req.query.numberOfFeaturedImages, req.query.numberOfDetailedImages);
            if (response.code) {
                return res.status(400).send({mongoErrorCode: response.code, mongoErrorMsg: response.errmsg});
            }
            return res.status(200).send(response);
        }
        catch(err) {
            console.log("[ERROR]: Getting presigned urls failed => ", err);
            return res.status(500).send({ errorCode: "server error", errorMsg: err});
        }       
    }
}