/**
 * 根据 ImageData 对象中的 data 生成字模
 *
 * 点阵方式：阴码（1 表示亮）
 * 取模方式：逐列式。从第—列开始向下每取 8 个点作为一个字节，如果最后不足 8 个点就补满 8 位
 * 取模走向：逆向（地位在前）
 * 输出数制：16进制
 * 格式：C51
 *
 * imgData.data 的数据格式是一维数组，并且每 4 个元素表示一个像素点（RGBA）
 * 我们的处理步骤如下：
 * 1. 先将 imgData.data 转换为 w × h 的二维像素点数组，值仅为 1 或 0
 * 2. 将二维像素点数组转换为字节数组，通常是列上每 8 个像素点作为一个字节
 * 3. 生成的字节数组并不一定符合硬件要求，可能需要转置
 * 4. 将字节数组转换为 C 语言二维数组的字面量代码
 */

/**
 * 输出 c 语言二维数组代码
 * @param arr 案例：[['0xFF', '0x01'], ['0xFF', '0x01']]
 * @returns 案例： {'0xFF', '0x01'}, {'0xFF', '0x01'}
 */
function toC_ArrString(arr: string[][]) {
    // let str = 'static const unsigned char PICTURE01[128][8]'
    let str = ''
    for (let i = 0; i < arr.length; i++) {
        str += '{'

        for (let j = 0; j < arr[i].length; j++) {
            str += arr[i][j]
            if (j !== arr[i].length - 1) {
                str += ','
            }
        }
        str += `}${i !== arr.length - 1 ? ',' : ''}\n`
    }
    return str
}

/**
 * 将数字转换为 0xFF 格式
 * @param num  范围在 [0, 255]
 * @returns
 */
function to16(num: number) {
    return `0x${num.toString(16).padStart(2, '0').toUpperCase()}`
}

/**
 * 将一维 RGBA 数组转换为 width × height 的二维像素点数组
 * @param dataRGBA
 * @param width
 * @param height
 */
function imgData2pixelGrid(
    dataRGBA: Uint8ClampedArray,
    width: number,
    height: number
) {
    const pixelGrid = [] as number[][]
    for (let h = 0; h < height; h++) {
        const row = [] as number[]
        const preRow = h * width * 4
        for (let w = 0; w < width; w++) {
            const index = preRow + w * 4
            row.push(
                (dataRGBA[index] + dataRGBA[index + 1] + dataRGBA[index + 2]) /
                    3 >
                    127
                    ? 1
                    : 0
            )
        }
        pixelGrid.push(row)
    }
    return pixelGrid
}

/**
 * 将二维数组转换为字节数组，列上每 8 个像素点作为一个字节。
 * 比如从上到下像素点为
 *          0 高位
 *          1
 *          0
 *          0
 *          1
 *          0
 *          0
 *          1 低位
 * 将会转换为 0x92，即逆向（低位在前，高位在后）
 * 故 width × height 将变为 width × (height / byte)
 *
 * @param pixelGrid
 * @returns 返回的数组是跟图像一致的，但可能并不符合硬件要求
 */
function pixelGrid2ByteArr(pixelGrid: number[][]) {
    const height = pixelGrid.length
    const width = pixelGrid[0].length

    // 末尾不足 8 位的补 0
    if (height % 8) {
        const fillNumber = 8 - (height % 8)
        pixelGrid.push(...Array(fillNumber).fill(Array(8).fill(0)))
    }

    const pageSize = Math.ceil(height / 8)
    const res = [] as string[][]

    for (let y = 0; y < pageSize; y++) {
        const row = [] as string[]
        for (let w = 0; w < width; w++) {
            let bin = 0
            const yStart = y * 8
            // 列上每 8 位作为一个字节
            for (let i = 0; i < 8; i++) {
                bin |= pixelGrid[yStart + i][w] << i
            }

            row.push(to16(bin))
        }
        res.push(row)
    }
    return res
}

/**
 * 转置矩阵
 * @param matrix
 * @returns
 */
function transposeMatrix<T = any>(matrix: Array<Array<T>>) {
    const row = matrix.length
    const col = matrix[0].length
    // const matrixT = Array(col).fill(new Array(row))  不能使用这种方式创建二维数组，因为每个元素引用的是同一数组
    const matrixT = []
    for (let i = 0; i < col; i++) {
        matrixT[i] = []
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            matrixT[j][i] = matrix[i][j]
        }
    }
    return matrixT
}

/**
 * 根据 imgData 中的 data ，生成 C51 格式代码。生成的像素大小取决于传入的 imgData 大小
 * @param imgData 通过 canvas 获取的图像数据
 * @returns
 */
export function getC51Str(imgData: ImageData): string {
    const width = imgData.width
    const height = imgData.height

    return toC_ArrString(
        // transposeMatrix(
        pixelGrid2ByteArr(imgData2pixelGrid(imgData.data, width, height))
        // )
    )
}
