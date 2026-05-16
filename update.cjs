const fs = require('fs');
const file = 'src/pages/Home.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/const webCollection = \[\s*\{[\s\S]*?\];/, `const webCollection = [
    { type: 'image', src: '/cmsschool-preview.png', link: 'https://cmsschooll.netlify.app/', platform: 'Website' },
    { type: 'image', src: '/raalfatin-preview.png', link: 'https://raalfatinn.netlify.app/', platform: 'Website' },
    { type: 'image', src: 'https://image.thum.io/get/width/1200/crop/800/https://glossandglow-alpha.vercel.app/', link: 'https://glossandglow-alpha.vercel.app/#', platform: 'Website' },
    { type: 'image', src: 'https://image.thum.io/get/width/1200/crop/800/https://land.triraksavillage2.com/', link: 'https://land.triraksavillage2.com/', platform: 'Website' },
    { type: 'image', src: 'https://image.thum.io/get/width/1200/crop/800/https://rizqytravel.netlify.app/', link: 'https://rizqytravel.netlify.app/', platform: 'Website' },
];`);

const pM = content.match(/\{\/\* ─── Projects Collections Section ─── \*\/\}[\s\S]*?<section className="collections-section">[\s\S]*?<\/section>/);
if(pM){
    const pB = pM[0];
    content = content.replace(pB + '\r\n\r\n', '').replace(pB + '\n\n', '').replace(pB, '');
    content = content.replace('{/* ─── Experience Section ─── */}', pB + '\n\n            {/* ─── Experience Section ─── */}');
}

content = content.replace(/<motion\.div key=\{i\} variants=\{fadeInLeft\} className="timeline-item">/g, `<motion.div key={i} variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="timeline-item">`);

fs.writeFileSync(file, content);
console.log('Done!');
