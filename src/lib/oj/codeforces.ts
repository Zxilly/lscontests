import axios from "axios";
import * as cheerio from "cheerio";
import { contest, rule } from "../contest";
import { oj } from ".";

type result = {
    id: string;
    name: string;
    type: string;
    phase: string;
    frozen: boolean;
    durationSeconds: number;
    startTimeSeconds: number;
    relativeTimeSeconds: number;
}

const ruleRecord: Record<string, rule> = {
    CF: "Codeforces",
    ICPC: "ICPC"
};

export const cf: oj = {
    name: "Codeforces",
    get: async () => {
        const response = await axios.get("https://codeforces.com/api/contest.list");
        if (!(response.data instanceof Object)) {
            const $ = cheerio.load(response.data);
            throw new Error($.text());
        }
        const resList: result[] = response.data.result;
        return resList.map((res): contest => {
            return {
                ojName: cf.name,
                name: res.name,
                rule: ruleRecord[res.type],
                startTime: new Date(res.startTimeSeconds * 1000),
                endTime: new Date((res.startTimeSeconds + res.durationSeconds) * 1000),
                url: `https://codeforces.com/contests/${res.id}`
            };
        }).filter((contest) => contest.startTime >= new Date());
    }
};
