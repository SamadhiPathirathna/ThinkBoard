import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Check if the request exceeds the rate limit
    // The key "my-rate-limit" can be customized based on user or endpoint so that specific user is blocked and other users 
    // can still access the endpoint
    // For example, you can use req.ip or req.user.id to create a unique key
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;