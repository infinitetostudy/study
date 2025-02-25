const express = require('express');
const app = express();
const port = 3000;


// 模拟武汉高校数据
const wuhanUniversities = [
    { name: '武汉大学', region: '武汉', minScore: 630, website: 'https://www.whu.edu.cn/' },
    { name: '华中科技大学', region: '武汉', minScore: 625, website: 'https://www.hust.edu.cn/' },
    { name: '武汉理工大学', region: '武汉', minScore: 590, website: 'https://www.whut.edu.cn/' },
    { name: '华中师范大学', region: '武汉', minScore: 600, website: 'https://www.ccnu.edu.cn/' },
    { name: '华中农业大学', region: '武汉', minScore: 585, website: 'https://www.hzau.edu.cn/' },
    { name: '武汉科技大学', region: '武汉', minScore: 565, website: 'https://www.wust.edu.cn/' }
];

// 处理静态文件
app.use(express.static('public'));

// 处理搜索请求
app.get('/search', (req, res) => {
    const { minScore } = req.query;
    const filteredUniversities = wuhanUniversities.filter(uni => {
        return uni.minScore <= parseInt(minScore);
    });
    res.json(filteredUniversities);
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});




