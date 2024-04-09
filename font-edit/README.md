<!-- spell-checker:ignore  ttfautohint Iosevka -->
# 字体

TODO:

- [ ] 解决表格格式化时的中英文对齐问题

我的字体方案：

- 自定义 Basic Latin，字宽为 500（通过 Iosevka 生成）
- 中文部分使用字宽 1000 字体（比如 sarasa-fixed-sc-regular）

## Unicode 分类介绍

- CJK Symbols and Punctuation 有、。【】《》
- Halfwidth and Fullwidth Forms 含有！：；？，（）
- General Punctuation 含有
    - 破折号 em dash —
    - 全角单双引号‘’“”

## 提取 ASCII 步骤

1. 使用 FontCreator 打开 `Hack-Regular.ttf` 文件
2. 点击左侧导航栏的 `Unicode`，会看到很多分类，我们只保留 `Basic Latin`，其他的全部删除
3. 打开上方的 `font` --> `properties`，然后编辑 `Family Name` 为 "Hack-ASCII" 来修改字体名称
4. 打开上方的 `file` --> `export font as...` 导出字体文件为 `ttf` 格式

> 说明
>
> `Basic Latin` 一共 95 个字符
>
> ```text
>  1 个空格
> 52 个大小写字母 A-Za-z
> 26 个数字行按键
>     `  1  2  3  4  5  6  7  8  9  0  -  =
>     ~  !  @  #  $  %  ^  &  *  (  )  _  +
> 16 个基本标点符号
>     [   ]   \
>         ;   '
>     ,   .   /
>
>     {   }   |
>         :   "
>     <   >   ?
> ```

## Iosevka 自定义字体

基本步骤：

1. 安装 [ttfautohint](https://freetype.org/ttfautohint/#download)，然后添加到系统环境变量中。
2. [到 Iosevka 网站上](https://typeof.net/Iosevka/customizer) 自定义字体，然后拷贝配置。（可以对配置进一步修改，比如设置字宽为 500）
3. `git clone --depth 1 https://github.com/be5invis/Iosevka.git` 并且 `npm ci`
4. 将配置添加到 `build-plans.toml` 文件中。
5. 执行 `npm run build -- ttf::lim`

## 相关网站

字体编辑器：

- [开源 FontForge](https://fontforge.org/en-US/downloads/windows-dl/)
- [付费 FontCreator 中文代理](https://fontcreator.com.cn/)
- [~~汉化 FontCreator~~](https://www.52pojie.cn/thread-1290173-1-1.html)

字体：

- [Hack](https://github.com/source-foundry/Hack)
