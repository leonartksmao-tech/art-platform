// 给 maoart.online 添加 GitHub Pages DNS 解析记录
const crypto = require("crypto");
const https = require("https");

const ACCESS_KEY_ID = process.env.ALI_KEY_ID;
const ACCESS_KEY_SECRET = process.env.ALI_KEY_SECRET;

const DOMAIN = "maoart.online";
const GITHUB_PAGES_IPS = [
  "185.199.108.153",
  "185.199.109.153",
  "185.199.110.153",
  "185.199.111.153",
];

function sign(method, params) {
  const sorted = Object.keys(params).sort();
  const qs = sorted
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
  const toSign = `${method}&${encodeURIComponent("/")}&${encodeURIComponent(qs)}`;
  return crypto
    .createHmac("sha1", ACCESS_KEY_SECRET + "&")
    .update(toSign)
    .digest("base64");
}

function request(action, extraParams) {
  const params = {
    Action: action,
    Format: "JSON",
    Version: "2015-01-09",
    AccessKeyId: ACCESS_KEY_ID,
    SignatureMethod: "HMAC-SHA1",
    SignatureVersion: "1.0",
    SignatureNonce: Math.random().toString(36).substring(2, 17),
    Timestamp: new Date().toISOString(),
    ...extraParams,
  };

  params.Signature = sign("GET", params);

  const qs = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");

  return new Promise((resolve, reject) => {
    https
      .get(`https://alidns.aliyuncs.com/?${qs}`, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(JSON.parse(data)));
      })
      .on("error", reject);
  });
}

async function main() {
  // 1. 获取现有解析记录，看看有没有冲突
  console.log("> 查询 maoart.online 现有解析记录...");
  let existing = await request("DescribeDomainRecords", {
    DomainName: DOMAIN,
  });
  if (existing.Records) {
    console.log(`  找到 ${existing.TotalCount} 条现有记录`);
  } else {
    console.log("  ", JSON.stringify(existing));
  }

  // 2. 添加 4 条 A 记录
  for (const ip of GITHUB_PAGES_IPS) {
    console.log(`> 添加 A 记录 @ → ${ip} ...`);
    const result = await request("AddDomainRecord", {
      DomainName: DOMAIN,
      RR: "@",
      Type: "A",
      Value: ip,
      TTL: "600",
    });
    if (result.Code) {
      console.log(`  错误: ${result.Message}`);
    } else {
      console.log(`  成功! RecordId: ${result.RecordId}`);
    }
  }

  // 3. 验证最终结果
  console.log("\n> 最终解析记录:");
  let final = await request("DescribeDomainRecords", { DomainName: DOMAIN });
  if (final.DomainRecords) {
    final.DomainRecords.Record.forEach((r) => {
      console.log(`  ${r.RR}.${r.DomainName}  ${r.Type}  ${r.Value}`);
    });
  }
}

main().catch((e) => console.error(e));
