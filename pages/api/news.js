import axios from "axios";
import xml2js from "xml2js";
import { stripHtml } from "string-strip-html";

export default async function newsAPI(req, res) {
  const AUTOSPORT = {
    source: "AUTOSPORT",
    url: "https://www.autosport.com/rss/feed/f1",
    display: "Autosport.com",
  };
  const GUARDIAN = {
    source: "GUARDIAN",
    url: "https://www.theguardian.com/sport/formulaone/rss",
    display: "The Guardian UK",
  };

  const CRASH_NET = {
    source: "CRASH_NET",
    url: "https://www.crash.net/rss/f1",
    display: "Crash.net",
  };

  const rss = [AUTOSPORT, GUARDIAN, CRASH_NET];

  const feedReq = rss.map((feed) => axios.get(feed.url));

  try {
    const xml = await axios.all(feedReq);

    let parsed = [];

    xml.map((item) =>
      xml2js.parseString(item.data, (err, result) => {
        //console.log("result", result.rss.channel);
        parsed.push(result.rss.channel);
      })
    );
    // console.log("parsed", parsed);
    const stories = sortStories(parsed);
    res.status(200).json(stories);
  } catch (err) {
    console.log(err);
  }
}

const sortStories = (parsed) => {
  let stories = [];

  parsed.map((source) => {
    source.map((story) => {
      //console.log(story);
      story.item.map((s) => {
        let current = {
          title: s.title[0].toString(),
          link: s.link[0].toString(),
          pubDate: s.pubDate[0].toString(),
          description:
            stripHtml(s.description[0].toString()).result.replace(
              /^(.{100}[^\s]*).*/,
              "$1"
            ) + "...",
          source: story.title,
        };

        stories.push(current);
      });
    });
  });
  stories = stories.sort((a, b) => {
    let dateA = new Date(a.pubDate);
    let dateB = new Date(b.pubDate);
    return dateB - dateA;
  });
  return stories.slice(0, 10);
};
