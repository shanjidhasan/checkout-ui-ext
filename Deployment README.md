# Shopify UI Extension Task

## How to deploy:
- First clone this repository. `git clone https://github.com/shanjidhasan/checkout-ui-ext.git`
### 1. Setup Render
- Go to [Render Dashboard](https://dashboard.render.com/), click New > Web Service.
- In the service creation flow, connect your project’s Git repository and give the service a name such as `checkout-ui-ext`

    - Render assigns your web service an onrender.com subdomain based on its name (e.g., a name of “Shopify Example App” might produce `https://checkout-ui-ext.onrender.com`). You will need this URL later.
- Select **Docker** as your service’s runtime and choose an instance type (such as Free or Starter).
- Add the following environment settings to your service:
    |Variable Name	 | Value    |
    |:---:   | :---: |
    |`SHOPIFY_API_KEY` | Obtain by running `npm run shopify app env show` |
    |`SHOPIFY_API_SECRET` | Obtain by running `npm run shopify app env show` |
    |`SCOPES` | Obtain by running `npm run shopify app env show` |
    | `SHOPIFY_APP_URL` | Use the Render web service’s URL from above (e.g., `https://checkout-ui-ext.onrender.com`) |
    | `NODE_ENV` | Set this to `production` |

- Click **Deploy** Web Service.
### 2. Local configuration and deployment using Shopify CLI
- Look for the line that contains `application_url` and change it to your Render service’s onrender.com URL. For example, if your service’s URL is `https://checkout-ui-ext.onrender.com`, the line should look like this:
```bash
application_url = "https://checkout-ui-ext.onrender.com"
```
- Next, under the `[auth]` section in the configuration file, find the `redirect_urls` list and change the callback URLs to match your Render service’s URL. For example:
```bash
redirect_urls = [
    "https://checkout-ui-ext.onrender.com/auth/callback",
    "https://checkout-ui-ext.onrender.com/auth/shopify/callback",
    "https://checkout-ui-ext.onrender.com/api/auth/callback"
]
```
Save the file and run `shopify app deploy` to deploy your app to Shopify. You should see a confirmation that shows the changes in the `application_url` and `auth` sections. Confirm the changes.