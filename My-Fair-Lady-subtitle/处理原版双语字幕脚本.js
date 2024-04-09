const fs = require('fs')

let subtitle = fs.readFileSync('简英双语字幕 - 原版.srt', 'utf-8')

subtitle = removeCR(subtitle)
subtitle = replace_l2i(subtitle)
subtitle = peopleName(subtitle)
subtitle = addCharacters(subtitle)
subtitle = addNonTranslate(subtitle)
subtitle = addCR(subtitle)

fs.writeFileSync('简英双语字幕 - 编辑版.srt', subtitle, 'utf8')

function removeCR(subtitle) {
    return subtitle.replace(/\r\n/g, '\n')
}

function replace_l2i(subtitle) {
    subtitle = subtitle.replace(/(?<=\b[A-Zl]*)l(?=[A-Zl]*\b)/g, 'I')
    // subtitle = subtitle.replace(/(?<=\b[A-Z]*)l(?=[A-Z]*\b)/g, 'I') 该正则无法匹配 WHlSTLlNG
    return subtitle
}

function peopleName(subtitle) {
    // ELIZA 伊莉莎
    // HIGGINS 希金斯
    // PICKERING 皮克林
    // PEARCE 皮尔斯
    // ALFIE 阿尔菲(男)
    // JAMIE 杰米
    // HARRY 哈利
    subtitle = subtitle.replace(/伊莱莎/g, '伊莉莎')
    subtitle = subtitle.replace(/弗瑞迪/g, '弗雷迪')
    return subtitle
}

function addCharacters(subtitle) {
    const arr = [
        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}WOMAN: )/g,
                                    '$1' + '女：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}WOMAN 1 : )/g,
                                    '$1' + '女1：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}WOMAN 2: )/g,
                                    '$1' + '女2：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}WOMAN 3: )/g,
                                    '$1' + '女3：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}WOMAN 4: )/g,
                                    '$1' + '女4：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}MAN: )/g,
                                    '$1' + '男：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}MAN 1 : )/g,
                                    '$1' + '男1：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}MAN 2: )/g,
                                    '$1' + '男2：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}MAN 3: )/g,
                                    '$1' + '男3：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}MAN 4: )/g,
                                    '$1' + '男4：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}MAN 5: )/g,
                                    '$1' + '男5：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}VALET 1 : )/g,
                                    '$1' + '车夫1：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}VALET 2: )/g,
                                    '$1' + '车夫2：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}ELIZA: )/g,
                                    '$1' + '伊莉莎：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}CHORUS: )/g,
                                    '$1' + '合唱：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}JAMIE: )/g,
                                    '$1' + '杰米：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}ALFIE: )/g,
                                    '$1' + '阿尔菲（男）：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}PEARCE: )/g,
                                    '$1' + '皮尔斯：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}HARRY: )/g,
                                    '$1' + '哈利：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}ALL: )/g,
                                    '$1' + '所有人：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}FREDDY: )/g,
                                    '$1' + '弗雷迪：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}BUTLER: )/g,
                                    '$1' + '男仆：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}LADY: )/g,
                                    '$1' + '女士：'],

        [/(.+ --> .+\n)(?=(.*\n)?\{\\fs11\}HIGGINS: )/g,
                                    '$1' + '希金斯：'],
    ]
    for (const [searchVal, replaceVal] of arr) {
        subtitle = subtitle.replace(searchVal, replaceVal)
    }
    return subtitle
}

function addNonTranslate(subtitle) {
    const arr = [
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[CHATTERING\])/g,
                                         '[聊天的声音]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[VALET 2 WHISTLES\])/g,
                                         '[车夫2的口哨声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[PEOPLE MURMURING\])/g,
                                         '[人们的抱怨声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HORN HONKING\])/g,
                                         '[汽车喇叭声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[FREDDY WHISTLES\])/g,
                                         '[费雷迪的口哨声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[GRUNTS\])/g,
                                         '[咕噜声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[PICKERING LAUGHS\])/g,
                                         '[皮克林的笑声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HIGGINS CHUCKLES\])/g,
                                         '[希金斯在咯咯笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[BOTH LAUGHING\])/g,
                                         '[两人在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[CHORUS HUMMING\])/g,
                                         '[合唱在声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[MEN LAUGHING\])/g,
                                         '[男人在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[CHORUS WHISTLING\])/g,
                                         '[合唱在吹口哨]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[ALL LAUGHING\])/g,
                                         '[所有人都在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[TUNING FORK HUMMING\])/g,
                                         '[不会翻译]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HUMMING VOWELS\])/g,
                                         '[哼着元音]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HIGGINS HUMMING VOWELS ON RECORDING\])/g,
                                         '[希金斯在录元音]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[STOPS CRYING\])/g,
                                         '[停止了哭泣]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[ELIZA SNIFFLES\])/g,
                                         '[伊莉莎的鼻子吸气声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[WATER RUNNING\])/g,
                                         '[水流声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[ELIZA CRYING\])/g,
                                         '[伊莉莎在哭泣]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[CRYING\])/g,
                                         '[哭泣]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[ELIZA SCREAMING\])/g,
                                         '[伊莉莎尖叫]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[RECORDED VOICE PLAYING ON FAST-FORWARD\])/g,
                                         '[快速播放录音声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[RECORDED VOICES STOP\])/g,
                                         '[录音声停止]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[LAUGHS\])/g,
                                         '[笑声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[BAND PLAYING\])/g,
                                         '[乐队演奏]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[PEOPLE LAUGHING\])/g,
                                         '[人们在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HOPKINS LAUGH\])/g,
                                         '[奥普金斯在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[ALFIE LAUGHS\])/g,
                                         '[阿尔菲（男）在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[SNEEZES\])/g,
                                         '[大喷嚏]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HIGGINS SIGHS\])/g,
                                         '[希金斯叹息]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HIGGINS SNIFFING\])/g,
                                         '[希金斯用鼻子吸气]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[SIGHS\])/g,
                                         '[叹息]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HIGGINS CHIRPING\])/g,
                                         '[希金斯在叫]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[GULPS\])/g,
                                         '[大口喝水]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[ALL LAUGH\])/g,
                                         '[大家的笑声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HIGGINS LAUGH\])/g,
                                         '[希金斯在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HIGGINS & ELIZA LAUGHING\])/g,
                                         '[希金斯和伊莉莎在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HIGGINS HUMMING\])/g,
                                         '[希金斯在哼]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HORSES GALLOPING\])/g,
                                         '[万马奔腾]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HIGGINS TAPPING\])/g,
                                         '[希金斯轻敲]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[FREDDY LAUGHS\])/g,
                                         '[弗雷迪在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HIGGINS GROANS\])/g,
                                         '[希金斯在呻吟]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[INAUDIBLE DIALOGUE\])/g,
                                         '[听不见的对话]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[FREDDY LAUGHING\])/g,
                                         '[弗雷迪在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[ALL MURMURING\])/g,
                                         '[所有人在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[FOOTSTEPS APPROACHING\])/g,
                                         '[脚步声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HIGGINS LAUGHS\])/g,
                                         '[希金斯在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[SPEAKING INAUDIBLY\])/g,
                                         '[几乎听不见的讲话声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HORNS PLAYING\])/g,
                                         '[喇叭声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[QUEEN SPEAKING FOREIGN LANGUAGE\])/g,
                                         '[女王说外语]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[BAND PLAYING WALTZ\])/g,
                                         '[乐队在演奏华尔兹]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[BAND STOPS PLAYING\])/g,
                                         '[乐队停止演奏]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[SPEAKING INDISTINCTLY\])/g,
                                         '[朦朦胧胧的说话声]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[PEOPLE WHISPERING INDISTINCTLY\])/g,
                                         '[人们的低声碎语]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[MAN WHISPERING INDISTINCTLY\])/g,
                                         '[男人在低声碎语]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[HIGGINS LAUGHING\])/g,
                                         '[希金斯在笑]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[SPEAKS FOREIGN LANGUAGE\])/g,
                                         '[说着外语]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[VOICE SPEAKING VOWELS PLAYING ON GRAMOPHONE\])/g,
                                         '[留声机上播放的哼元音的声音]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[GRAMOPHONE STOPS\])/g,
                                         '[留声机停止播放]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[TAXI PASSING\])/g,
                                         '[一辆出租车路过]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[ALL CHEERING\])/g,
                                         '[大家都在欢呼]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[GROWLS\])/g,
                                         '[咆哮]' + '\n$1'
        ],
        [/(?<=.* --> .*\n)(\{\\fs11\})(?=\[TURNS GRAMOPHONE OF\F)/g,
                                         '[关掉留声机]' + '\n$1'
        ],
    ]
    for (const [searchVal, replaceVal] of arr) {
        subtitle = subtitle.replace(searchVal, replaceVal)
    }
    return subtitle
}

function addCR(subtitle) {
    return subtitle.replace(/\n/g, '\r\n')
}
