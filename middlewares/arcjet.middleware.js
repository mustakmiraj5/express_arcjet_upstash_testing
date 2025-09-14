import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try{
        const decision = await aj.protect(req, {requested: 1});

//         for (const { reason } of decision.results) {
//     if (reason.isError()) {
//       // Fail open by logging the error and continuing
//       console.warn("Arcjet error", reason.message);
//       // You could also fail closed here for very sensitive routes
//       //res.writeHead(503, { "Content-Type": "application/json" });
//       //res.end(JSON.stringify({ error: "Service unavailable" }));
//       //return;
//     }
//   }

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({
                    success: false,
                    message: "Too many requests, please try again later."
                });
            }
            if(decision.reason.isBot()){
                return res.status(403).json({
                    success: false,
                    message: "Access denied for bots."
                });
            }

            return res.status(403).json({
                success: false,
                message: "Access denied."
            });
        }
        next();
    }catch(err){
        console.log(`Arcjet error: ${err.message}`);
        next(err);
    }
}

export default arcjetMiddleware;