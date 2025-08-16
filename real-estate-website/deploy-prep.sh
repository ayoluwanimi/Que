#!/bin/bash

# Real Estate Website - Netlify Deployment Preparation Script
# This script helps prepare your website for Netlify deployment

echo "🚀 Real Estate Website - Netlify Deployment Preparation"
echo "====================================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    print_error "Please run this script from the real-estate-website directory"
    exit 1
fi

print_info "Checking project structure..."

# Verify required files exist
required_files=(
    "package.json"
    "next.config.ts"
    "netlify.toml"
    "public/admin/config.yml"
    "public/admin/index.html"
    "src/app/layout.tsx"
    "src/app/page.tsx"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_status "Found $file"
    else
        print_error "Missing required file: $file"
        exit 1
    fi
done

print_info "All required files found!"

# Check Node.js and npm versions
print_info "Checking Node.js and npm versions..."

node_version=$(node --version 2>/dev/null || echo "not installed")
npm_version=$(npm --version 2>/dev/null || echo "not installed")

if [[ $node_version == "not installed" ]]; then
    print_error "Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

# Extract major version number
node_major=$(echo $node_version | cut -d'.' -f1 | sed 's/v//')
if [ "$node_major" -lt 20 ]; then
    print_warning "Node.js version is $node_version. Recommended version is 20+."
else
    print_status "Node.js version: $node_version"
fi

if [[ $npm_version == "not installed" ]]; then
    print_error "npm is not installed"
    exit 1
else
    print_status "npm version: $npm_version"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_info "Installing dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        print_status "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
else
    print_status "Dependencies already installed"
fi

# Test build process
print_info "Testing production build..."
npm run build:netlify > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status "Production build successful"
    rm -rf out # Clean up build output
else
    print_error "Production build failed. Please check for errors:"
    npm run build:netlify
    exit 1
fi

# Check if Git is initialized
if [ ! -d ".git" ]; then
    print_warning "Git repository not initialized"
    read -p "Initialize Git repository? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git init
        git add .
        git commit -m "Initial commit: Real estate website ready for deployment"
        print_status "Git repository initialized"
    fi
else
    print_status "Git repository found"
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    print_warning "You have uncommitted changes"
    print_info "Current git status:"
    git status --short
    echo
    read -p "Commit all changes? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Pre-deployment commit: $(date)"
        print_status "Changes committed"
    fi
fi

# Collect deployment information
print_info "Deployment Configuration"
echo "========================"

read -p "Enter your domain name (e.g., yourrealestate.com): " domain_name
read -p "Enter your company name: " company_name
read -p "Enter your company email: " company_email
read -p "Enter your company phone: " company_phone

# Update configuration files with user input
if [ ! -z "$domain_name" ]; then
    # Update netlify.toml
    sed -i.bak "s/your-site.netlify.app/$domain_name/g" netlify.toml
    
    # Update CMS config
    sed -i.bak "s/your-site.netlify.app/$domain_name/g" public/admin/config.yml
    
    # Update site constants (create a temp update script)
    cat > temp_update_constants.js << EOF
const fs = require('fs');
const path = './src/lib/constants.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/siteUrl: '.*'/g, "siteUrl: 'https://$domain_name'");
if ('$company_name') {
    content = content.replace(/name: '.*'/g, "name: '$company_name'");
}
if ('$company_email') {
    content = content.replace(/email: '.*'/g, "email: '$company_email'");
}
if ('$company_phone') {
    content = content.replace(/phone: '.*'/g, "phone: '$company_phone'");
}

fs.writeFileSync(path, content);
console.log('Constants updated successfully');
EOF
    
    node temp_update_constants.js
    rm temp_update_constants.js
    
    print_status "Configuration files updated with your domain: $domain_name"
fi

# Create deployment summary
cat > deployment-summary.txt << EOF
Real Estate Website - Deployment Summary
========================================

Generated: $(date)

Configuration:
- Domain: ${domain_name:-"Not specified"}
- Company: ${company_name:-"Not specified"} 
- Email: ${company_email:-"Not specified"}
- Phone: ${company_phone:-"Not specified"}

Next Steps:
1. Push code to GitHub repository
2. Connect repository to Netlify
3. Configure custom domain in Netlify
4. Enable Netlify Identity for CMS
5. Create admin user for content management

Files Updated:
- netlify.toml
- public/admin/config.yml
- src/lib/constants.ts

Backup files created:
- netlify.toml.bak
- public/admin/config.yml.bak
EOF

print_status "Deployment summary created: deployment-summary.txt"

# Final checks
print_info "Final Deployment Checklist:"
echo "✅ Project structure verified"
echo "✅ Dependencies installed"
echo "✅ Production build tested"
echo "✅ Configuration files updated"

if [ -d ".git" ]; then
    echo "✅ Git repository ready"
else
    echo "⚠️  Git repository not initialized"
fi

if [ ! -z "$domain_name" ]; then
    echo "✅ Domain configuration updated"
else
    echo "⚠️  Domain not configured (can be done later)"
fi

echo
print_status "Your real estate website is ready for Netlify deployment!"
print_info "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Follow the deployment guide: netlify-deployment-guide.md"
echo "3. Configure your domain and CMS authentication"

echo
print_info "Quick GitHub setup commands:"
echo "git remote add origin https://github.com/YOUR_USERNAME/real-estate-website.git"
echo "git branch -M main"
echo "git push -u origin main"

# Clean up backup files if user wants
echo
read -p "Remove backup files? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -f netlify.toml.bak public/admin/config.yml.bak
    print_status "Backup files removed"
fi

print_status "Deployment preparation complete! 🎉"