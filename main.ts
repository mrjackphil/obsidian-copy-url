import {Plugin, TFile} from 'obsidian';

export default class CopyObsidianURI extends Plugin {
    load() {
        this.app.workspace.on("file-menu", ((e, t) => {
            t instanceof TFile && e.addItem(((e) => {
                    return e.setTitle('Copy obsidian url as a link').setIcon('link').onClick((() => {
                        // @ts-ignore
                        const uri = this.app.getObsidianUrl(t)

                        return this.copy(`[${t.basename}](${uri})`)
                    }))
                }
            ))
        }))
    }

    copy(e: string) {
        if (navigator.clipboard && navigator.permissions)
            navigator.clipboard.writeText(e);
        else {
            var t = document.createElement("textarea");
            t.value = e,
                t.style.top = "0",
                t.style.left = "0",
                t.style.position = "fixed",
                document.body.appendChild(t);
            try {
                t.focus(),
                    t.select(),
                    document.execCommand("copy")
            } catch (e) {}
            document.body.removeChild(t)
        }
    }

    unload() {
        console.log('unloading plugin')
    }
}
