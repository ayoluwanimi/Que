# 🚀 Netlify Deployment Guide for Real Estate Website

## Prerequisites

Before deploying, make sure you have:
- A GitHub account
- A Netlify account (free tier is sufficient)
- Your domain name (if using custom domain)
- Git installed locally

## Step 1: Prepare Your Repository

### 1.1 Initialize Git Repository (if not already done)
```bash
cd /project/workspace/real-estate-website
git init
git add .
git commit -m "Initial commit: Real estate website ready for deployment"
```

### 1.2 Push to GitHub
1. Create a new repository on GitHub named `real-estate-website`
2. Connect your local repository:
```bash
git remote add origin https://github.com/YOUR_USERNAME/real-estate-website.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Netlify

### 2.1 Connect Repository to Netlify
1. Go to [Netlify](https://app.netlify.com) and log in
2. Click **"New site from Git"**
3. Choose **GitHub** as your Git provider
4. Select your `real-estate-website` repository
5. Configure build settings:
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `out`

### 2.2 Add Environment Variables
In Netlify dashboard → Site settings → Environment variables, add:
- `NODE_VERSION`: `20`
- `NPM_VERSION`: `10`
- `NODE_ENV`: `production`

### 2.3 Deploy
Click **"Deploy site"** - your site will be available at `https://random-name.netlify.app`

## Step 3: Set Up Custom Domain

### 3.1 Add Custom Domain in Netlify
1. In Netlify dashboard → Domain settings
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `yourrealestate.com`)
4. Netlify will provide DNS settings

### 3.2 Configure DNS
**Option A: Use Netlify DNS (Recommended)**
1. In your domain registrar, change nameservers to Netlify's:
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
   - `dns3.p01.nsone.net`
   - `dns4.p01.nsone.net`

**Option B: Use Your Current DNS Provider**
Add these DNS records:
- **A Record**: `@` → `75.2.60.5`
- **CNAME**: `www` → `your-site.netlify.app`

### 3.3 Enable HTTPS
Netlify automatically provides free SSL certificates via Let's Encrypt.

## Step 4: Set Up Netlify Identity & CMS Authentication

### 4.1 Enable Netlify Identity
1. In Netlify dashboard → Identity tab
2. Click **"Enable Identity"**
3. In Settings → Registration preferences:
   - Set to **"Invite only"** (recommended for CMS)
4. In Settings → External providers:
   - Enable **Google**, **GitHub**, or other OAuth providers if desired

### 4.2 Enable Git Gateway
1. In Identity → Services tab
2. Click **"Enable Git Gateway"**
3. This allows CMS to commit directly to your repository

### 4.3 Update Site URLs
1. Replace all instances of `https://your-site.netlify.app` with your actual domain
2. Update these files:
   - `public/admin/config.yml`
   - `netlify.toml`

### 4.4 Create Admin User
1. In Netlify dashboard → Identity tab
2. Click **"Invite users"**
3. Enter your email address
4. Check your email and set up your account

## Step 5: Test CMS Access

### 5.1 Access CMS
1. Go to `https://yourdomain.com/admin`
2. Click **"Login with Netlify Identity"**
3. Use the account you just created

### 5.2 Test Content Management
1. Try creating a new property listing
2. Test uploading images
3. Verify that changes appear on your website

## Step 6: Configuration Updates

### 6.1 Update Site Configuration
Edit `/src/lib/constants.ts`:
```typescript
export const SITE_CONFIG = {
  // Update with your actual domain
  siteUrl: 'https://yourdomain.com',
  
  // Update company information
  company: {
    name: 'Your Company Name',
    tagline: 'Your Tagline',
    phone: '(555) YOUR-PHONE',
    email: 'info@yourdomain.com',
    address: 'Your Address'
  },
  
  // Update social media links
  social: {
    facebook: 'https://facebook.com/yourcompany',
    instagram: 'https://instagram.com/yourcompany',
    twitter: 'https://twitter.com/yourcompany',
    linkedin: 'https://linkedin.com/company/yourcompany'
  }
};
```

### 6.2 Update CMS Configuration
Edit `public/admin/config.yml`:
```yaml
backend:
  name: git-gateway
  branch: main
  publish_mode: editorial_workflow

site_url: "https://yourdomain.com"
display_url: "https://yourdomain.com"
identity_url: "https://yourdomain.com"
gateway_url: "https://yourdomain.com/api/auth"
```

## Step 7: Advanced Features (Optional)

### 7.1 Contact Form Setup
Your contact forms are already configured to use Netlify Forms. They'll work automatically once deployed.

### 7.2 Site Analytics
Add Google Analytics by updating `src/app/layout.tsx` with your tracking ID.

### 7.3 SEO Optimization
- Submit your sitemap to Google Search Console
- Configure Google My Business
- Set up local SEO for real estate

## Step 8: Going Live Checklist

### ✅ Pre-Launch Checklist
- [ ] All URLs updated to production domain
- [ ] SSL certificate active (https://)
- [ ] CMS admin access working
- [ ] Contact forms tested
- [ ] Property images loading correctly
- [ ] Mobile responsive design verified
- [ ] SEO meta tags configured
- [ ] Google Analytics (optional) configured
- [ ] Social media links updated

### 🔧 Post-Launch Tasks
- [ ] Create backup of your site
- [ ] Set up monitoring/uptime alerts
- [ ] Add real property listings via CMS
- [ ] Update company branding and content
- [ ] Set up Google My Business
- [ ] Submit to search engines

## Troubleshooting

### Common Issues & Solutions

**Build Failed:**
- Check Node.js version is 20+
- Verify all environment variables are set
- Check build logs in Netlify dashboard

**CMS Not Working:**
- Ensure Git Gateway is enabled
- Verify Identity is enabled with correct settings
- Check that admin user is created and confirmed

**Images Not Loading:**
- Verify image paths are correct
- Check that images are in the `public/images` folder
- Ensure proper permissions for image uploads

**Forms Not Submitting:**
- Netlify Forms work automatically with `netlify` attribute
- Check form submissions in Netlify dashboard
- Verify form fields have proper `name` attributes

## Support Resources

- **Netlify Documentation**: https://docs.netlify.com/
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Netlify CMS Docs**: https://decapcms.org/docs/
- **Community Support**: Netlify Community Forums

## Security Best Practices

1. **Keep Dependencies Updated**: Regularly update npm packages
2. **Use Environment Variables**: Never commit API keys to repository  
3. **Enable 2FA**: Use two-factor authentication on all accounts
4. **Regular Backups**: Set up automated backups of your content
5. **Monitor Access**: Review CMS user access regularly

---

**🎉 Congratulations!** Your professional real estate website is now live with content management capabilities!