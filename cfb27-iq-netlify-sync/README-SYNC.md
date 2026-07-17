# CFB27 IQ Cloud Sync

This version keeps the normal local browser save, but can also sync one shared app state through Netlify.

## Netlify setup

1. Push this folder to your GitHub repo.
2. In Netlify, connect the repo to your site.
3. In Netlify project settings, add an environment variable:
   - Key: `CFB27_SYNC_CODE`
   - Value: any private code you want to type in the app, such as a long password.
4. Redeploy the site.

## First sync

1. Open the browser that currently has your correct draft board.
2. Open the Netlify site.
3. Type the same sync code into `Cloud Sync`.
4. Click `Connect`.
5. Click `Push Cloud`.
6. On another browser/device, type the same sync code and click `Pull Cloud`.

After connecting, normal edits autosave to the cloud after a short delay. Use `Pull Cloud` if another browser made changes and you want to refresh this browser.

