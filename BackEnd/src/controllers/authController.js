import authService from "../services/authService"
import JWTService from "../services/JWTService"

const authController = {
    signUp: async (req, res) => {
        try {
            let userData = await authService.handleSignUp(req.body)
            if (userData.status == 200) {
                res.cookie("refreshToken", userData.user.refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })
                res.status(userData.status).json(userData.user)
            }
            else {
                res.status(userData.status).json(userData.mess)
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    signIn: async (req, res) => {
        try {
            let userData = await authService.handleSignIn(req.body)
            if (userData.status == 200) {
                res.cookie("refreshToken", userData.user.refreshToken, {
                    httpOnly: true,
                    secure: true,
                    path: "/",
                    sameSite: "None",
                })
                res.status(userData.status).json(userData.user)
            }
            else {
                res.status(userData.status).json(userData.mess)
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    signOut: (req, res) => {
        res.clearCookie("refreshToken")
        res.status(200).json("Sign Out success")
    },
    refresh: (req, res) => {
        console.log("Hello")
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            let result = JWTService.refreshToken(refreshToken)
            console.log(result)
            if (result.status == 200) {
                res.status(result.status).json({ ...result.user, accessToken: result.accessToken, refreshToken: result.refreshToken })
            }
            else {
                res.status(result.status).json(result.mess)
            }
        }
        else {
            res.status(401).json("You are not authenticated!");
        }
    }
}

module.exports = authController