exports.generate = async (req, res, next) => {
    const prompt = req.body.data;

    try {
        const generation = "You wrote: \""+prompt+"\"";
        res.status(200).json(generation)
    }
    catch (err){
        if (!err.statusCode) {
            err.statusCode = 500;
            }
    next(err);
    }
}