import { serveFile } from "jsr:@std/http/file-server"

await mkdir("files")

Deno.serve(async (req: Request) => {
	const pathname = new URL(req.url).pathname

	if (pathname === "/") {
		return serveFile(req, "client/index.html")
	}

	if (pathname === "/api/upload/files" && req.method === "POST") {
		const formData = await req.formData()
		const files = formData.getAll("files")
		const res: string[] = []
		for (const file of files) {
			const successText = await saveFile(file)
			res.push(successText)
		}

		return new Response(JSON.stringify(res), {
			headers: {
				"Content-Type": "application/json",
			},
		})
	}

	return new Response("404: Not Found", {
		status: 404,
	})
})

async function saveFile(file: FormDataEntryValue | null): Promise<string> {
	if (!file || typeof file === "string") {
		throw new Error("上传文件格式错误，期待一个 File 对象")
	}
	const originalName = file.name
	// TODO: 处理文件名重复
	const newFileName = originalName
	const buffer = await file.arrayBuffer()
	const bytes = new Uint8Array(buffer)
	try {
		Deno.writeFileSync(`files/${newFileName}`, bytes)
	} catch (error) {
		console.log(error)
	}
	return newFileName
}

async function mkdir(url: string) {
	try {
		await Deno.mkdir(url)
	} catch (err) {
		if (!(err instanceof Deno.errors.AlreadyExists)) {
			throw err
		}
	}
}
