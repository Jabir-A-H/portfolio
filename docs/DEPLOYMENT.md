# Hostinger Deployment Guide

This repository is configured to build a static export (`output: 'export'`) and automatically deploy to Hostinger via GitHub Actions whenever changes are pushed to the `main` branch.

---

## How It Works

1. **Local or CI Build:** Next.js compiles all 28 routes into plain HTML, CSS, JavaScript, and assets in the `out/` directory.
2. **Automated Upload:** GitHub Actions runs `npm run verify:all`. Once all 66 tests and checks pass, it uses FTPS (Secure File Transfer) to sync the contents of `out/` directly to Hostinger's `public_html/` web folder.
3. **No Node.js Required on Server:** Hostinger simply serves the pre-rendered static files at maximum speed with zero server maintenance.

---

## 🛠️ One-Time Setup: Adding Hostinger Secrets to GitHub

To allow GitHub Actions to securely connect and upload to your Hostinger account, add your FTP credentials to your GitHub repository secrets:

### Step 1: Find Your Hostinger FTP Details
1. Log into your **Hostinger hPanel**.
2. Go to **Websites** -> select your website -> click **Manage**.
3. In the left sidebar, navigate to **Files** -> **FTP Accounts**.
4. Note down:
   - **FTP IP / Host Name** (e.g., `ftp.yourdomain.com` or `185.xxx.xxx.xxx`)
   - **FTP Username** (e.g., `u123456789`)
   - **FTP Password** (set or reset the password if you don't know it)
   - **Directory**: verify it points to `public_html` (default)

### Step 2: Add Secrets to GitHub
1. Open your repository on GitHub.
2. Click **Settings** -> **Secrets and variables** -> **Actions**.
3. Under **Repository secrets**, click **New repository secret** and add:

| Secret Name | Value Example | Description |
|---|---|---|
| `FTP_SERVER` | `ftp.yourdomain.com` or `185.199.xxx.xxx` | Hostinger FTP hostname or server IP |
| `FTP_USERNAME` | `u123456789` | Your Hostinger FTP account username |
| `FTP_PASSWORD` | `YourSecretPassword123!` | Your Hostinger FTP account password |
| `FTP_TARGET_DIR` | *(Optional, default: `public_html/`)* | Leave blank unless deploying to a subdomain or subfolder |

---

## 🚀 How to Trigger Deployment

- **Automatic:** Every time you push to the `main` branch, the deployment workflow runs automatically.
- **Manual:** In your GitHub repo, go to **Actions** -> **Deploy Static Export to Hostinger** -> click **Run workflow**.

---

## 🛡️ Workflows Overview

- [`.github/workflows/ci.yml`](file:///d:/WebDev/portfolio/.github/workflows/ci.yml): Runs on every branch/PR to typecheck, lint, build, and verify tests.
- [`.github/workflows/deploy.yml`](file:///d:/WebDev/portfolio/.github/workflows/deploy.yml): Runs on `main` to run verification and deploy `out/` to Hostinger.
