import '@logseq/libs';

const main = async () => {
  logseq.App.registerPageMenuItem("(Blog) Publish Fragment", async () => {
    console.log("Export all public fragments to blog");

    const pages = await logseq.DB.q(`(and (property :fragment "true") (property :public "true"))`);

    const result = pages.map(p => p.parent.id).map(async pageId => {
      // get page information by id
      const page = await logseq.Editor.getPage(pageId, { includeChildren: true });

      console.log({ page });

      // get all blocks tree to build the page content
      const tree = await logseq.Editor.getPageBlocksTree(page.uuid);

      const content = tree
        .filter((_b, i) => i > 0)
        .map(b => b.content).join("\n");

      return {
        uuid: page.uuid,
        name: page.name,
        content: content,
      };
    })

    // NOTES: I need to map all fragments into a format which help me to send request to the API later
    // thinking of something like this
    /**
      [
        {
          uuid: "12345678-1234-1234-1234-123",
          name: "",
          content: ""
        }
     ]

     */

    const fragments = await Promise.all(result)

    console.log({ fragments });
  });
}

logseq.ready(main).catch(console.error);
