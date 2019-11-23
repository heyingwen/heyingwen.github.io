# 确保脚本抛出遇到的错误
set -e
START_TIME=$(date +%s)
# cd docs
# 生成静态文件
vuepress -v
# vuepress build .
vuepress build .

# 进入生成的文件夹
cd .vuepress/dist


# 如果是发布到自定义域名

git config --global user.email "heyingwen2006@163.com"
git config --global user.name "heyingwen"
git init
git remote add origin https://github.com/heyingwen/heyingwen.github.io.git
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f  origin master:gh-pages

cd ..
END_TIME=$(date +%s)
ELAPSED_TIME=$((END_TIME - START_TIME))

DATAS="gitfe.com: `date +%Y-%m-%d,%H:%M`  发布成功,用时：${ELAPSED_TIME}秒 "  
echo "${DATAS}">> deploy-log.log