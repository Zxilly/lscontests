# lscontests

[![GitHub Repo stars](https://img.shields.io/github/stars/StableAgOH/lscontests?style=social)](https://github.com/StableAgOH/lscontests)
[![GitHub commit activity](https://img.shields.io/github/commit-activity/m/StableAgOH/lscontests)](https://github.com/StableAgOH/lscontests)
[![License](https://img.shields.io/github/license/StableAgOH/lscontests)](https://github.com/StableAgOH/lscontests)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

[![npm](https://img.shields.io/npm/v/lscontests)](https://www.npmjs.com/package/lscontests)
[![npm](https://img.shields.io/npm/dw/lscontests)](https://www.npmjs.com/package/lscontests)

A tool to get information about the contests on each OJ.

## Usage

### CLI

You can use cli to get a list of information about upcoming contests easily.

```text
Usage: lsct [options]

Options:
  -V, --version          output the version number
  -d, --days, <day>      number of days to display (default: "3")
  -l, --list             list all supported OJ and it's abbreviation
  -o, --oj <ojs...>      OJs to display (choices: "at", "cf", "lg", "nc")
  -r, --raw              print raw contest list
  -L, --language <lang>  set output language (choices: "en", "zh-CN", "zh-TW", default: "zh-CN")
  --no-sort              do not sort by contests start time, but by OJ order
  -h, --help             display help for command
```

It performs as follows:

<details>
<summary> <code>> lsct</code> </summary>

```text
最近的 3 天内在 AtCoder,Codeforces,Luogu,NowCoder 上有 7 场比赛

比赛平台: NowCoder
比赛名称: 牛客挑战赛60
赛制: ICPC
开始时间: 2022/5/13 19:00:00
结束时间: 2022/5/13 22:00:00
https://ac.nowcoder.com/acm/contest/11200

比赛平台: Codeforces
比赛名称: Educational Codeforces Round 128 (Rated for Div. 2)
赛制: ICPC
开始时间: 2022/5/13 22:35:00
结束时间: 2022/5/14 00:35:00
https://codeforces.com/contests/1680

......
```

</details>

<details>
<summary> <code>> lsct -o at cf</code> </summary>

```text
最近的 3 天内在 AtCoder,Codeforces 上有 3 场比赛

比赛平台: Codeforces
比赛名称: Educational Codeforces Round 128 (Rated for Div. 2)
赛制: ICPC
开始时间: 2022/5/13 22:35:00
结束时间: 2022/5/14 00:35:00
https://codeforces.com/contests/1680

比赛平台: Codeforces
比赛名称: Codeforces Round #791 (Div. 2)
赛制: Codeforces
开始时间: 2022/5/14 17:35:00
结束时间: 2022/5/14 19:35:00
https://codeforces.com/contests/1679

比赛平台: AtCoder
比赛名称: Ⓐ Panasonic Programming Contest 2022(AtCoder Beginner Contest 251)
赛制: AtCoder
开始时间: 2022/5/14 20:00:00
结束时间: 2022/5/14 20:01:40
https://atcoder.jp/contests/abc251
```

</details>

<details>
<summary> <code>> lsct -o lg -d 7 -L en</code> </summary>

```text
2 contests on Luogu in the last 7 days

OJ: Luogu
Contest name: 【LGR-109】洛谷 5 月月赛 II & Windy Round 6
Rule: IOI
Start time: 2022/5/14 14:00:00
End time: 2022/5/14 18:00:00
https://www.luogu.com.cn/contest/68326

OJ: Luogu
Contest name: 「WHOI」Round 1
Rule: IOI
Start time: 2022/5/15 14:00:00
End time: 2022/5/15 18:00:00
https://www.luogu.com.cn/contest/67377
```

</details>

<details>
<summary> <code>> lsct -r -o cf --no-sort</code> </summary>

```bash
[
  {
    "ojName": "Codeforces",
    "name": "Codeforces Round #791 (Div. 2)",
    "rule": "Codeforces",
    "startTime": "2022-05-14T09:35:00.000Z",
    "endTime": "2022-05-14T11:35:00.000Z",
    "url": "https://codeforces.com/contests/1679"
  },
  {
    "ojName": "Codeforces",
    "name": "Educational Codeforces Round 128 (Rated for Div. 2)",
    "rule": "ICPC",
    "startTime": "2022-05-13T14:35:00.000Z",
    "endTime": "2022-05-13T16:35:00.000Z",
    "url": "https://codeforces.com/contests/1680"
  }
]
```

</details>

### API

If you want to get a list of contest information in your project by calling *lscontests*, or if you need to add support for other OJs, then you can call the *lscontests* API as follows:

#### Get contests information string

```typescript
import { getContestInfo } from "lscontests";

getContestInfo({ abbrList: ["cf", "lg"] }).then(console.log);
```

This code gives the same result as `lsct -o cf lg`.

#### Get contests information list

```typescript
import { getContestList } from "lscontests";

getContestList({ sort: false }).then(console.log);
```

This code gives the same result as `lsct -r --no-sort`.

#### Add OJ support

```typescript
import { addOJ, getContestInfo, getContestList } from "lscontests";

addOJ("ts", {
    name: "testOJ", get: async () => [{
        ojName: "testOJ",
        name: "testContest",
        rule: "ICPC",
        startTime: new Date(Date.now() + 1 * 86400000),
        endTime: new Date(Date.now() + 2 * 86400000),
        url: "https://www.test.com"
    }]
});

async function main() {
    console.log(await getContestInfo({ abbrList: ["cf", "ts"], days: 1 }, "en"));
    console.log();
    console.log(await getContestList({ abbrList: ["cf", "ts"], days: 7 }));
}

main();
```

This code gives the following results:

```text
1 contests on Codeforces,testOJ in the last 1 days

OJ: testOJ
Contest name: testContest
Rule: ICPC
Start time: 2022/5/13 19:34:10
End time: 2022/5/14 19:34:10
https://www.test.com

[
  {
    ojName: 'testOJ',
    name: 'testContest',
    rule: 'ICPC',
    startTime: 2022-05-13T11:34:13.464Z,
    endTime: 2022-05-14T11:34:13.464Z,
    url: 'https://www.test.com'
  },
  {
    ojName: 'Codeforces',
    name: 'Educational Codeforces Round 128 (Rated for Div. 2)',
    rule: 'ICPC',
    startTime: 2022-05-13T14:35:00.000Z,
    endTime: 2022-05-13T16:35:00.000Z,
    url: 'https://codeforces.com/contests/1680'
  },
  {
    ojName: 'Codeforces',
    name: 'Codeforces Round #791 (Div. 2)',
    rule: 'Codeforces',
    startTime: 2022-05-14T09:35:00.000Z,
    endTime: 2022-05-14T11:35:00.000Z,
    url: 'https://codeforces.com/contests/1679'
  }
]
```

#### Use link CLI

```typescript
import { cli } from "lscontests";

cli("-o cf -L en").then(console.log);
```

This code gives the same result as `lsct -o cf -L en`.

## License

[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html)
