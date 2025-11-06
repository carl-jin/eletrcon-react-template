import { input, confirm } from '@inquirer/prompts';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件所在目录和项目根目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 需要替换的文件路径
const FILES = {
  packageJson: path.join(rootDir, 'package.json'),
  electronBuilder: path.join(rootDir, '.electron-builder.config.cjs'),
  evdConfig: path.join(rootDir, 'evd.config.js'),
};

// 当前的配置值
const CURRENT_VALUES = {
  appName: '自动登入',
  slug: 'fb-group-manager-software',
};

async function main() {
  console.log('\n🚀 项目重命名工具\n');
  console.log('此工具将帮助您快速替换项目中的名称和标识符。\n');

  // 询问用户输入
  const appName = await input({
    message: '请输入软件名称（用于显示）:',
    default: CURRENT_VALUES.appName,
    validate: (value) => value.trim() !== '' || '软件名称不能为空',
  });

  const slug = await input({
    message: '请输入项目 slug（用于包名、URL等）:',
    default: CURRENT_VALUES.slug,
    validate: (value) => {
      if (value.trim() === '') return '项目 slug 不能为空';
      if (!/^[a-z0-9-]+$/.test(value)) return 'slug 只能包含小写字母、数字和连字符';
      return true;
    },
  });

  const githubUsername = await input({
    message: '请输入 GitHub 用户名（用于生成 homepage）:',
    default: 'carl-jin',
    validate: (value) => value.trim() !== '' || 'GitHub 用户名不能为空',
  });

  // 生成新的配置值
  const newValues = {
    appName,
    slug,
    homepage: `https://github.com/${githubUsername}/${slug}`,
    appId: `com.${slug}.app`,
    cloudflareUrl: `https://${slug}.pages.dev`,
    cloudflareProjectName: slug,
  };

  // 显示将要进行的修改
  console.log('\n📋 将进行以下修改：\n');
  console.log(`  软件名称: ${CURRENT_VALUES.appName} → ${newValues.appName}`);
  console.log(`  项目 slug: ${CURRENT_VALUES.slug} → ${newValues.slug}`);
  console.log(`  Homepage: https://github.com/carl-jin/${CURRENT_VALUES.slug} → ${newValues.homepage}`);
  console.log(`  App ID: com.simple-marker.autologinsoftware → ${newValues.appId}`);
  console.log(`  Cloudflare URL: https://auto-login-software-main.pages.dev → ${newValues.cloudflareUrl}`);
  console.log(`  Cloudflare Project: auto-login-software-main → ${newValues.cloudflareProjectName}`);
  console.log('');

  const confirmed = await confirm({
    message: '确认要执行这些修改吗？',
    default: true,
  });

  if (!confirmed) {
    console.log('\n❌ 操作已取消\n');
    process.exit(0);
  }

  // 执行替换
  console.log('\n⚙️  正在修改文件...\n');

  try {
    // 1. 修改 package.json
    updatePackageJson(newValues);
    console.log('✓ 已更新 package.json');

    // 2. 修改 .electron-builder.config.cjs
    updateElectronBuilder(newValues);
    console.log('✓ 已更新 .electron-builder.config.cjs');

    // 3. 修改 evd.config.js
    updateEvdConfig(newValues);
    console.log('✓ 已更新 evd.config.js');

    console.log('\n✅ 所有文件已成功更新！\n');
    console.log('💡 提示: 您可能还需要手动更新：');
    console.log('   - 项目图标文件 (buildResources/)');
    console.log('   - README.md 文件');
    console.log('   - 其他包含项目名称的文档\n');
  } catch (error) {
    console.error('\n❌ 发生错误:', error);
    process.exit(1);
  }
}

/**
 * 更新 package.json
 */
function updatePackageJson(newValues: {
  appName: string;
  slug: string;
  homepage: string;
}) {
  const content = fs.readFileSync(FILES.packageJson, 'utf-8');
  const pkg = JSON.parse(content);

  // 更新字段
  pkg.name = newValues.slug;
  pkg.description = newValues.appName;
  pkg.homepage = newValues.homepage;

  // 保持原有的缩进（2个空格）
  fs.writeFileSync(FILES.packageJson, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
}

/**
 * 更新 .electron-builder.config.cjs
 */
function updateElectronBuilder(newValues: { appName: string; appId: string }) {
  let content = fs.readFileSync(FILES.electronBuilder, 'utf-8');

  // 替换 productName
  content = content.replace(
    /productName:\s*['"]自动登入['"]/,
    `productName: '${newValues.appName}'`
  );

  // 替换 appId
  content = content.replace(
    /appId:\s*['"]com\.simple-marker\.autologinsoftware['"]/,
    `appId: '${newValues.appId}'`
  );

  // 替换所有 artifactName 中的 "自动登入"
  content = content.replace(
    /artifactName:\s*['"]自动登入\.\$\{version\}-\$\{arch\}\.\$\{ext\}['"]/g,
    `artifactName: '${newValues.appName}.\${version}-\${arch}.\${ext}'`
  );

  fs.writeFileSync(FILES.electronBuilder, content, 'utf-8');
}

/**
 * 更新 evd.config.js
 */
function updateEvdConfig(newValues: {
  appName: string;
  cloudflareUrl: string;
  cloudflareProjectName: string;
}) {
  let content = fs.readFileSync(FILES.evdConfig, 'utf-8');

  // 替换 sources.folder 中的应用名称
  content = content.replace(
    /folder:\s*['"]dist\/mac-arm64\/自动登入\.app\/Contents\/Resources\/app['"]/,
    `folder: 'dist/mac-arm64/${newValues.appName}.app/Contents/Resources/app'`
  );

  // 替换 cloudflare.url
  content = content.replace(
    /url:\s*['"]https:\/\/auto-login-software-main\.pages\.dev['"]/,
    `url: '${newValues.cloudflareUrl}'`
  );

  // 替换 cloudflare.projectName
  content = content.replace(
    /projectName:\s*[`'"]auto-login-software-main[`'"]/,
    `projectName: \`${newValues.cloudflareProjectName}\``
  );

  fs.writeFileSync(FILES.evdConfig, content, 'utf-8');
}

// 运行主函数
main().catch((error) => {
  console.error('发生错误:', error);
  process.exit(1);
});

