import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET,{  // we created the token now we send it to cookies;
        expiresIn:"7d"
    });

    res.cookie("jwt",token,{                                   // token sended to cookie and also the option added to secure it;
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
        httpOnly: true,                  // prevent xss attacks (cross-site scripting attacks);
        sameSite: "strict",              // prevent csrf attacks;
        secure: process.env.NODE_ENV !== "development",
    });

    return token;


}