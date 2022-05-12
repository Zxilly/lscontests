import { alloj } from "./lib/oj";
import { getLangDict } from "./locale";
import _ from "lodash";

export type config = {
    abbrList?: string[],
    days?: number,
    sort?: boolean;
};

const defaultConfig = {
    abbrList: Object.keys(alloj),
    days: 3,
    sort: true
};

export async function getContestList(config?: config)
{
    const cfg = { ...defaultConfig, ...config };
    if(cfg.abbrList.length == 0) cfg.abbrList = defaultConfig.abbrList;
    const contests = (await Promise.all(
        cfg.abbrList.map(
            async abbr =>
            {
                try
                {
                    const cts = await alloj[abbr].get();
                    return cts.filter((c) => c.startTime <= new Date(Date.now() + cfg.days * 86400000));
                }
                catch(e)
                {
                    console.error(`Failed to get match information for ${alloj[abbr].name}, details:`);
                    console.error(e);
                    return [];
                }
            }
        )
    )).reduce((ls1, ls2) => ls1.concat(ls2));
    if(cfg.sort) contests.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    return contests;
}

export async function getContestInfo(config?: config, language = "zh-CN")
{
    const lang = await getLangDict(language);
    const contests = await getContestList(config);
    const info: string[] = [];
    info.push(_.template(lang.welcome)({ contestCount: contests.length, days: config ? config.days : defaultConfig.days }));
    for(const contest of contests)
    {
        const msg: string[] = [];
        msg.push(`${lang.ojName}: ${contest.ojName}`);
        msg.push(`${lang.name}: ${contest.name}`);
        msg.push(`${lang.rule}: ${contest.rule}`);
        msg.push(`${lang.startTime}: ${contest.startTime.toLocaleString()}`);
        msg.push(`${lang.endTime}: ${contest.endTime.toLocaleString()}`);
        msg.push(contest.url);
        info.push(msg.join("\n"));
    }
    return info.join("\n\n");
}

export { cli } from "./cli";
export { addOJ } from "./lib/oj";
