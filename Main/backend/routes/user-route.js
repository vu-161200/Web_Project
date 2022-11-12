const express = require("express");
const router = express.Router();

const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authenticate");

const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getDetails,
  updatePassword,
  updateProfile,
  getUser,
  getAllUsers,
  updateRole,
  deleteUser,
} = require("../controllers/user-controller");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me").get(isAuthenticatedUser, getDetails);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/user/:id").get(isAuthenticatedUser, getUser);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
