import { Table } from "./dist/Table.js";

const data = [
  { name: "Google", url: "https://www.google.com" },
  { name: "YouTube", url: "https://www.youtube.com" },
  { name: "GitHub", url: "https://github.com" },
  { name: "Stack Overflow", url: "https://stackoverflow.com" },
  { name: "Reddit", url: "https://www.reddit.com" },
  { name: "Wikipedia", url: "https://www.wikipedia.org" },
  { name: "Twitter", url: "https://twitter.com" },
  { name: "Facebook", url: "https://www.facebook.com" },
  { name: "Instagram", url: "https://www.instagram.com" },
  { name: "Netflix", url: "https://www.netflix.com" },
  { name: "Spotify", url: "https://www.spotify.com" },
  { name: "Amazon", url: "https://www.amazon.com" },
  { name: "Twitch", url: "https://www.twitch.tv" },
  { name: "Discord", url: "https://discord.com" },
  { name: "LinkedIn", url: "https://www.linkedin.com" },
  { name: "OpenAI", url: "https://www.openai.com" },
  { name: "Mozilla", url: "https://www.mozilla.org" },
  { name: "NPM", url: "https://www.npmjs.com" },
  { name: "Vercel", url: "https://vercel.com" },
  { name: "Figma", url: "https://www.figma.com" },
  { name: "Canva", url: "https://www.canva.com" },
  { name: "Notion", url: "https://www.notion.so" },
  { name: "Medium", url: "https://medium.com" },
  { name: "Deezer", url: "https://www.deezer.com" },
  { name: "Pinterest", url: "https://www.pinterest.com" },
  { name: "Apple", url: "https://www.apple.com" },
  { name: "Microsoft", url: "https://www.microsoft.com" },
  { name: "Adobe", url: "https://www.adobe.com" },
  { name: "Cloudflare", url: "https://www.cloudflare.com" },
  { name: "Udemy", url: "https://www.udemy.com" }
];


const body = (rowData) => {
    return  `
        <div class="actions">
            <button type="button" data-id="${rowData.name}" id="view">
                Ver detalles
            </button>
            <button type="button" data-id="${rowData.name}" id="update">
                Actualizar
            </button>
        </div>
    `;
};

const columns = [
    { header: "NAME", field: "name"},
    { header: "URL", field: "url"},
    { header: "ACCIONES", body: body}
];

const tableObj = new Table({
    data : data,
    columns : columns,
});

tableObj.createTable("#container")

tableObj.customEvent({
    selector: "tbody button",
    eventName: 'click',
    event : (e) => {
        const button = e.target;
        alert(button.dataset.id)
    }
})

