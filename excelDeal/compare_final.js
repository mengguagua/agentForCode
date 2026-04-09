import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取Excel文件并转换为对象数组
function readExcelAsObjects(filePath) {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        
        return {
            totalRows: data.length + 1,
            columns: Object.keys(data[0] || {}),
            data: data
        };
    } catch (error) {
        throw error;
    }
}

// 主函数
async function main() {
    console.log('开始对比Excel文件...\n');
    
    // 读取两个Excel文件
    const officialFile = path.join(__dirname, '流向数据归属26年3月.xlsx'); // 当月的销量统计excel
    const actualFile = path.join(__dirname, '华东医药1-3月流向.xlsx'); // 销售代表提供的实际销量excel
    
    console.log('读取官方统计文件:', path.basename(officialFile));
    const officialData = readExcelAsObjects(officialFile);
    console.log(`官方统计文件总行数: ${officialData.totalRows}\n`);
    
    console.log('读取销售代表实际销量文件:', path.basename(actualFile));
    const actualData = readExcelAsObjects(actualFile);
    console.log(`销售代表文件总行数: ${actualData.totalRows}\n`);
    
    // 检查是否有"佐力药业"相关企业
    console.log('========== 检查佐力药业相关企业 ==========');
    const huadongCompanies = officialData.data.filter(row => 
        row['上游企业名称'] && row['上游企业名称'].includes('佐力')
    );
    
    if (huadongCompanies.length > 0) {
        console.log(`找到 ${huadongCompanies.length} 条佐力药业相关记录`);
        console.log('企业名称:');
        const uniqueCompanies = new Set(huadongCompanies.map(row => row['上游企业名称']));
        uniqueCompanies.forEach(company => console.log(`  - ${company}`));
        
        console.log('\n前5条佐力药业记录:');
        huadongCompanies.slice(0, 5).forEach((row, idx) => {
            console.log(`\n记录${idx + 1}:`);
            console.log(`  销售日期: ${row['销售日期']}`);
            console.log(`  上游企业名称: ${row['上游企业名称']}`);
            console.log(`  下游企业名称: ${row['下游企业名称']}`);
            console.log(`  产品名称: ${row['产品名称']}`);
            console.log(`  产品批号: ${row['产品批号']}`);
            console.log(`  销售数量: ${row['销售数量']}`);
        });
    } else {
        console.log('❌ 未找到佐力药业相关记录');
    }
    
    console.log('\n\n========== 对比分析 ==========');
    console.log('官方统计文件中没有"浙江佐力药业股份有限公司"，');
    console.log('但销售代表文件中显示上游企业为"浙江佐力药业股份有限公司"。');
    console.log('\n可能的情况：');
    console.log('1. 官方统计文件使用的是其他企业名称');
    console.log('2. 需要使用其他筛选条件（如产品名称、批号、客户名称等）');
    console.log('3. 销售代表的数据完全独立于官方统计');
    
    // 检查产品名称
    console.log('\n\n========== 产品名称统计 ==========');
    const productNames = new Set();
    actualData.data.forEach(row => {
        if (row['商品名称']) {
            productNames.add(row['商品名称']);
        }
    });
    console.log('销售代表文件中的产品:');
    productNames.forEach(name => console.log(`  - ${name}`));
    
    const officialProductNames = new Set();
    officialData.data.forEach(row => {
        if (row['产品名称']) {
            officialProductNames.add(row['产品名称']);
        }
    });
    console.log('\n官方文件中的产品数量:', officialProductNames.size);
    console.log('部分产品名称:');
    Array.from(officialProductNames).slice(0, 10).forEach(name => console.log(`  - ${name}`));
    
    console.log('\n========== 建议 ==========');
    console.log('1. 请确认官方统计文件中实际销售企业的名称');
    console.log('2. 或者使用其他筛选条件（如：产品名称="乌灵胶囊"，日期="2026/03"）');
    console.log('3. 或者直接比较所有符合条件的记录');
}

main().catch(error => {
    console.error('执行过程中出错:', error);
    process.exit(1);
});
