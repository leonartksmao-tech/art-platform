// 生成视频代理 Worker 的周令牌
// 用法: SIGN_SECRET=xxx node scripts/generate-token.js
// 有效期为 3 周（当前周 ± 1 周）

const crypto = require("crypto");

const secret = process.env.SIGN_SECRET;
if (!secret) {
  console.error("SIGN_SECRET not set");
  process.exit(1);
}

const weekMs = 7 * 24 * 60 * 60 * 1000;
const week = Math.floor(Date.now() / weekMs);
const token = crypto
  .createHmac("sha256", secret)
  .update(String(week))
  .digest("base64url");

console.log(token);
