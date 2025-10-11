// server.ts

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

// 设置上传文件的保存目录
const UPLOAD_DIR = "./uploads";

// 确保上传目录存在
await Deno.mkdir(UPLOAD_DIR, { recursive: true });

// 定义一个非常简单的HTML页面，包含一个文件上传表单
const htmlForm = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文件上传</title>
    <style>
        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f0f2f5; }
        form { padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; }
        input[type="file"] { margin-bottom: 1rem; border: 1px solid #ccc; padding: 8px; }
        button { padding: 10px 20px; font-size: 1rem; color: white; background-color: #007bff; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background-color: #0056b3; }
    </style>
</head>
<body>
    <form action="/upload" method="post" enctype="multipart/form-data">
        <h2>文件上传</h2>
        <input type="file" name="file" required>
        <br>
        <button type="submit">上传文件</button>
    </form>
</body>
</html>
`;

// 启动HTTP服务器
async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const path = url.pathname;

    // 如果访问根路径，返回上传表单页面
    if (path === "/") {
        return new Response(htmlForm, {
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    }

    // 如果是POST请求到 /upload 路径，则处理文件上传
    if (path === "/upload" && req.method === "POST") {
        try {
            // 解析表单数据
            const formData = await req.formData();
            const file = formData.get("file") as File;

            // 如果没有获取到文件，返回错误
            if (!file) {
                return new Response("错误：请选择一个文件。", { status: 400 });
            }

            // 获取文件名和内容
            const fileName = file.name;
            const fileContent = await file.arrayBuffer();

            // 将文件保存到本地
            const filePath = `${UPLOAD_DIR}/${fileName}`;
            await Deno.writeFile(filePath, new Uint8Array(fileContent));

            // 返回成功信息
            return new Response(`文件 "${fileName}" 上传成功！`, {
                status: 200,
                headers: { "Content-Type": "text/plain; charset=utf-8" },
            });

        } catch (error) {
            // 捕获并返回任何错误
            console.error(error);
            return new Response("上传失败，服务器发生错误。", { status: 500 });
        }
    }

    // 其他路径返回404
    return new Response("Not Found", { status: 404 });
}

// 监听所有网络接口的8000端口
console.log("服务器已启动...");
console.log(`请在手机或电脑浏览器中访问: http://你的电脑IP:8000`);
console.log("按 Ctrl+C 停止服务器。");

await serve(handler, { hostname: "0.0.0.0", port: 8000 });
