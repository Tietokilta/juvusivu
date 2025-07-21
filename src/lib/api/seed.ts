import { Payload } from "payload";

export const seed = async (payload: Payload, override: boolean = false) => {
  const events = await payload.find({ collection: "events", limit: 1 });
  if (events.totalDocs === 0) {
    for (let i = 1; i <= 6; i++) {
      await payload.create({
        collection: "events",
        data: {
          title: `Event ${i}`,
          description: "Description for event",
        },
      });
    }
  }
  const sponsors = await payload.find({ collection: "sponsors", limit: 1 });
  if (sponsors.totalDocs === 0) {
    for (let i = 1; i <= 3; i++) {
      await payload.create({
        collection: "sponsors",
        data: {
          name: `Sponsor ${i}`,
          url: "https://tietokilta.fi/",
        },
      });
    }
  }
  const mainPage = await payload.findGlobal({
    slug: "mainPage",
  });
  if (!mainPage || !mainPage.body || override) {
    await payload.updateGlobal({
      slug: "mainPage",
      data: {
        title: "Tietokilta 40",
        body: {
          root: {
            type: "root",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                type: "paragraph",
                format: "",
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: "normal",
                    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus laborum nihil eaque commodi repudiandae animi ipsum aliquid quaerat tempore eius atque, in, fugiat iste earum explicabo nam eos officia nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima fuga repellat voluptatem sint. Eligendi sequi repellat laborum error sint nisi deserunt! Sunt quisquam rerum deserunt, magnam repudiandae corporis ipsa tenetur.",
                    type: "text",
                    style: "",
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: "ltr",
                textStyle: "",
                textFormat: 0,
              },
              {
                type: "paragraph",
                format: "",
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: "normal",
                    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt eveniet aspernatur voluptas animi a fugiat commodi eligendi quos eum adipisci ab culpa explicabo, doloremque libero, delectus sint laborum voluptatem rerum?",
                    type: "text",
                    style: "",
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: "ltr",
                textStyle: "",
                textFormat: 0,
              },
              {
                tag: "h2",
                type: "heading",
                format: "",
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: "normal",
                    text: "Juhlavuoden tapahtumat",
                    type: "text",
                    style: "",
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: "ltr",
              },
              {
                type: "block",

                fields: {
                  id: "6877e6743db88726274c727e",
                  blockName: "",
                  blockType: "eventGrid",
                },
                format: "",
                version: 2,
              },
              {
                tag: "h2",
                type: "heading",
                format: "",
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: "normal",
                    text: "Historian havinaa",
                    type: "text",
                    style: "",
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: "ltr",
              },
              {
                type: "paragraph",
                format: "",
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: "normal",
                    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus laborum nihil eaque commodi repudiandae animi ipsum aliquid quaerat tempore eius atque, in, fugiat iste earum explicabo nam eos officia nostrum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima fuga repellat voluptatem sint. Eligendi sequi repellat laborum error sint nisi deserunt! Sunt quisquam rerum deserunt, magnam repudiandae corporis ipsa tenetur.",
                    type: "text",
                    style: "",
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: "ltr",
                textStyle: "",
                textFormat: 0,
              },
            ],
            direction: "ltr",
          },
        },
      },
    });
  }
};
